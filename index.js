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

// Close mobile menu and smooth scroll when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        
        // Close mobile menu if open
        menuBtn.classList.remove('active');
        navbar.classList.remove('active');
        
        // Get the target section ID from the href attribute
        const targetId = link.getAttribute('href');
        if (targetId === '#home') {
            // Special case for home to scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Calculate the position to scroll to (accounting for fixed header)
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        }
    });
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

// Combined animation function with IELTS support
const animateBars = () => {
    const animate = (bars) => {
        bars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width && !bar.classList.contains('animated')) {
                // Special handling for IELTS (convert to percentage)
                const isIELTS = bar.closest('.ielts-bar');
                const targetWidth = isIELTS ? (width / 9 * 100) : width;
                
                bar.style.width = targetWidth + '%';
                bar.classList.add('animated');
                
                // Update the displayed IELTS score with counting animation
                if (isIELTS) {
                    const scoreElement = bar.closest('.skill-item').querySelector('.score');
                    let currentScore = 0;
                    const targetScore = parseFloat(width);
                    const duration = 1500; // 1.5 seconds
                    const increment = targetScore / (duration / 16); // 60fps
                    
                    const updateScore = () => {
                        currentScore += increment;
                        if (currentScore < targetScore) {
                            scoreElement.textContent = currentScore.toFixed(1);
                            requestAnimationFrame(updateScore);
                        } else {
                            scoreElement.textContent = targetScore.toFixed(1);
                        }
                    };
                    
                    updateScore();
                }
            }
        });
    };

    // Initialize all bars to 0 width
    document.querySelectorAll('.skill-level, .language-level').forEach(bar => {
        bar.style.width = '0';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.skill-level, .language-level');
                animate(bars);
            }
        });
    }, { threshold: 0.1 });

    // Observe containers (including both expertise and language sections)
    document.querySelectorAll('.expertise-category, .languages-container').forEach(container => {
        observer.observe(container);
    });

    // Animate any visible bars on load
    const visibleBars = document.querySelectorAll('.skill-level, .language-level');
    animate(visibleBars);
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', animateBars);

// Projects Modal Functionality
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalLink = document.getElementById('modal-link');

// Project data (you can expand this with all your projects)
const projectsData = {
    1: {
        title: "BioFuzzAnalyzer",
        image: "89781.jpg",
        description: "BioFuzzAnalyzer is a Python-based GUI tool for fuzzy DNA sequence search. It allows users to upload DNA sequences, define custom match, mismatch, and gap scores, and identify top-scoring local alignments using a Smith-Waterman-inspired algorithm. Results are presented with detailed alignment views and can be exported as PDF reports, making it ideal for bioinformatics analysis and research.",
        link: "https://github.com/yourusername/genome-analysis-tool"
    }
};

// Open modal when project card is clicked
projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        const projectId = card.getAttribute('data-project');
        const project = projectsData[projectId];
        
        if (project) {
            modalImage.src = project.image;
            modalImage.alt = project.title;
            modalTitle.textContent = project.title;
            modalDesc.textContent = project.description;
            modalLink.href = project.link;
            
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Prevent scrolling
        }
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});

// Close when clicking outside modal
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Contact Form Validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    // Validate Name
    const name = document.getElementById('name').value.trim();
    if (!name) {
        document.getElementById('nameError').textContent = 'Name is required';
        isValid = false;
    }

    // Validate Position
    const position = document.getElementById('position').value.trim();
    if (!position) {
        document.getElementById('positionError').textContent = 'Position is required';
        isValid = false;
    }

    // Validate Email
    const email = document.getElementById('email').value.trim();
    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById('emailError').textContent = 'Email is invalid';
        isValid = false;
    }

    // Validate Description
    const description = document.getElementById('description').value.trim();
    if (!description) {
        document.getElementById('descriptionError').textContent = 'Message is required';
        isValid = false;
    }

    // Validate Password
    const password = document.getElementById('password').value.trim();
    if (!password) {
        document.getElementById('passwordError').textContent = 'Password is required';
        isValid = false;
    } else if (password.length < 8) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters';
        isValid = false;
    }

    if (isValid) {
        // Form is valid, proceed with submission
        alert('Form submitted successfully!');
        this.reset();
    }
});

// Optimized typing animation
function setupTypingAnimation() {
    const words = [" Bioinformatics Engineer", " Software Engineer", " Web Developer"];
    const typingElement = document.querySelector('.typing-words');
    const cursorElement = document.querySelector('.typing-cursor');
    
    if (!typingElement) return;

    // Set fixed width based on longest word to prevent layout shifts
    const calculateWidth = () => {
        typingElement.style.display = 'inline-block';
        typingElement.style.visibility = 'hidden';
        typingElement.style.position = 'absolute';
        
        let maxWidth = 0;
        words.forEach(word => {
            typingElement.textContent = word;
            maxWidth = Math.max(maxWidth, typingElement.offsetWidth);
        });
        
        typingElement.style.cssText = ''; // Reset styles
        return maxWidth;
    };

    const containerWidth = calculateWidth();
    document.querySelector('.typing-container').style.width = `${containerWidth}px`;
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // ms per character
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Change word when complete
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause between words
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start animation
    setTimeout(type, 1000);
}

document.addEventListener('DOMContentLoaded', setupTypingAnimation);