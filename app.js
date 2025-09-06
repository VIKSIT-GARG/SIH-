// PM Internship Platform JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initNavbarScroll();
    initCounterAnimations();
    initHorizontalLoop();
    initThemeToggle();
    initScrollAnimations();
    initSmoothScrolling();
    initLanguageSelector();
    initSearchFunctionality();
});

// Dynamic Navbar based on scroll direction
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            navbar.classList.add('hide');
        } else {
            navbar.classList.remove('hide');
        }
        lastScrollY = window.scrollY;
    });
}

// Counter Animations for Statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                let count = 0;
                const speed = 200;
                const increment = target / speed;

                const timer = setInterval(() => {
                    count += increment;
                    if (count > target) {
                        entry.target.innerText = target.toLocaleString();
                        clearInterval(timer);
                    } else {
                        entry.target.innerText = Math.ceil(count).toLocaleString();
                    }
                }, 1);

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Infinite Horizontal Loop for Internship Cards
function initHorizontalLoop() {
    const track = document.querySelector('.internship-track');
    if (!track) return;
    
    const cards = Array.from(track.children);
    
    // Duplicate the cards to create an infinite loop effect
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
}

// Smooth Scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            alert('Search functionality coming soon!');
            // You can implement your search logic here
        });
    }
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-color-scheme', savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Language Selector & Content Change (Proof of Concept)
function initLanguageSelector() {
    const langSelect = document.getElementById('languageSelector');
    const heroTitle = document.getElementById('heroTitle');
    
    const contentData = {
        en: {
            heroTitle: "One Platform For Your Career Journey",
        },
        hi: {
            heroTitle: "आपके करियर यात्रा के लिए एक मंच",
        },
        bn: {
            heroTitle: "আপনার ক্যারিয়ারের যাত্রার জন্য একটি প্ল্যাটফর্ম",
        },
        te: {
            heroTitle: "మీ కెరీర్ ప్రయాణానికి ఒక వేదిక",
        },
        mr: {
            heroTitle: "तुमच्या करिअरच्या प्रवासासाठी एकच व्यासपीठ",
        },
        ta: {
            heroTitle: "உங்கள் தொழில் பயணத்திற்கான ஒரு தளம்",
        },
    };

    // Set initial content based on selected language
    const currentLang = langSelect.value;
    heroTitle.innerText = contentData[currentLang].heroTitle;

    langSelect.addEventListener('change', (e) => {
        const newLang = e.target.value;
        // This is a proof of concept. For a full site, you would change all content elements here.
        heroTitle.innerText = contentData[newLang].heroTitle;
    });
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    AOS.init({
        duration: 800,
        once: true
    });
}