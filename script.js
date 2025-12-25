// ===================================
// Animated Background Particles
// ===================================
const ENABLE_PARTICLES_BACKGROUND = true;
const ENABLE_CYBER_BACKGROUND = true;
const ENABLE_MATRIX_BACKGROUND = false;

function createParticles() {
    if (!ENABLE_PARTICLES_BACKGROUND) return;
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    const particleCount = 30;
    const colors = ['rgba(102, 126, 234, 0.12)', 'rgba(79, 172, 254, 0.12)', 'rgba(118, 75, 162, 0.12)', 'rgba(0, 242, 254, 0.10)'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2px and 8px
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random horizontal position
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random color from array
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation duration (30s to 60s) - slower
        const duration = Math.random() * 30 + 30;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay (0 to 25s)
        particle.style.animationDelay = `${Math.random() * 25}s`;
        
        container.appendChild(particle);
    }
}

// Initialize particles on load
window.addEventListener('load', createParticles);

// ===================================
// Cyber Circuit Pattern Generator
// ===================================
function createCircuitPattern() {
    if (!ENABLE_CYBER_BACKGROUND) return;
    const container = document.getElementById('circuitPattern');
    if (!container) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const nodeCount = 15;
    
    // Create nodes with connecting lines
    const nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'circuit-node';
        
        const x = Math.random() * width;
        const y = Math.random() * height;
        
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        node.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(node);
        nodes.push({ x, y, element: node });
    }
    
    // Connect nearby nodes with lines
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const distance = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
            
            if (distance < 300) {
                const line = document.createElement('div');
                line.className = 'circuit-line';
                
                const angle = Math.atan2(nodes[j].y - nodes[i].y, nodes[j].x - nodes[i].x);
                const length = distance;
                
                line.style.width = `${length}px`;
                line.style.height = '1px';
                line.style.left = `${nodes[i].x}px`;
                line.style.top = `${nodes[i].y}px`;
                line.style.transform = `rotate(${angle}rad)`;
                line.style.transformOrigin = '0 0';
                
                container.appendChild(line);
            }
        }
    }
}

// ===================================
// Data Stream Animation
// ===================================
function createDataStream() {
    if (!ENABLE_CYBER_BACKGROUND) return;
    const container = document.getElementById('dataStream');
    if (!container) return;
    const streamCount = 12;
    
    for (let i = 0; i < streamCount; i++) {
        const packet = document.createElement('div');
        packet.className = 'data-packet';
        
        packet.style.left = `${(i * 8) + Math.random() * 5}%`;
        packet.style.animationDelay = `${Math.random() * 6}s`;
        packet.style.animationDuration = `${6 + Math.random() * 4}s`;
        
        container.appendChild(packet);
    }
}

// Initialize cyber effects
window.addEventListener('load', () => {
    createCircuitPattern();
    createDataStream();
});

// ===================================
// Matrix Rain Animation (Hero Section Only)
// ===================================
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrixCanvas');
        if (!this.canvas) return;

        const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        if (prefersReducedMotion) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];

        this.fps = 12;
        this.frameIntervalMs = 1000 / this.fps;
        this.lastFrameTime = 0;
        this.running = true;
        
        this.init();
        this.attachVisibilityHandlers();
        this.animate(0);
    }
    
    init() {
        const cssWidth = this.canvas.offsetWidth;
        const cssHeight = this.canvas.offsetHeight;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width = Math.floor(cssWidth * dpr);
        this.canvas.height = Math.floor(cssHeight * dpr);

        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        
        // Calculate columns
        this.columns = Math.floor(cssWidth / this.fontSize);
        
        // Initialize drops
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }
    
    draw() {
        // Semi-transparent black to create fade effect
        this.ctx.fillStyle = 'rgba(10, 10, 15, 0.06)';
        this.ctx.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
        
        // Matrix rain color (cyan/blue) - keep subtle
        this.ctx.fillStyle = 'rgba(79, 172, 254, 0.55)';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        // Draw characters
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.ctx.fillText(text, x, y);
            
            // Reset drop to top randomly
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            // Move drop down slowly
            this.drops[i] += 0.22;
        }
    }
    
    animate(timestamp) {
        if (!this.running) return;

        if (timestamp - this.lastFrameTime >= this.frameIntervalMs) {
            this.lastFrameTime = timestamp;
            this.draw();
        }

        requestAnimationFrame((t) => this.animate(t));
    }

    attachVisibilityHandlers() {
        document.addEventListener('visibilitychange', () => {
            this.running = document.visibilityState === 'visible';
            if (this.running) {
                this.lastFrameTime = 0;
                requestAnimationFrame((t) => this.animate(t));
            }
        });
    }
    
    resize() {
        this.init();
    }
}

// Initialize Matrix Rain
let matrixRain;
window.addEventListener('load', () => {
    if (!ENABLE_MATRIX_BACKGROUND) return;
    matrixRain = new MatrixRain();
});

// Handle resize
window.addEventListener('resize', () => {
    if (!ENABLE_MATRIX_BACKGROUND) return;
    if (matrixRain) {
        matrixRain.resize();
    }
});

// ===================================
// Mobile Navigation Toggle
// ===================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ===================================
// Scroll Animations with Intersection Observer
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elements to animate
const animatedElements = document.querySelectorAll(`
    .about-content,
    .skill-category,
    .project-card,
    .service-card,
    .contact-item,
    .stat-item
`);

animatedElements.forEach(el => {
    animateOnScroll.observe(el);
});

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll to Top Button
// ===================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Animated Counter for Stats
// ===================================
function parseNumberAndSuffix(text) {
    const trimmed = (text ?? '').toString().trim();
    const match = trimmed.match(/^(-?\d+(?:\.\d+)?)(.*)$/);
    if (!match) return { value: 0, suffix: '' };
    return {
        value: Number(match[1]),
        suffix: (match[2] ?? '').trim()
    };
}

function animateCounter(element, target, suffix = '', duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = `${target}${suffix}`;
            clearInterval(timer);
        } else {
            element.textContent = `${Math.floor(start)}${suffix}`;
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-item h4');
            statNumbers.forEach(stat => {
                const { value, suffix } = parseNumberAndSuffix(stat.textContent);
                const target = Number.isFinite(value) ? Math.floor(value) : 0;
                animateCounter(stat, target, suffix);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// ===================================
// Form Submission Handler
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
        // Create mailto link or implement your form submission logic
        const mailtoLink = `mailto:akilatharuka26@gamil.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    window.location.href = mailtoLink;
    
    // Show success message (you can customize this)
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// ===================================
// Typing Animation for Hero Text
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Uncomment to enable typing animation on page load
// window.addEventListener('load', () => {
//     const heroSubtitle = document.querySelector('.hero-subtitle');
//     const originalText = heroSubtitle.textContent;
//     typeWriter(heroSubtitle, originalText, 80);
// });

// ===================================
// Parallax Effect for Hero Visual Cards - DISABLED
// ===================================
// Parallax movement disabled to prevent scroll interference
// Cards will maintain their CSS float animation only

// ===================================
// Skill Items Hover Effect - DISABLED
// ===================================
// Mouse hover animations disabled

// ===================================
// Project Cards Interactive Tilt Effect
// ===================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===================================
// Service Cards Animation
// ===================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// ===================================
// Dynamic Year in Footer
// ===================================
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.textContent = `© ${currentYear} Akila Tharuka. All rights reserved.`;
}

// ===================================
// Cursor Trail Effect (Optional)
// ===================================
class CursorTrail {
    constructor() {
        this.coords = { x: 0, y: 0 };
        this.circles = [];
        this.colors = ['#667eea', '#764ba2', '#4facfe', '#00f2fe'];
        
        // Create circles
        for (let i = 0; i < 20; i++) {
            const circle = document.createElement('div');
            circle.className = 'cursor-circle';
            circle.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s;
            `;
            document.body.appendChild(circle);
            this.circles.push(circle);
        }
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.coords.x = e.clientX;
            this.coords.y = e.clientY;
        });
        
        this.animateCircles();
    }
    
    animateCircles() {
        let x = this.coords.x;
        let y = this.coords.y;
        
        this.circles.forEach((circle, index) => {
            circle.style.left = x - 5 + 'px';
            circle.style.top = y - 5 + 'px';
            circle.style.transform = `scale(${(this.circles.length - index) / this.circles.length})`;
            circle.style.opacity = (this.circles.length - index) / this.circles.length * 0.5;
            circle.style.backgroundColor = this.colors[index % this.colors.length];
            
            const nextCircle = this.circles[index + 1] || this.circles[0];
            x += (nextCircle.offsetLeft - x) * 0.3;
            y += (nextCircle.offsetTop - y) * 0.3;
        });
        
        requestAnimationFrame(() => this.animateCircles());
    }
}

// Uncomment to enable cursor trail effect
// if (window.innerWidth > 768) {
//     new CursorTrail();
// }

// ===================================
// Text Reveal Animation on Scroll
// ===================================
const revealTexts = document.querySelectorAll('.section-title, .section-description');

const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });

revealTexts.forEach(text => {
    text.style.opacity = '0';
    text.style.transform = 'translateY(20px)';
    text.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    textRevealObserver.observe(text);
});

// ===================================
// Load Animation
// ===================================
// Timeline Tabs Functionality
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Console Message
// ===================================
console.log('%c👋 Hi! I\'m Akila Tharuka', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%c🚀 Full-Stack Web Developer', 'font-size: 14px; color: #4facfe;');
console.log('%c💼 Looking for opportunities? Let\'s connect!', 'font-size: 12px; color: #764ba2;');
    console.log('%c📧 akilatharuka26@gamil.com', 'font-size: 12px; color: #00f2fe;');
