// import { app } from "./firebase-Config";
// console.log("Firebase Initialized:", app);

// const bar = document.getElementById('bar');
// const close = document.getElementById('close');
// const nav = document.getElementById('navbar');

// if(bar){
//     bar.addEventListener('click' , () => {
//         nav.classList.add('active');
//     })
// }

// if(close){
//     close.addEventListener('click' , () => {
//         nav.classList.remove('active');
//     })
// }
// function filterProducts() {
//         const input = document.getElementById("searchBar").value.toLowerCase();
//         const products = document.querySelectorAll(".pro");

//         products.forEach(product => {
//             const name = product.getAttribute("data-name");
//             if (name.toLowerCase().includes(input)) {
//                 product.style.display = "block";
//             } else {
//                 product.style.display = "none";
//             }
//         });
//     }

//for blog.html

const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');

const imgSlide = document.querySelector('.img-slide');
const blogDetails = document.querySelectorAll('.blog-detail');

let index = 0;
const totalSlides = blogDetails.length;

const updateArrows = () => {
    arrowLeft.classList.toggle('disabled', index === 0);
    arrowRight.classList.toggle('disabled', index === totalSlides - 1);
};

const activeBlog = () => {
    imgSlide.style.transform = `translateX(-${index * 100}%)`;

    blogDetails.forEach((detail, i) => {
        detail.classList.toggle('active', i === index);
    });

    updateArrows();
};

// Initial setup
activeBlog();

arrowRight.addEventListener('click', () => {
    if (index < totalSlides - 1) {
        index++;
        activeBlog();
    }
});

arrowLeft.addEventListener('click', () => {
    if (index > 0) {
        index--;
        activeBlog();
    }
});
