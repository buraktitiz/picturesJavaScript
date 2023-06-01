const count = 30;
const apiKey = '2yl5yJfCnIb2L-VIoGkMPt6YRB75uLm8lxWxbgYK7Yk';
const apiUrl = `https://api.unsplash.com//photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById('imageDiv');
const loader = document.getElementById('loading');

let isDownloaded = false;
let imagesLoaded = 0;
let totalImages = 0;
let imagesArray = [];

getImages();
async function getImages() {
    try {
        const response = await fetch(apiUrl);
        imagesArray = await response.json();
        displayImages()
    } catch (error) {
    }
}

function displayImages() {
    imagesLoaded = 0;
    totalImages = imagesArray.length;
    imagesArray.forEach((image) => {
        const item = document.createElement('a');
        setAtributes(item, { href: image.urls.regular });
        // item.setAttribute('href', image.urls.regular);
        const img = document.createElement('img');
        // img.setAttribute('src', image.urls.regular);
        // img.setAttribute('alt', image.urls.alt_description);
        setAtributes(img, {
            src: image.urls.regular,
            alt: image.urls.alt_description
        });

        img.addEventListener('load', imageLoaded)
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        isDownloaded = true;
        loader.hidden = true;
    }
}

function setAtributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

window.addEventListener('scroll', () => {
    console.log('Tetiklendi');
    if (window.innerWidth + window.scrollY >= document.body.offsetHeight - 1000 && isDownloaded) {
        // console.log(window.innerHeight);
        // console.log(window.scrollY);
        // console.log(window.innerHeight + window.scrollY);
        // console.log(document.body.offsetHeight - 1000);
        // console.log('Resimleri Yükle');
        getImages()
    }
});