import { app } from "./firebase-Config.js";
console.log("Firebase Initialized:", app);

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click' , () => {
        nav.classList.add('active');
    })
}


if(close){
    close.addEventListener('click' , () => {
        nav.classList.remove('active');
    })
}
function filterProducts() {
        const input = document.getElementById("searchBar").value.toLowerCase();
        const products = document.querySelectorAll(".pro");

        products.forEach(product => {
            const name = product.getAttribute("data-name");
            if (name.toLowerCase().includes(input)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    }
