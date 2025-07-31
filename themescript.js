// document.addEventListener("DOMContentLoaded", () => {
//     const toggle = document.getElementById("theme-toggle");
    
//     // Check for saved theme preference or use preferred color scheme
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//     const currentTheme = localStorage.getItem("theme");
    
//     // Determine initial theme
//     if (currentTheme === "dark" || (!currentTheme && prefersDark)) {
//         document.documentElement.classList.add("dark-mode");
//         if (toggle) toggle.textContent = "☀️";
//     } else {
//         document.documentElement.classList.remove("dark-mode");
//         if (toggle) toggle.textContent = "🌙";
//     }
    
//     // Toggle theme when button is clicked
//     if (toggle) {
//         toggle.addEventListener("click", () => {
//             document.documentElement.classList.toggle("dark-mode");
//             const isDark = document.documentElement.classList.contains("dark-mode");
//             localStorage.setItem("theme", isDark ? "dark" : "light");
//             toggle.textContent = isDark ? "☀️" : "🌙";
            
//             // Force redraw to ensure transitions work
//             document.body.style.display = 'none';
//             document.body.offsetHeight; // Trigger reflow
//             document.body.style.display = '';
//         });
//     }
// });
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-toggle");
    
    // Check for saved theme preference or use preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = localStorage.getItem("theme");
    
    // Determine initial theme
    if (currentTheme === "dark" || (!currentTheme && prefersDark)) {
        document.documentElement.classList.add("dark-mode");
        if (toggle) toggle.textContent = "☀️";
    } else {
        document.documentElement.classList.remove("dark-mode");
        if (toggle) toggle.textContent = "🌙";
    }
    
    // Toggle theme when button is clicked
    if (toggle) {
        toggle.addEventListener("click", () => {
            document.documentElement.classList.toggle("dark-mode");
            const isDark = document.documentElement.classList.contains("dark-mode");
            localStorage.setItem("theme", isDark ? "dark" : "light");
            toggle.textContent = isDark ? "☀️" : "🌙";
            
            // Force redraw to ensure transitions work
            document.body.style.display = 'none';
            document.body.offsetHeight; // Trigger reflow
            document.body.style.display = '';
        });
    }
});