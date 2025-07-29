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
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    modal.style.display = 'block';
    if (item.tagName === 'IMG') {
      modalContent.innerHTML = `<img src="${item.src}" style="max-width: 100%; border-radius: 10px;" />`;
    } else if (item.tagName === 'VIDEO') {
      modalContent.innerHTML = `
        <video controls autoplay style="max-width: 100%; border-radius: 10px;">
          <source src="${item.querySelector('source').src}" type="video/mp4" />
        </video>`;
    }
  });
});

modalClose.onclick = () => {
  modal.style.display = 'none';
  modalContent.innerHTML = '';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    modalContent.innerHTML = '';
  }
};
