/**
 * Universal Dark Mode Theme Manager
 * This script provides dark/light mode toggle functionality for all pages
 */

class UniversalThemeManager {
    constructor() {
        this.themeToggle = null;
        this.themeIcon = null;
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.isInitialized = false;
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        if (this.isInitialized) return;
        
        // Find theme toggle elements
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');
        
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener for theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
        }

        // Create observer to detect when theme toggle is added dynamically
        this.observeThemeToggle();
        
        this.isInitialized = true;
    }

    observeThemeToggle() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const themeToggle = document.getElementById('theme-toggle');
                    const themeIcon = document.getElementById('theme-icon');
                    
                    if (themeToggle && !this.themeToggle) {
                        this.themeToggle = themeToggle;
                        this.themeIcon = themeIcon;
                        
                        // Set current theme on newly added toggle
                        this.setTheme(this.currentTheme);
                        
                        // Add click listener
                        this.themeToggle.addEventListener('click', (e) => {
                            e.preventDefault();
                            this.toggleTheme();
                        });
                    }
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    setTheme(theme) {
        const body = document.body;
        const html = document.documentElement;
        
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            html.setAttribute('data-theme', 'dark');
            if (this.themeIcon) {
                this.themeIcon.className = 'fas fa-sun';
            }
        } else {
            body.removeAttribute('data-theme');
            html.removeAttribute('data-theme');
            if (this.themeIcon) {
                this.themeIcon.className = 'fas fa-moon';
            }
        }
        
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Dispatch custom event for other scripts that might need to know about theme changes
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: theme } 
        }));
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add rotation animation
        if (this.themeToggle) {
            this.themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        }
        
        // Add a subtle shake animation to the page
        document.body.style.animation = 'themeTransition 0.3s ease';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 300);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    // Method to manually refresh theme (useful for dynamically loaded content)
    refreshTheme() {
        this.setTheme(this.currentTheme);
    }
}

// Add CSS animation for theme transition
const style = document.createElement('style');
style.textContent = `
    @keyframes themeTransition {
        0% { transform: scale(1); }
        50% { transform: scale(1.002); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Initialize theme manager
const themeManager = new UniversalThemeManager();

// Export for global use
window.UniversalThemeManager = UniversalThemeManager;
window.themeManager = themeManager;

// For ES6 modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UniversalThemeManager;
}
