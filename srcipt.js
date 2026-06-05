// ===== TYPEWRITER =====
const words = ['websites.', 'programs.', 'clean UI.', 'digital things.'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const twEl = document.getElementById('tw');

function typeWriter() {
    const current = words[wordIndex];
    if (!isDeleting) {
        twEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1800);
            return;
        }
    } else {
        twEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }
    setTimeout(typeWriter, isDeleting ? 60 : 100);
}
typeWriter();

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
});

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menu-toggle');
const mobileNav  = document.getElementById('mobile-nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== SMOOTH SCROLL FOR ALL NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navbar a');

function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
}

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.tl-card, .svc-card, .proj-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    observer.observe(el);
});

// ===== SEND BUTTON FEEDBACK =====
const btnSend = document.querySelector('.btn-send');
if (btnSend) {
    btnSend.addEventListener('click', () => {
        const original = btnSend.textContent;
        btnSend.textContent = 'Pesan Terkirim';
        btnSend.style.background = '#1a6b3a';
        btnSend.disabled = true;
        setTimeout(() => {
            btnSend.textContent = original;
            btnSend.style.background = '';
            btnSend.disabled = false;
        }, 2500);
    });
}