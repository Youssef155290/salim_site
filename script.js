// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Custom Smooth Scroll Logic (Lenis)
const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Cursor Liquid Motion
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followX = 0, followY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.05 });
});

function updateFollower() {
    followX += (mouseX - followX) * 0.1;
    followY += (mouseY - followY) * 0.1;
    follower.style.transform = `translate3d(${followX - 20}px, ${followY - 20}px, 0)`;
    requestAnimationFrame(updateFollower);
}
updateFollower();

// Loader Sequence
const loaderProgress = document.querySelector('.loader-progress');
let progress = 0;
const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 10) + 5;
    if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        gsap.to('.loader-wrapper', {
            y: '-100%',
            duration: 1.5,
            ease: 'expo.inOut',
            onComplete: () => {
                document.body.classList.add('loaded');
                initEverything();
            }
        });
    }
    loaderProgress.innerText = `${progress}%`;
}, 100);

function initEverything() {
    // Hero Parallax
    gsap.to('.parallax-img', {
        scrollTrigger: {
            trigger: '.hero-minimal',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: '30%',
        ease: 'none'
    });

    // Header Color Change
    ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => {
            const header = document.querySelector('header');
            if (self.direction === 1) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        }
    });

    // Reveal Logic for all revealable items
    const revealItems = document.querySelectorAll('.reveal-item');
    revealItems.forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 92%',
            },
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: 'power4.out'
        });
    });

    // Hero Text Stagger
    const heroTl = gsap.timeline();
    heroTl.from('.reveal-tag', { opacity: 0, y: 20, duration: 1, delay: 0.5 })
        .from('.reveal-h1', { opacity: 0, y: 100, duration: 1.5, ease: 'power4.out' }, '-=0.5')
        .from('.reveal-p', { opacity: 0, y: 30, duration: 1, ease: 'power3.out' }, '-=1');

    // Menu Logic
    const navBtn = document.getElementById('navTrigger');
    const menu = document.getElementById('overlayMenu');

    navBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        navBtn.classList.toggle('active');
        if (menu.classList.contains('active')) {
            gsap.from('.nav-links li', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power4.out',
                delay: 0.4
            });
        }
    });

    // Link hover scaling for follower
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(follower, { scale: 1.8, backgroundColor: 'rgba(212, 175, 55, 0.1)', duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(follower, { scale: 1, backgroundColor: 'transparent', duration: 0.3 });
        });
    });
}

// Form logic
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn-submit');
        btn.innerText = 'Initializing...';
        setTimeout(() => {
            btn.innerText = 'Inquiry Sent Successfully';
            btn.style.background = '#fff';
            btn.style.color = '#000';
            contactForm.reset();
        }, 2000);
    });
}
