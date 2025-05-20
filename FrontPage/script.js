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



const tabs = document.querySelectorAll(".tab");
const productCards = document.querySelectorAll(".product-card");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        // Remove active and fade-in classes from all tabs
        tabs.forEach(t => {
            t.classList.remove("active");
            t.classList.remove("fade-in");
        });

        // Add active and fade-in to clicked tab
        tab.classList.add("active");
        // Trigger reflow to restart animation if clicking same tab multiple times
        void tab.offsetWidth;
        tab.classList.add("fade-in");

        const filter = tab.getAttribute("data-filter");

        productCards.forEach(card => {
            const category = card.getAttribute("data-category");
            if (filter === "all" || filter === category) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});





document.addEventListener("DOMContentLoaded", function() {
    let scrollTopBtn = document.getElementById("scrollTopBtn");

    window.onscroll = function() {
        if (document.documentElement.scrollTop > 200) {
            scrollTopBtn.style.display = "flex";
        } else {
            scrollTopBtn.style.display = "none";
        }
    };

    scrollTopBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // FAQ accordion functionality
    const faqs = document.querySelectorAll('.faq');

    faqs.forEach(faq => {
        faq.addEventListener('click', () => {
            // Close all other FAQs
            faqs.forEach(item => {
                if (item !== faq && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });

            // Toggle current FAQ
            faq.classList.toggle('active');
        });
    });

    // Category buttons functionality
    const categoryButtons = document.querySelectorAll('.cab');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('fade-in');
            });

            // Add active class to clicked button
            button.classList.add('active');
            button.classList.add('fade-in');

            // Get selected category
            const selectedCategory = button.getAttribute('data-category');

            // Filter FAQs
            faqs.forEach(faq => {
                const faqCategory = faq.getAttribute('data-category');
                if (selectedCategory === 'all' || selectedCategory === faqCategory) {
                    faq.style.display = 'block';
                    // Add fade-in animation
                    faq.classList.add('fade-in');
                } else {
                    faq.style.display = 'none';
                    faq.classList.remove('fade-in');
                    // Remove active class if hidden
                    faq.classList.remove('active');
                }
            });
        });
    });
});