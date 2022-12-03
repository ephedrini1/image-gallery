const searchBtn = document.querySelector('.submit_button');
const input = document.querySelector('.search_input');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const divForImg = document.querySelector('.img_box');
const closepopup = document.querySelector('.close');
const popup = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');
closepopup.addEventListener('click', closepopupWindow);

function closepopupWindow() {
   popup.classList.remove('happened');
   overlay.classList.remove('happened');
 window.history.go(0);
}

let message = '';
let page = 1;

window.onload = init();

function init() {
  message = 'something';
  page = 1;
  getData();
}

searchBtn.addEventListener('click', (e) => {
  message = input.value;
  getData();
})

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
})

next.addEventListener('click', () => {
  page++;
  getData()
  console.log(page)
})


prev.addEventListener('click', () => {
  if (page > 1) {
    page--;
    getData()
    console.log(page)
  }
  console.log(page)
  return;
})

async function getData() {
  removeImages();
  const res = await fetch(`https://api.unsplash.com/search/photos?query=${message}&per_page=10&page=${page}&tag_mode=all&extras=url_m&orientation=landscape&client_id=8dDTOGlo8LAbftAsSFKeCGJERyORzFi7HnhChMJjToU`);
  console.log(res.status);
  if(res.status != 200) {
    popup.classList.add('happened');
    overlay.classList.add('happened');
  }
  const data = await res.json();
  console.log(data);
  if(data.results == 0) {
    popup.classList.add('happened');
    overlay.classList.add('happened');
  }
  data.results.forEach((imageObj) => {
    createImage(imageObj);
  });
}

function createImage(imageObj) {
  const imageDiv = document.createElement('div');
  divForImg.append(imageDiv);
  imageDiv.classList.add('image_div');
  imageDiv.innerHTML = `<img src="${imageObj.urls.regular}" alt="${imageObj.alt_description}" class="image"></img>
                         <div class="filter">
                         <a class="img_link" href="${imageObj.urls.regular}" target="_blank">
                         <span class="light_box"></span>
                         <span class="light_box"></span>
                         <span class="light_box"></span>
                         <span class="light_box"></span>
                         download</a></div>`
}

function removeImages() {
  divForImg.innerHTML = '';
}


const themeBtn = document.querySelector('.theme');
const bodyTheme = document.querySelector('.theme_body');
const currentTheme = localStorage.getItem('theme');

function setTheme(name) {
    document.body.setAttribute('data-theme', name);
    localStorage.setItem('theme', name);
}

if(currentTheme) {
    document.body.setAttribute('data-theme', currentTheme);
}
else {
    setTheme('dark');
}

function switchTheme() {
    if (document.body.getAttribute('data-theme') === 'light') {
        setTheme('dark');
    }
    else {
        setTheme('light');
    }
}
themeBtn.addEventListener('click', switchTheme);
window.addEventListener('load', setTheme(currentTheme))
