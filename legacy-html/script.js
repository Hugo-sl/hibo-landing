document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Mobile Menu Toggle
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('mobile-active');
            
            // Animation de l'icône
            const icon = menuToggle.querySelector('i');
            if (navbar.classList.contains('mobile-active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }

    // Fermer le menu au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('mobile-active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // How It Works Animation Logic
    const hiwCards = document.querySelectorAll('.hiw-card');
    const hiwImages = document.querySelectorAll('.hiw-img');
    
    if (hiwCards.length > 0 && hiwImages.length > 0) {
        let currentStep = 1;

        function updateHIW(step) {
            // Update cards
            hiwCards.forEach(c => c.classList.remove('active'));
            const activeCard = document.querySelector(`.hiw-card[data-step="${step}"]`);
            if (activeCard) activeCard.classList.add('active');

            // Step 1: Immediately force z-index so the incoming active
            // image is on top from frame 1 (prevents flicker on backwards nav)
            hiwImages.forEach((img, index) => {
                const imgStep = index + 1;
                const diff = imgStep - step;
                if (diff === 0) {
                    img.style.zIndex = 10; // Immediately on top
                } else if (diff === 1) {
                    img.style.zIndex = 2;
                } else if (diff === 2) {
                    img.style.zIndex = 1;
                } else {
                    img.style.zIndex = 0;
                }
            });

            // Step 2: Apply classes on next frame so transition starts
            // with correct stacking already in place
            requestAnimationFrame(() => {
                hiwImages.forEach((img, index) => {
                    const imgStep = index + 1;
                    img.className = 'hiw-img';
                    
                    const diff = imgStep - step;
                    
                    if (diff === 0) {
                        img.classList.add('active');
                    } else if (diff === 1) {
                        img.classList.add('next-1');
                    } else if (diff === 2) {
                        img.classList.add('next-2');
                    } else if (diff < 0) {
                        img.classList.add('prev');
                    }
                    // Clear inline z-index after class is set (CSS takes over)
                    img.style.zIndex = '';
                });
            });

            currentStep = step;
        }

        // Initialize state on load
        updateHIW(1);

        hiwCards.forEach(card => {
            card.addEventListener('click', () => {
                const step = parseInt(card.getAttribute('data-step'));
                updateHIW(step);
            });
        });
    }

    // Companion Stage Switcher Logic
    const navPills = document.querySelectorAll('.nav-pill');
    const vizWrappers = document.querySelectorAll('.companion-wrapper');
    const infoContents = document.querySelectorAll('.info-content');
    const companionBlob = document.getElementById('companion-blob');

    const blobStyles = {
        cat: { left: '25%', bg: '#FF9F66' },
        dog: { left: '35%', bg: '#8B5A2B' },
        rabbit: { left: '30%', bg: '#D9888E' }
    };

    if (navPills.length > 0) {
        navPills.forEach(pill => {
            pill.addEventListener('click', () => {
                const comp = pill.getAttribute('data-companion');
                
                // Update Pills
                navPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                // Update Visuals and Info
                vizWrappers.forEach(v => v.classList.remove('active'));
                infoContents.forEach(i => i.classList.remove('active'));
                
                document.getElementById(`viz-${comp}`).classList.add('active');
                document.getElementById(`info-${comp}`).classList.add('active');

                // Update Blob
                if (companionBlob) {
                    companionBlob.style.left = blobStyles[comp].left;
                    companionBlob.style.backgroundColor = blobStyles[comp].bg;
                }
            });
        });
    }
    // Navbar App-Style Tab Bar Logic
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Navbar Scroll Effect (Subtle opacity change)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
        }
    });
});
