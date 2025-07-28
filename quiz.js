// Quiz Logic Variables
let currentQuestion = 1;
const totalQuestions = 5;
let answers = {};

// DOM Elements
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resultsSection = document.getElementById("resultsSection");
const quizContent = document.querySelector(".quiz-content");

// Mobile Navigation
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

// Mobile menu functionality
if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

// Initialize Quiz
document.addEventListener("DOMContentLoaded", function () {
  initializeQuiz();
});

function initializeQuiz() {
  // Add event listeners to all options
  document.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", handleOptionClick);
  });

  // Add event listeners to navigation buttons
  prevBtn.addEventListener("click", () => changeQuestion(-1));
  nextBtn.addEventListener("click", () => changeQuestion(1));

  // Add event listener to retake button
  document.getElementById("retakeBtn").addEventListener("click", restartQuiz);

  // Update initial state
  updateNavigation();
  updateProgress();
}

function handleOptionClick(event) {
  const option = event.currentTarget;
  const question = option.closest(".question");
  const questionNum = question.dataset.question;

  // Remove selected class from all options in this question
  question.querySelectorAll(".option").forEach((opt) => {
    opt.classList.remove("selected");
  });

  // Add selected class to clicked option
  option.classList.add("selected");

  // Store answer
  answers[questionNum] = option.dataset.value;

  // Update navigation
  updateNavigation();
}

function changeQuestion(direction) {
  // Hide current question
  const currentQuestionEl = document.querySelector(
    `.question[data-question="${currentQuestion}"]`
  );
  currentQuestionEl.classList.remove("active");

  // Update question number
  currentQuestion += direction;

  // Check if we should show results
  if (currentQuestion > totalQuestions) {
    showResults();
    return;
  }

  // Show next question
  const nextQuestionEl = document.querySelector(
    `.question[data-question="${currentQuestion}"]`
  );
  nextQuestionEl.classList.add("active");

  // Update UI
  updateProgress();
  updateNavigation();
}

function updateProgress() {
  const progress = ((currentQuestion - 1) / totalQuestions) * 100;
  progressFill.style.width = progress + "%";
  progressText.textContent = `Question ${currentQuestion} of ${totalQuestions}`;
}

function updateNavigation() {
  // Update previous button
  prevBtn.disabled = currentQuestion === 1;

  // Update next button
  const hasAnswer = answers[currentQuestion];
  nextBtn.disabled = !hasAnswer;

  // Update next button text
  if (currentQuestion === totalQuestions) {
    nextBtn.innerHTML = 'Get Results <i class="fas fa-star"></i>';
  } else {
    nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
  }
}

function showResults() {
  // Hide quiz content
  quizContent.style.display = "none";

  // Update progress to 100%
  progressFill.style.width = "100%";
  progressText.textContent = "Complete!";

  // Generate and display results
  const styleProfile = generateStyleProfile();
  displayResults(styleProfile);

  // Show results section
  resultsSection.classList.add("active");
}

function generateStyleProfile() {
  const style = answers["1"];
  const colors = answers["2"];
  const occasion = answers["3"];
  const fit = answers["4"];
  const budget = answers["5"];

  const profiles = {
    casual: {
      title: "The Effortless Trendsetter",
      description:
        "You love comfort without compromising style. Your wardrobe is filled with versatile pieces that can take you from day to night effortlessly. You appreciate quality basics that can be mixed and matched to create countless looks.",
      recommendations: [
        {
          category: "Essential Tops",
          items: [
            "Soft cotton tees in neutral colors",
            "Cozy knit sweaters",
            "Casual button-down shirts",
            "Comfortable hoodies",
          ],
        },
        {
          category: "Bottom Essentials",
          items: [
            "High-waisted jeans",
            "Comfortable leggings",
            "Flowy midi skirts",
            "Casual joggers",
          ],
        },
        {
          category: "Accessories & Shoes",
          items: [
            "Crossbody bags",
            "White sneakers",
            "Delicate layered jewelry",
            "Baseball caps",
          ],
        },
      ],
    },
    chic: {
      title: "The Sophisticated Maven",
      description:
        "You embody elegance and grace in everything you wear. Your style is polished, refined, and always appropriate for any upscale occasion. You invest in quality pieces that make a statement through their craftsmanship and timeless appeal.",
      recommendations: [
        {
          category: "Elegant Tops",
          items: [
            "Silk blouses in classic colors",
            "Tailored blazers",
            "Cashmere sweaters",
            "Structured button-downs",
          ],
        },
        {
          category: "Sophisticated Bottoms",
          items: [
            "Pencil skirts",
            "Tailored trousers",
            "A-line midi dresses",
            "High-waisted wide-leg pants",
          ],
        },
        {
          category: "Refined Accessories",
          items: [
            "Structured leather handbags",
            "Pearl jewelry",
            "Classic pointed-toe pumps",
            "Silk scarves",
          ],
        },
      ],
    },
    trendy: {
      title: "The Fashion Forward Pioneer",
      description:
        "You're always ahead of the curve, embracing the latest trends and making bold fashion statements that inspire others. Your wardrobe is a curated collection of statement pieces that reflect your fearless approach to style.",
      recommendations: [
        {
          category: "Statement Pieces",
          items: [
            "Tops with dramatic sleeves",
            "Crop tops and bralettes",
            "Bold printed shirts",
            "Asymmetrical designs",
          ],
        },
        {
          category: "Trendy Bottoms",
          items: [
            "Wide-leg trousers",
            "Mini skirts",
            "Leather or faux leather pieces",
            "High-waisted shorts",
          ],
        },
        {
          category: "Bold Accessories",
          items: [
            "Statement earrings",
            "Chunky platform sneakers",
            "Structured mini bags",
            "Layered chain necklaces",
          ],
        },
      ],
    },
    classic: {
      title: "The Timeless Icon",
      description:
        "You appreciate quality and timeless pieces that never go out of style. Your wardrobe is built on investment pieces that last for years and can be styled in multiple ways. You understand that true style transcends trends.",
      recommendations: [
        {
          category: "Timeless Essentials",
          items: [
            "Crisp white button-down shirts",
            "Cashmere cardigans",
            "Striped Breton tops",
            "Classic trench coats",
          ],
        },
        {
          category: "Classic Bottoms",
          items: [
            "Straight-leg dark jeans",
            "Pleated midi skirts",
            "Tailored dress pants",
            "A-line dresses",
          ],
        },
        {
          category: "Investment Accessories",
          items: [
            "Quality leather handbags",
            "Classic gold or silver watches",
            "Leather loafers",
            "Simple stud earrings",
          ],
        },
      ],
    },
  };

  return profiles[style] || profiles.casual;
}

function displayResults(profile) {
  // Update style badge
  document.getElementById("styleBadge").textContent = profile.title;

  // Update style description
  const descriptionEl = document.getElementById("styleDescription");
  descriptionEl.innerHTML = `
        <h3>${profile.title}</h3>
        <p>${profile.description}</p>
    `;

  // Update recommendations
  const recommendationsGrid = document.getElementById("recommendationsGrid");
  recommendationsGrid.innerHTML = "";

  profile.recommendations.forEach((rec) => {
    const card = document.createElement("div");
    card.className = "recommendation-card";
    card.innerHTML = `
            <h4>${rec.category}</h4>
            <ul>
                ${rec.items.map((item) => `<li>${item}</li>`).join("")}
            </ul>
        `;
    recommendationsGrid.appendChild(card);
  });
}

function restartQuiz() {
  // Reset variables
  currentQuestion = 1;
  answers = {};

  // Reset all questions
  document.querySelectorAll(".question").forEach((q) => {
    q.classList.remove("active");
    q.querySelectorAll(".option").forEach((opt) => {
      opt.classList.remove("selected");
    });
  });

  // Show first question
  document
    .querySelector('.question[data-question="1"]')
    .classList.add("active");

  // Reset UI
  updateProgress();
  updateNavigation();

  // Show quiz content and hide results
  quizContent.style.display = "block";
  resultsSection.classList.remove("active");

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Add smooth scrolling for better UX
function smoothScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Call smooth scroll when changing questions
const originalChangeQuestion = changeQuestion;
changeQuestion = function (direction) {
  originalChangeQuestion(direction);
  if (currentQuestion <= totalQuestions) {
    setTimeout(smoothScrollToTop, 100);
  }
};
