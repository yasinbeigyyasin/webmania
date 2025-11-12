// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Modal Popup
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBtn = document.getElementById('modalBtn');
const contactForm = document.querySelector('.contact-form');

function showModal() {
    modalOverlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // جلوگیری از اسکرول پس‌زمینه
}

function hideModal() {
    modalOverlay.classList.remove('show');
    document.body.style.overflow = ''; // بازگرداندن اسکرول
}

// نمایش پاپ‌اپ بعد از ارسال فرم
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    showModal();
    contactForm.reset();
});

// بستن پاپ‌اپ
modalClose?.addEventListener('click', hideModal);
modalBtn?.addEventListener('click', hideModal);

// بستن با کلیک روی overlay
modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        hideModal();
    }
});

// بستن با دکمه ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
        hideModal();
    }
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(el);
});