const allPosts = document.getElementById('allPosts');
const filterInput = document.querySelector('input');
const filterButton = document.querySelector('button');
filterButton.addEventListener('click', onFilterButtonClick);

const filterUrl = location.hash.slice(1);

filterInput.value = filterUrl;

blogPosts();

async function blogPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7');
  const posts = await response.json();

  posts.forEach(el => {
    const post = document.createElement('div');
    const title = document.createElement('h2');
    const text = document.createElement('p');
    const check = document.createElement('input');

    title.innerText = el.title;
    text.innerText = el.body;
    post.className = 'post';
    check.setAttribute('type', 'checkbox');

    post.append(title, text, check);

    check.onclick = () => {
      if (check.checked) {
        post.className = 'postChecked';
      } else {
        post.className = 'post';
      }
    };

    if (title.outerText.toLocaleLowerCase().includes(filterUrl)) {
      allPosts.append(post);
    }
  });
}

function onFilterButtonClick() {
  const headers = document.querySelectorAll('h2');
  const filterValue = filterInput.value.toLocaleLowerCase();

  headers.forEach(el => {
    const elIsIncludes = el.outerText.toLocaleLowerCase().includes(filterValue);
    const checked = el.parentElement.querySelector('input').checked;

    if (elIsIncludes && checked) {
      el.parentElement.className = 'postChecked';
    } else if (elIsIncludes && !checked) {
      el.parentElement.className = 'post';
    } else {
      el.parentElement.className = 'postHide';
    }
  });

  location.hash = filterValue;
}
