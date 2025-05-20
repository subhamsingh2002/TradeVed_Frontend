document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const productsButton = document.querySelector('.products-button');
    const productsMenu = document.querySelector('.products-menu');

    // Load saved theme from localStorage
    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-mode");
        themeToggle.checked = true;
    }

    // Products dropdown
    productsButton.addEventListener('click', () => {
        productsMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!productsButton.contains(event.target) && !productsMenu.contains(event.target)) {
            productsMenu.classList.remove('active');
        }
    });
    // Toggle theme on switch click
    themeToggle.addEventListener("change", function() {
        body.classList.toggle("light-mode");

        // Save theme preference
        if (body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
    });
});