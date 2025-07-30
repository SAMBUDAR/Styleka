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

// Dark Mode Toggle Functionality
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener for theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    setTheme(theme) {
        const body = document.body;
        
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            if (this.themeIcon) {
                this.themeIcon.className = 'fas fa-sun';
            }
        } else {
            body.removeAttribute('data-theme');
            if (this.themeIcon) {
                this.themeIcon.className = 'fas fa-moon';
            }
        }
        
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add a nice animation effect
        if (this.themeToggle) {
            this.themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        }
    }

    // Method to get current theme (useful for other scripts)
    getCurrentTheme() {
        return this.currentTheme;
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});

// Export for use in other files if needed
window.ThemeManager = ThemeManager;
