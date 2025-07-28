// Firebase initialization (if firebase-config.js exists)
// Note: Firebase functionality is handled in individual pages where needed
console.log("Script loaded successfully");

// Mobile navigation functionality
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

// Scroll to Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    console.log('Scroll to top button found:', scrollToTopBtn);
    
    if (scrollToTopBtn) {
        console.log('Setting up scroll to top functionality');
        
        // Show/hide scroll to top button based on scroll position
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            console.log('Scroll position:', scrollPosition);
            
            if (scrollPosition > 300) {
                scrollToTopBtn.classList.add('show');
                console.log('Button should be visible');
            } else {
                scrollToTopBtn.classList.remove('show');
                console.log('Button should be hidden');
            }
        });

        // Smooth scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', () => {
            console.log('Scroll to top button clicked');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        console.log('Scroll to top functionality setup complete');
    } else {
        console.log('Scroll to top button not found');
    }
});
