// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500); // Small delay for smooth experience
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active Link Highlighting
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Form Submission with EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.disabled = true;

            // EmailJS Configuration
            const serviceID = 'service_d56n9km';
            const templateID = 'template_mpencfi';

            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                to_name: "E Charan Kumar Reddy" // Optional: Add if your template uses it
            };

            emailjs.send(serviceID, templateID, templateParams)
                .then(() => {
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, (err) => {
                    alert('Failed to send message. Please try again later.');
                    console.error('EmailJS Error:', err);
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Background Animation
    initBackgroundAnimation();
    
    // Initialize Neural Network for Hero
    initNeuralCanvas();
    
    // Initialize Neural Network Background for other sections
    initNeuralNetworks();
    
    // 3D Tilt Effect
    initTiltEffect();
});

// Simplified Neural Network for Hero Section - Cosmic Style
function initNeuralCanvas() {
    const canvas = document.getElementById("neuralCanvas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener("resize", resize);
    
    // More nodes for denser cosmic network
    const nodes = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        brightness: Math.random()
    }));
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        nodes.forEach((n, i) => {
            n.x += n.vx;
            n.y += n.vy;
            
            if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
            if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
            
            // Pulse brightness
            n.brightness += (Math.random() - 0.5) * 0.02;
            n.brightness = Math.max(0.3, Math.min(1, n.brightness));
            
            // Draw connections
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = n.x - nodes[j].x;
                const dy = n.y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    const opacity = (1 - dist / 150) * 0.25 * n.brightness;
                    
                    // Gradient line for cosmic effect
                    const gradient = ctx.createLinearGradient(n.x, n.y, nodes[j].x, nodes[j].y);
                    gradient.addColorStop(0, `rgba(0, 255, 255, ${opacity})`);
                    gradient.addColorStop(0.5, `rgba(0, 255, 180, ${opacity * 0.8})`);
                    gradient.addColorStop(1, `rgba(0, 190, 255, ${opacity})`);
                    
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(n.x, n.y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
            
            // Draw nodes with glow
            const nodeGradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 4);
            nodeGradient.addColorStop(0, `rgba(0, 255, 255, ${n.brightness})`);
            nodeGradient.addColorStop(0.5, `rgba(0, 255, 180, ${n.brightness * 0.5})`);
            nodeGradient.addColorStop(1, 'rgba(0, 255, 180, 0)');
            
            ctx.fillStyle = nodeGradient;
            ctx.beginPath();
            ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
            ctx.fill();
            
            // Core node
            ctx.fillStyle = `rgba(255, 255, 255, ${n.brightness * 0.9})`;
            ctx.beginPath();
            ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Neural Network Animation Class
class NeuralNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.mouse = { x: null, y: null };
        this.nodeCount = 60;
        this.connectionDistance = 180;
        this.nodeColor = '#4ade80';
        this.lineColor = 'rgba(74, 222, 128, 0.12)';
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
    
    resize() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.offsetWidth;
        this.canvas.height = parent.offsetHeight;
        this.init();
    }
    
    init() {
        this.nodes = [];
        for (let i = 0; i < this.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.5 + 0.5,
                brightness: Math.random() * 0.5 + 0.3
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw nodes
        this.nodes.forEach(node => {
            // Move nodes
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
            
            // Subtle pulse brightness
            node.brightness += (Math.random() - 0.5) * 0.01;
            node.brightness = Math.max(0.2, Math.min(0.8, node.brightness));
        });
        
        // Draw connections
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    const opacity = (1 - distance / this.connectionDistance) * 0.15;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(74, 222, 128, ${opacity})`;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                    this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Draw mouse connections - subtle
        if (this.mouse.x !== null && this.mouse.y !== null) {
            this.nodes.forEach(node => {
                const dx = this.mouse.x - node.x;
                const dy = this.mouse.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.mouse.x, this.mouse.y);
                    this.ctx.lineTo(node.x, node.y);
                    this.ctx.stroke();
                }
            });
        }
        
        // Draw nodes with subtle glow
        this.nodes.forEach(node => {
            // Soft glow effect
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.radius * 3
            );
            gradient.addColorStop(0, `rgba(74, 222, 128, ${node.brightness * 0.5})`);
            gradient.addColorStop(1, 'rgba(74, 222, 128, 0)');
            
            this.ctx.beginPath();
            this.ctx.fillStyle = gradient;
            this.ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Core node
            this.ctx.beginPath();
            this.ctx.fillStyle = `rgba(74, 222, 128, ${node.brightness * 0.7})`;
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

function initNeuralNetworks() {
    const canvases = document.querySelectorAll('.neural-bg');
    canvases.forEach(canvas => {
        new NeuralNetwork(canvas);
    });
}

function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.glass');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max rotation deg
            const rotateY = ((x - centerX) / centerX) * 5;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            el.style.transition = 'transform 0.1s ease';
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            el.style.transition = 'transform 0.5s ease';
        });
    });
}

function initBackgroundAnimation() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let orbs = [];

    window.addEventListener('resize', resize);

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initOrbs();
    }

    class Orb {
        constructor() {
            this.radius = Math.random() * 200 + 100;
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;

            // Randomize between Light Dim Green variations
            const type = Math.random();
            if (type < 0.4) {
                this.r = 144; this.g = 238; this.b = 144; // Light Green
            } else if (type < 0.8) {
                this.r = 152; this.g = 251; this.b = 152; // Pale Green
            } else {
                this.r = 160; this.g = 220; this.b = 160; // Dimmer Green
            }
            this.alpha = Math.random() * 0.15 + 0.05;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Soft bounce/wrap
            if (this.x < -this.radius) this.x = width + this.radius;
            if (this.x > width + this.radius) this.x = -this.radius;
            if (this.y < -this.radius) this.y = height + this.radius;
            if (this.y > height + this.radius) this.y = -this.radius;
        }

        draw() {
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            gradient.addColorStop(0, `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`);
            gradient.addColorStop(1, `rgba(${this.r}, ${this.g}, ${this.b}, 0)`);

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initOrbs() {
        orbs = [];
        const orbCount = 12; // Number of orbs
        for (let i = 0; i < orbCount; i++) {
            orbs.push(new Orb());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        orbs.forEach(orb => {
            orb.update();
            orb.draw();
        });

        requestAnimationFrame(animate);
    }

    resize();
    animate();
}
