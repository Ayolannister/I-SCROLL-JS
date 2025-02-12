const imagecontainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArr = [];
let imagesloaded = 0;
let counPa = 0;
let ready = false;

function imageLoader() {
  imagesloaded++;
  if (imagesloaded === counPa) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}

function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// imageLoader();
function displayphotos() {
  imagesloaded = 0;
  counPa = photosArr.length;
  photosArr.forEach(photos => {
    const item = document.createElement('a');
    // item.setAttribute('href', photos.links.html);
    // item.setAttribute('target', '_blank');
    setAttribute(item, {
      href: photos.links.html,
      target: '_blank',
    });

    const img = document.createElement('img');
    // img.setAttribute('src', photos.urls.regular);
    // img.setAttribute('alt', photos.alt_description);
    // img.setAttribute('title', photos.alt_description);
    setAttribute(img, {
      src: photos.urls.regular,
      alt: photos.alt_description,
      title: photos.alt_description,
    });

    img.addEventListener('load', imageLoader);

    item.appendChild(img);
    imagecontainer.appendChild(item);
    // console.log(imageLoader());
  });
}

let count = 5;
const APIKEY = 'naBHVBUKDtEcYB-FYnJe7DgmjQxl9YugnydCgH0VgSI';
const APIURL = `https://api.unsplash.com/photos/random/?client_id=${APIKEY}&count=${count}`;

async function getPhotos() {
  try {
    const response = await fetch(APIURL);
    photosArr = await response.json();
    console.log(photosArr);
    displayphotos();
  } catch (error) {
    console.error(error);
  }
}
// console.log(photosArr);

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    console.log('scrolled past');
  }
});
getPhotos();
