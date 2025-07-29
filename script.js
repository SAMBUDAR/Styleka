import { app } from "./firebase-Config";
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
const form = document.getElementById('review-form');
const reviewList = document.getElementById('review-list');
const averageRatingDiv = document.getElementById('average-rating');
let reviews = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value || "Anonymous";
  const rating = parseInt(document.getElementById('rating').value);
  const comment = document.getElementById('comment').value;

  const review = { name, rating, comment };
  reviews.push(review);

  displayReviews();
  form.reset();
});

function displayReviews() {
  reviewList.innerHTML = '';
  let sum = 0;

  reviews.forEach(r => {
    sum += r.rating;
    reviewList.innerHTML += `
      <div class="review">
        <div class="name">${r.name}</div>
        <div class="stars">${'⭐️'.repeat(r.rating)}</div>
        <p>${r.comment}</p>
      </div>
    `;
  });

  const avg = (sum / reviews.length).toFixed(1);
  averageRatingDiv.innerText = `Average Rating: ${avg} / 5`;
}
