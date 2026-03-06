// Initialize GSAP
try {
    gsap.registerPlugin(ScrollTrigger);
} catch (e) {
    console.warn("GSAP failed to load:", e);
}

// Custom Smooth Scroll Logic (Lenis)
let lenis;
try {
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }
} catch (e) {
    console.warn("Lenis failed to load:", e);
}

// Cursor Liquid Motion
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followX = 0, followY = 0;

// Only enable custom cursor if it exists and we're not on mobile
if (window.innerWidth > 1024 && cursor && follower) {
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
} else if (cursor && follower) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
}

// Translations Data
const translations = {
    en: {
        nav_artist: "The Artist",
        nav_expertise: "Expertise",
        nav_process: "Process",
        nav_inquiry: "Inquiry",
        hero_tag: "Est. MMXIV",
        hero_h1: "The Art of <br><span class=\"accent-text\">Precision</span>",
        hero_p: "High-end visual engineering for contemporary brands and private events worldwide.",
        about_tag: "The Visionary",
        about_h2: "Salim <br>Daddiadoun",
        about_lead: "A meticulous observer of light and spatial dynamics, Salim Daddi has established himself as a premier name in high-end event photography.",
        services_tag: "Expertise",
        services_h2: "Photography <span class=\"accent-text\">Service</span>",
        service_01: "High-End Weddings",
        service_01_desc: "Focusing on the architectural elegance and the subtle interactions. We document the ceremony with artistic reverence.",
        service_02: "Corporate Events",
        service_02_desc: "Specialized coverage for international conferences, forums, and summits. Capturing the prestige of your professional infrastructure.",
        service_03: "Stadium Photography",
        service_03_desc: "Capturing the scale and intensity of large-scale sporting events. Expert delivery for prestigious sports arenas.",
        process_h2: "Our Working <span class=\"accent-text\">Blueprint</span>",
        contact_h2: "Available for <br><span class=\"accent-text\">International</span> Commissions",
        footer_since: "Documenting Excellence since 2014."
    },
    fr: {
        nav_artist: "L'Artiste",
        nav_expertise: "Expertise",
        nav_process: "Processus",
        nav_inquiry: "Demande",
        hero_tag: "Depuis 2014",
        hero_h1: "L'Art de la <br><span class=\"accent-text\">Précision</span>",
        hero_p: "Ingénierie visuelle haut de gamme pour marques contemporaines et événements privés mondiaux.",
        about_tag: "Le Visionnaire",
        about_h2: "Salim <br>Daddiadoun",
        about_lead: "Observateur méticuleux de la lumière et des dynamiques spatiales, Salim Daddi s'est imposé comme un nom de référence dans la photographie événementielle de luxe.",
        services_tag: "Expertise",
        services_h2: "Service <span class=\"accent-text\">Photographie</span>",
        service_01: "Mariages de Luxe",
        service_01_desc: "Mettre l'accent sur l'élégance architecturale et les interactions subtiles. Nous documentons la cérémonie avec une révérence artistique.",
        service_02: "Événements d'Entreprise",
        service_02_desc: "Couverture spécialisée pour les conférences internationales, forums et sommets. Capturer le prestige de votre infrastructure professionnelle.",
        service_03: "Photographie de Stade",
        service_03_desc: "Capturer l'ampleur et l'intensité des événements sportifs à grande échelle. Livraison experte pour les stades prestigieux.",
        process_h2: "Notre <span class=\"accent-text\">Méthode</span>",
        contact_h2: "Disponible pour des <br><span class=\"accent-text\">Missions Internationales</span>",
        footer_since: "Documenter l'Excellence depuis 2014."
    },
    ar: {
        nav_artist: "الفنان",
        nav_expertise: "الخبرة",
        nav_process: "العملية",
        nav_inquiry: "استفسار",
        hero_tag: "تأسست عام ٢٠١٤",
        hero_h1: "فن <br><span class=\"accent-text\">الدقة</span>",
        hero_p: "هندسة بصرية متطورة للعلامات التجارية المعاصرة والفعاليات الخاصة في جميع أنحاء العالم.",
        about_tag: "صاحب الرؤية",
        about_h2: "سليم <br>داديادون",
        about_lead: "مراقب دقيق للضوء والديناميكيات المكانية، أثبت سليم دادي نفسه كاسم رائد في التصوير الفوتوغرافي للفعاليات الفاخرة.",
        services_tag: "الخبرة",
        services_h2: "خدمة <span class=\"accent-text\">التصوير</span>",
        service_01: "حفلات الزفاف الفاخرة",
        service_01_desc: "التركيز على الأناقة المعمارية والتفاعلات الدقيقة. نحن نوثق الحفل بوقار فني.",
        service_02: "فعاليات الشركات",
        service_02_desc: "تغطية متخصصة للمؤتمرات والمنتديات والقمم الدولية. التقاط هيبة البنية التحتية المهنية الخاصة بك.",
        service_03: "تصوير الملاعب",
        service_03_desc: "التقاط حجم وكثافة الأحداث الرياضية واسعة النطاق. تسليم احترافي للملاعب والساحات الرياضية المرموقة.",
        process_h2: "مخطط <br><span class=\"accent-text\">عملنا</span>",
        contact_h2: "متاح <br><span class=\"accent-text\">للمهام الدولية</span>",
        footer_since: "توثيق التميز منذ عام ٢٠١٤."
    }
};

function updateContent(lang) {
    const t = translations[lang];
    if (!t) return;

    // Update direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // Update Text Elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.innerHTML = t[key];
        }
    });

    // Update GSAP triggers to refresh positions if needed
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}

// Loader Sequence
const loaderWrapper = document.querySelector('.loader-wrapper');
const loaderProgress = document.querySelector('.loader-progress');

function revealSite() {
    if (!loaderWrapper || loaderWrapper.getAttribute('data-revealed') === 'true') return;
    loaderWrapper.setAttribute('data-revealed', 'true');

    if (typeof gsap !== 'undefined') {
        gsap.to(loaderWrapper, {
            y: '-100%',
            duration: 1.5,
            ease: 'expo.inOut',
            onComplete: () => {
                document.body.classList.add('loaded');
                initEverything();
            }
        });
    } else {
        loaderWrapper.style.display = 'none';
        document.body.classList.add('loaded');
        initEverything();
    }
}

let progress = 0;
const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 10) + 5;
    if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        revealSite();
    }
    if (loaderProgress) loaderProgress.innerText = `${progress}%`;
}, 100);

// Safety Timeout: Reveal site anyway if it takes too long
setTimeout(revealSite, 5000);

function initEverything() {
    // Language Switcher Logic
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateContent(btn.getAttribute('data-lang'));
        });
    });

    if (typeof gsap === 'undefined') return;

    try {
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
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.create({
                start: 'top -80',
                onUpdate: (self) => {
                    const header = document.querySelector('header');
                    if (header) {
                        if (self.direction === 1) header.classList.add('scrolled');
                        else header.classList.remove('scrolled');
                    }
                }
            });
        }

        // Reveal Logic for all revealable items
        const revealItems = document.querySelectorAll('.reveal-item');
        revealItems.forEach(item => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 92%',
                    toggleActions: 'play none none none'
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

    } catch (e) {
        console.warn("GSAP Animations failed:", e);
    }

    // Menu Logic
    const navBtn = document.getElementById('navTrigger');
    const menu = document.getElementById('overlayMenu');

    if (navBtn && menu) {
        navBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
            navBtn.classList.toggle('active');
            if (menu.classList.contains('active') && typeof gsap !== 'undefined') {
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
    }

    // Link hover scaling for follower
    if (follower && typeof gsap !== 'undefined') {
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(follower, { scale: 1.8, backgroundColor: 'rgba(212, 175, 55, 0.1)', duration: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(follower, { scale: 1, backgroundColor: 'transparent', duration: 0.3 });
            });
        });
    }
}

// Form logic
window.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            if (btn) {
                btn.innerText = 'Initializing...';
                setTimeout(() => {
                    btn.innerText = 'Inquiry Sent Successfully';
                    btn.style.background = '#fff';
                    btn.style.color = '#000';
                    contactForm.reset();
                }, 2000);
            }
        });
    }
});
