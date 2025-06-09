// Mobile menu functionality
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');

// Toggle mobile menu
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navbar.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navbar.classList.remove('active');
    });
});

// Scroll animation for education items
const educationItems = document.querySelectorAll('.education-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.1 });

educationItems.forEach(item => {
    observer.observe(item);
});

// Active section highlighting
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
});