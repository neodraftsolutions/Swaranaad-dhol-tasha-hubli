window.addEventListener('load', () => {
    // Splash screen logic
    const splash = document.getElementById('splash-screen');
    if (splash) {
        setTimeout(() => {
            splash.style.opacity = '0';
            setTimeout(() => splash.remove(), 1000);
        }, 1500); // 1.5 seconds delay before fading out
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation Library with custom settings for "crazy" animations
    AOS.init({
        once: false, // Let them repeat for extra effect on scroll up/down
        offset: 30,
        duration: 1000,
        easing: 'ease-out-cubic',
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (menuBtn && mobileMenu) {
        const menuIcon = menuBtn.querySelector('i');

        function toggleMenu() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            
            if (mobileMenu.classList.contains('flex')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        }

        menuBtn.addEventListener('click', toggleMenu);

        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // Floating Particles for Hero Section (only if container exists)
    createParticles();

    // Performance Archive horizontal scroll controls
    const archiveScroll = document.getElementById('archiveScroll');
    if (archiveScroll) {
        const prevBtn = document.querySelector('[data-archive-prev]');
        const nextBtn = document.querySelector('[data-archive-next]');
        const step = () => Math.max(archiveScroll.clientWidth * 0.8, 300);

        if (prevBtn) prevBtn.addEventListener('click', () => {
            archiveScroll.scrollBy({ left: -step(), behavior: 'smooth' });
        });
        if (nextBtn) nextBtn.addEventListener('click', () => {
            archiveScroll.scrollBy({ left: step(), behavior: 'smooth' });
        });

        // Let a vertical mouse wheel scroll the track horizontally
        archiveScroll.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                archiveScroll.scrollLeft += e.deltaY;
                e.preventDefault();
            }
        }, { passive: false });
    }
});

function createParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;
    
    const particleCount = 20; // Fewer for mobile performance
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        
        const size = Math.random() * 4 + 2; 
        const posX = Math.random() * 100; 
        const posY = Math.random() * 100; 
        const opacity = Math.random() * 0.5 + 0.2;
        const duration = Math.random() * 15 + 10; 
        const delay = Math.random() * 5;
        
        const colors = ['#FF671F', '#E65100', '#CFB53B'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.opacity = opacity;
        particle.style.filter = 'blur(1px)';
        
        // Animation using WAAPI
        particle.animate([
            { transform: `translate(0, 0) scale(1)`, opacity: opacity },
            { transform: `translate(${Math.random() * 50 - 25}px, -${Math.random() * 150 + 50}px) scale(0)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            iterations: Infinity,
            easing: 'linear'
        });
        
        container.appendChild(particle);
    }
}

// WhatsApp Booking Generation
function generateWhatsAppMsg() {
    const name = document.getElementById('b_name').value.trim();
    const phone = document.getElementById('b_phone').value.trim();
    const date = document.getElementById('b_date').value;
    const event = document.getElementById('b_event').value.trim();
    const location = document.getElementById('b_location').value.trim();
    const crowd = document.getElementById('b_crowd').value;
    const duration = document.getElementById('b_duration').value;
    const message = document.getElementById('b_message').value.trim();

    if (!name || !phone || !date || !event || !location) {
        alert("Please fill in all the required fields (*).");
        return;
    }

    let dateObj = new Date(date);
    let formattedDate = !isNaN(dateObj) ? dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : date;

    const whatsappText = `🥁 *SWARANAAD DHOL TASHA HUBLI* 🥁
*GANESH CHATURTHI BOOKING ENQUIRY*

Namaskar Swaranaad Team,

*Name:* ${name}
*Phone:* ${phone}
*Date:* ${formattedDate}
*Procession:* ${event}
*Location:* ${location}
*Crowd:* ${crowd || 'Not specified'}
*Duration:* ${duration || 'Not specified'}

*Additional Info:*
${message || 'None'}

गणपती बाप्पा मोरया 🚩`;

    const encodedText = encodeURIComponent(whatsappText);
    const targetNumber = "919738641082";
    
    window.open(`https://wa.me/${targetNumber}?text=${encodedText}`, '_blank');
}
