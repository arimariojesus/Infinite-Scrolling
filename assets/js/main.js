const container = document.querySelector('#container');
const loading = document.querySelector('.loading');

const handleScrolling = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  console.log({ scrollTop, scrollHeight, clientHeight });

  if((clientHeight + scrollTop) >= (scrollHeight -5)) {
    showLoading();
  }
}

const showLoading = () => {
  loading.classList.add('show');

  // load more data
  setTimeout(getPost, 1000);
}

const getPost = async function() {
  const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${getRandomNumber()}`);
  const postData = await postResponse.json();

  const userResponse = await fetch(`https://randomuser.me/api`);
  const userData = await userResponse.json();

  const data = { post: postData, user: userData.results[0] };

  addDataToDOM(data);
}

const addDataToDOM = (data) => {
  const postElement = document.createElement('div');
  postElement.classList.add('blog__post');
  postElement.innerHTML = `
    <h2 class="blog__post-title">${data.post.title}</h2>
    <p class="blog__post-text">${data.post.body}</p>
    <div class="user-info">
      <img src="${data.user.picture.large}" alt="${data.user.name.first}" />
      <span>${data.user.name.first} ${data.user.name.last}</span>
    </div>
  `;
  container.appendChild(postElement);
  loading.classList.remove('show');
}

const getRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
}

getPost();
getPost();

window.addEventListener('scroll', handleScrolling);