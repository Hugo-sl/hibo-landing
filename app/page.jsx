'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/lucide@latest';
    script.onload = () => {
      
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
                  const icon = menuToggle.querySelector('i, svg');
                  if (icon) {
                      if (navbar.classList.contains('mobile-active')) {
                          icon.setAttribute('data-lucide', 'x');
                      } else {
                          icon.setAttribute('data-lucide', 'menu');
                      }
                      lucide.createIcons();
                  }
              });
          }
      
          // Fermer le menu au clic sur un lien
          navLinks.forEach(link => {
              link.addEventListener('click', () => {
                  navbar.classList.remove('mobile-active');
                  const icon = menuToggle.querySelector('i, svg');
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
                  navbar.classList.add('scrolled');
              } else {
                  navbar.classList.remove('scrolled');
              }
          });
      
      
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: `
        .navbar, .navbar.scrolled {
          background: rgba(255, 255, 255, 0.45) !important;
          backdrop-filter: blur(25px) saturate(200%) !important;
          -webkit-backdrop-filter: blur(25px) saturate(200%) !important;
          isolation: auto !important;
        }
        .floating-ui {
          background: rgba(255, 255, 255, 0.45) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          isolation: auto !important;
        }
        .price-glass-col {
          background: rgba(255, 255, 255, 0.4) !important;
          backdrop-filter: blur(25px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(25px) saturate(180%) !important;
          isolation: auto !important;
        }
      `}} />
      
      {/* Nav */}
      <nav className="navbar">
          <div className="nav-container">
              <a href="#" className="logo">
                  <img src="/imgs/icon.webp" alt="Hibo Icon" className="logo-img" />
                  <span>Hibo</span>
              </a>
            <div className="nav-links">
                <a href="#how-it-works">Comment ça marche</a>
                <a href="#features">Fonctionnalités</a>
                <a href="#pricing">Tarifs</a>
            </div>
            <div className="nav-right">
                <a href="#download" className="btn btn-primary nav-cta">Télécharger gratuitement</a>
                <button className="mobile-menu-toggle" aria-label="Menu">
                    <i data-lucide="menu"></i>
                </button>
            </div>
        </div>
    </nav>


    {/* Hero Section */}
    <header className="hero section reveal">
        <div className="hero-content">
            <h1>Votre petit compagnon qui veille sur vous, chaque jour.</h1>
            <p>Hibo transforme la sécurité en un rituel quotidien de tendresse. Un simple câlin matinal à votre animal
                virtuel, et vos proches savent que tout va bien.</p>
            <div className="hero-actions">
                <a href="#download" className="btn btn-primary btn-large">Télécharger gratuitement</a>
                <a href="#how-it-works" className="btn btn-ghost btn-large">Voir Hibo en action</a>
            </div>
            <div className="trust-badges">
                <div className="badge">
                    <i data-lucide="shield-check"></i> 
                    Données protégées
                </div>
                <div className="badge">
                    <i data-lucide="smile"></i> 
                    Aucun abonnement obligatoire
                </div>
                <div className="badge">
                    <i data-lucide="check"></i> 
                    Disponible sur iOS & Android
                </div>
            </div>
        </div>

        <div className="hero-image">
            <div className="hero-visual-container">
                {/* Notifications flottantes */}
                <div className="floating-ui ui-1">
                    <div className="ui-icon bg-orange"><i data-lucide="message-square"></i></div>
                    <div className="ui-text">
                        <span className="ui-source">MESSAGES</span>
                        <span className="ui-title">Hibo</span>
                        <span className="ui-body">Denis n'a pas confirmé sa présence aujourd'hui...</span>
                    </div>
                </div>
                <div className="floating-ui ui-2">
                    <div className="ui-icon bg-blue"><i data-lucide="bell"></i></div>
                    <div className="ui-text">
                        <span className="ui-source">HIBO</span>
                        <span className="ui-title">Psst... c'est Hibo ! 👋</span>
                        <span className="ui-body">Votre petit compagnon pointe le bout de son nez pour dire coucou !</span>
                    </div>
                </div>

                <video autoPlay loop muted playsInline className="hero-video-full">
                    <source src="/videos/Hibo%20animation.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    </header>
    {/* Problem Section */}
    <section className="problem-section section reveal">
        <div className="problem-inner">
            {/* Left: Emotional Hook */}
            <div className="problem-left">
                <span className="problem-eyebrow">Le constat</span>
                <h2 className="problem-title">Chaque jour, des millions de personnes vivent seules… dans le silence.</h2>
                <p className="problem-lead">Une chute, un malaise, un simple mauvais jour. Quand on vit seul, il n'y a
                    parfois personne pour s'en apercevoir ni ce matin-là, ni les jours suivants.</p>
                <div className="problem-stat">
                    <span className="stat-number">4M</span>
                    <div>
                        <span className="stat-label">de personnes âgées vivent seules en France, souvent sans filet de
                            sécurité quotidien.</span>
                        <span className="stat-source">Source : INSEE, Février 2025</span>
                    </div>
                </div>
            </div>

            {/* Right: Three pain points */}
            <div className="problem-right">
                <div className="pain-point">
                    <div className="pain-icon">
                        <i data-lucide="phone-missed"></i>
                    </div>
                    <div className="pain-text">
                        <h4>« Elle répond pas au téléphone... »</h4>
                        <p>Un appel sans réponse. Puis deux. L'inquiétude monte, mais on ne sait pas si c'est grave ou
                            non.</p>
                    </div>
                </div>
                <div className="pain-point">
                    <div className="pain-icon">
                        <i data-lucide="map-pin-off"></i>
                    </div>
                    <div className="pain-text">
                        <h4>La distance qui pèse</h4>
                        <p>Vous êtes loin, vous avez votre vie. Mais pas un jour ne passe sans vous demander si tout va
                            bien.</p>
                    </div>
                </div>
                <div className="pain-point">
                    <div className="pain-icon">
                        <i data-lucide="clock-alert"></i>
                    </div>
                    <div className="pain-text">
                        <h4>Des heures perdues avant l'alerte</h4>
                        <p>Sans système en place, des heures, parfois des jours peuvent s'écouler sans que personne
                            ne soit averti.</p>
                    </div>
                </div>

                {/* Bridge to solution */}
                <div className="problem-bridge">
                    <i data-lucide="arrow-down"></i>
                    <span>Hibo existe pour changer ça.</span>
                </div>
            </div>
        </div>

        {/* Section Divider: Organic SVG Wave */}
        <div className="section-divider">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                preserveAspectRatio="none">
                <path
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    fill="#1A1612"></path>
            </svg>
        </div>
    </section>

    {/* How It Works Section */}
    <section id="how-it-works" className="how-it-works section reveal">
        <div className="section-container">
            <h2>Comment ça fonctionne ?</h2>
            <p className="subtitle" style={{textAlign: "left", maxWidth: "600px", marginBottom: "4rem"}}>Un petit geste chaque
                jour. Une grande tranquillité pour vous et vos proches.</p>

            <div className="hiw-split">
                {/* Left: Text Cards */}
                <div className="hiw-text-cards">
                    <div className="hiw-card active" data-step="1">
                        <h3>Choisissez votre compagnon</h3>
                        <p>Adoptez un petit animal virtuel. Chien, chat ou lapin, c'est lui qui vous attendra chaque
                            matin avec impatience sur votre téléphone.</p>
                    </div>
                    <div className="hiw-card" data-step="2">
                        <h3>Caressez-le chaque jour</h3>
                        <p>D'un simple geste sur l'écran pour le réveiller, vous dites "tout va bien". Hibo est rassuré,
                            vos proches aussi.</p>
                    </div>
                    <div className="hiw-card" data-step="3">
                        <h3>Hibo veille discrètement</h3>
                        <p>Si vous oubliez, Hibo envoie de doux rappels. En cas de non-réponse prolongée, il contacte
                            vos proches selon le mode choisi.</p>
                    </div>
                </div>

                {/* Right: Sticky Mockup Viewer */}
                <div className="hiw-mockup-viewer">
                    <div className="hiw-mockup-sticky">
                        <img src="/imgs/iphone_awake-dog.webp" alt="Etape 1" className="hiw-img active" id="hiw-img-1" loading="lazy" />
                        <img src="/imgs/iphone_endormi-rabbit.webp" alt="Etape 2" className="hiw-img next" id="hiw-img-2" loading="lazy" />
                        <img src="/imgs/iphone_settings-mode vacances-02.webp" alt="Etape 3" className="hiw-img next" id="hiw-img-3" loading="lazy" />
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Companions Section (Interactive Showcase) */}
    <section id="companions" className="companions section reveal">
        <div className="section-container">
            <div className="companions-header text-center">
                <h2>Choisissez votre nouveau rituel</h2>
                <p className="subtitle">Chaque matin, un lien unique qui apaise vos proches et illumine votre journée.</p>
            </div>

            <div className="companion-showcase">
                {/* Navigation (App Style) */}
                <div className="companion-nav">
                    <button className="nav-pill active" data-companion="cat">
                        <div className="pill-svg-container">
                            <svg viewBox="0 0 200 200">
                                <g>
                                    <path d="M 130 150 Q 180 150 170 110 Q 160 80 140 100" stroke="#D4B896"
                                        strokeWidth="16" fill="none" strokeLinecap="round" />
                                    <path d="M 50 100 L 40 40 L 90 60 Z" fill="#D4B896" />
                                    <path d="M 54 85 L 48 50 L 78 62 Z" fill="#F5C6C6" opacity="0.6" />
                                    <path d="M 150 100 L 160 40 L 110 60 Z" fill="#D4B896" />
                                    <path d="M 146 85 L 152 50 L 122 62 Z" fill="#F5C6C6" opacity="0.6" />
                                    <circle cx="100" cy="110" r="60" fill="#E8D5C4" />
                                    <circle cx="80" cy="105" r="6" fill="#1A1A1A" />
                                    <circle cx="120" cy="105" r="6" fill="#1A1A1A" />
                                    <circle cx="82" cy="103" r="2" fill="#FFFFFF" />
                                    <circle cx="122" cy="103" r="2" fill="#FFFFFF" />
                                    <path d="M 95 118 L 105 118 L 100 124 Z" fill="#D9888E" />
                                </g>
                            </svg>
                        </div>
                        <span className="pill-label">Chat</span>
                    </button>
                    <button className="nav-pill" data-companion="dog">
                        <div className="pill-svg-container">
                            <svg viewBox="0 0 200 200">
                                <g transform="scale(1.1) translate(-10, -10)">
                                    <path d="M 72 53 Q 14 69 22 127 Q 34 163 64 147 Q 100 129 72 53 Z" fill="#8B5A2B" />
                                    <path d="M 128 53 Q 186 69 178 127 Q 166 163 136 147 Q 100 129 128 53 Z"
                                        fill="#8B5A2B" />
                                    <path
                                        d="M 50 100 Q 50 40 100 40 Q 150 40 150 100 Q 150 145 100 145 Q 50 145 50 100 Z"
                                        fill="#D49E6A" />
                                    <path
                                        d="M 75 90 Q 100 80 125 90 Q 145 110 135 140 Q 120 155 100 155 Q 80 155 65 140 Q 55 110 75 90 Z"
                                        fill="#EAD6C0" />
                                    <circle cx="80" cy="82" r="7" fill="#4A3728" />
                                    <circle cx="120" cy="82" r="7" fill="#4A3728" />
                                    <circle cx="82" cy="79" r="2.5" fill="#FFF" />
                                    <circle cx="122" cy="79" r="2.5" fill="#FFF" />
                                    <path d="M88 110 Q100 105 112 110 Q100 125 88 110 Z" fill="#4A3728" />
                                </g>
                            </svg>
                        </div>
                        <span className="pill-label">Chien</span>
                    </button>
                    <button className="nav-pill" data-companion="rabbit">
                        <div className="pill-svg-container">
                            <svg viewBox="0 0 200 200">
                                <g>
                                    <path d="M 68 65 C 45 -10 95 -10 95 65 Z" fill="#E5D9D1" />
                                    <path d="M 73 60 C 55 10 85 10 88 60 Z" fill="#F0B9B9" opacity="0.8" />
                                    <path d="M 132 65 C 155 -10 105 -10 105 65 Z" fill="#E5D9D1" />
                                    <path d="M 127 60 C 145 10 115 10 112 60 Z" fill="#F0B9B9" opacity="0.8" />
                                    <circle cx="100" cy="110" r="55" fill="#E5D9D1" />
                                    <circle cx="80" cy="100" r="7" fill="#5A4E46" />
                                    <circle cx="120" cy="100" r="7" fill="#5A4E46" />
                                    <circle cx="82" cy="97" r="2.5" fill="#FFFFFF" />
                                    <circle cx="122" cy="97" r="2.5" fill="#FFFFFF" />
                                </g>
                            </svg>
                        </div>
                        <span className="pill-label">Lapin</span>
                    </button>
                </div>

                {/* Main Stage */}
                <div className="stage-area">
                    <div className="stage-blobs">
                        <div className="blob-organic" id="companion-blob"></div>
                    </div>

                    <div className="stage-grid">
                        <div className="stage-visual">
                            <div className="companion-wrapper active" id="viz-cat">
                                {/* CAT SVG (Exact Design) */}
                                <svg viewBox="0 0 200 200" className="svg-hero">
                                    <g className="svg-move">
                                        <path d="M 130 150 Q 180 150 170 110 Q 160 80 140 100" stroke="#D4B896"
                                            strokeWidth="16" fill="none" strokeLinecap="round" />
                                        <path d="M 50 100 L 40 40 L 90 60 Z" fill="#D4B896" />
                                        <path d="M 54 85 L 48 50 L 78 62 Z" fill="#F5C6C6" opacity="0.6" />
                                        <path d="M 150 100 L 160 40 L 110 60 Z" fill="#D4B896" />
                                        <path d="M 146 85 L 152 50 L 122 62 Z" fill="#F5C6C6" opacity="0.6" />
                                        <circle cx="100" cy="110" r="60" fill="#E8D5C4" />
                                        <circle cx="80" cy="105" r="6" fill="#1A1A1A" />
                                        <circle cx="120" cy="105" r="6" fill="#1A1A1A" />
                                        <circle cx="82" cy="103" r="2" fill="#FFFFFF" />
                                        <circle cx="122" cy="103" r="2" fill="#FFFFFF" />
                                        <path d="M 95 118 L 105 118 L 100 124 Z" fill="#D9888E" />
                                        <line x1="45" y1="110" x2="65" y2="114" stroke="#1A1A1A" strokeWidth="1.5"
                                            strokeLinecap="round" />
                                        <line x1="40" y1="120" x2="65" y2="120" stroke="#1A1A1A" strokeWidth="1.5"
                                            strokeLinecap="round" />
                                        <line x1="155" y1="110" x2="135" y2="114" stroke="#1A1A1A" strokeWidth="1.5"
                                            strokeLinecap="round" />
                                        <line x1="160" y1="120" x2="135" y2="120" stroke="#1A1A1A" strokeWidth="1.5"
                                            strokeLinecap="round" />
                                    </g>
                                </svg>
                            </div>
                            <div className="companion-wrapper" id="viz-dog">
                                {/* DOG SVG (Exact Design) */}
                                <svg viewBox="0 0 200 200" className="svg-hero">
                                    <g className="svg-move" transform="scale(1.1) translate(-10, -10)">
                                        <path d="M 72 53 Q 14 69 22 127 Q 34 163 64 147 Q 100 129 72 53 Z"
                                            fill="#8B5A2B" />
                                        <path d="M 128 53 Q 186 69 178 127 Q 166 163 136 147 Q 100 129 128 53 Z"
                                            fill="#8B5A2B" />
                                        <path
                                            d="M 50 100 Q 50 40 100 40 Q 150 40 150 100 Q 150 145 100 145 Q 50 145 50 100 Z"
                                            fill="#D49E6A" />
                                        <path
                                            d="M 75 90 Q 100 80 125 90 Q 145 110 135 140 Q 120 155 100 155 Q 80 155 65 140 Q 55 110 75 90 Z"
                                            fill="#EAD6C0" />
                                        <circle cx="80" cy="82" r="7" fill="#4A3728" />
                                        <circle cx="120" cy="82" r="7" fill="#4A3728" />
                                        <circle cx="82" cy="79" r="2.5" fill="#FFF" />
                                        <circle cx="122" cy="79" r="2.5" fill="#FFF" />
                                        <path d="M88 110 Q100 105 112 110 Q100 125 88 110 Z" fill="#4A3728" />
                                        <path d="M90 122 Q100 132 110 122" stroke="#4A3728" strokeWidth="2" fill="none"
                                            strokeLinecap="round" />
                                        <path d="M94 128 Q94 140 100 140 Q106 140 106 128 Z" fill="#FF9999" />
                                    </g>
                                </svg>
                            </div>
                            <div className="companion-wrapper" id="viz-rabbit">
                                {/* RABBIT SVG (Exact Design with fixed viewBox) */}
                                <svg viewBox="0 -15 200 215" className="svg-hero">
                                    <g className="svg-move">
                                        <path d="M 68 65 C 45 -10 95 -10 95 65 Z" fill="#E5D9D1" />
                                        <path d="M 73 60 C 55 10 85 10 88 60 Z" fill="#F0B9B9" opacity="0.8" />
                                        <path d="M 132 65 C 155 -10 105 -10 105 65 Z" fill="#E5D9D1" />
                                        <path d="M 127 60 C 145 10 115 10 112 60 Z" fill="#F0B9B9" opacity="0.8" />
                                        <circle cx="100" cy="110" r="55" fill="#E5D9D1" />
                                        <circle cx="65" cy="120" r="10" fill="#F0B9B9" opacity="0.4" />
                                        <circle cx="135" cy="120" r="10" fill="#F0B9B9" opacity="0.4" />
                                        <circle cx="80" cy="100" r="7" fill="#5A4E46" />
                                        <circle cx="120" cy="100" r="7" fill="#5A4E46" />
                                        <circle cx="82" cy="97" r="2.5" fill="#FFFFFF" />
                                        <circle cx="122" cy="97" r="2.5" fill="#FFFFFF" />
                                        <line x1="45" y1="110" x2="60" y2="114" stroke="#5A4E46" strokeWidth="1.5"
                                            strokeLinecap="round" opacity="0.3" />
                                        <line x1="42" y1="118" x2="60" y2="118" stroke="#5A4E46" strokeWidth="1.5"
                                            strokeLinecap="round" opacity="0.3" />
                                        <line x1="155" y1="110" x2="140" y2="114" stroke="#5A4E46" strokeWidth="1.5"
                                            strokeLinecap="round" opacity="0.3" />
                                        <line x1="158" y1="118" x2="140" y2="118" stroke="#5A4E46" strokeWidth="1.5"
                                            strokeLinecap="round" opacity="0.3" />
                                        <ellipse cx="100" cy="116" rx="5" ry="3.5" fill="#D9888E" />
                                        <line x1="100" y1="119" x2="100" y2="128" stroke="#5A4E46" strokeWidth="2"
                                            strokeLinecap="round" />
                                        <path d="M 91 128 Q 100 136 109 128" stroke="#5A4E46" strokeWidth="2"
                                            fill="none" strokeLinecap="round" />
                                        <path d="M 96 130 L 104 130 L 104 138 L 96 138 Z" fill="#FFFFFF"
                                            stroke="#5A4E46" strokeWidth="1.5" strokeLinejoin="round" />
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div className="stage-info">
                            <div className="info-content active" id="info-cat">
                                <span className="info-tag">Indépendant & câlin</span>
                                <h3 className="info-title">Milo le Chat</h3>
                                <p className="info-desc">Milo aime la tranquillité. Il vous attendra patiemment sur l'écran
                                    d'accueil pour sa petite caresse rituelle avant de retourner à ses rêves.</p>
                                <div className="info-routine">
                                    <span className="routine-label"><i data-lucide="sun"></i> Rituel du matin :</span>
                                    <p>"Je suis calme, affectueux et toujours là pour vous accueillir."</p>
                                </div>
                            </div>
                            <div className="info-content" id="info-dog">
                                <span className="info-tag">Fidèle & joyeux</span>
                                <h3 className="info-title">Oscar le Chien</h3>
                                <p className="info-desc">Toujours enthousiaste ! Oscar remuera la queue sur votre écran pour
                                    vous fêter chaque nouvelle journée qui commence.</p>
                                <div className="info-routine">
                                    <span className="routine-label"><i data-lucide="sun"></i> Son signal de départ :</span>
                                    <p>"Il n'attend que votre signal pour s'étirer et bondir hors du lit,
                                        prêt pour l'aventure"</p>
                                </div>
                            </div>
                            <div className="info-content" id="info-rabbit">
                                <span className="info-tag">Douce & attentive</span>
                                <h3 className="info-title">Luna le Lapin</h3>
                                <p className="info-desc">La discrétion même. Luna apporte une touche de douceur infinie et
                                    de calme à votre routine matinale.</p>
                                <div className="info-routine">
                                    <span className="routine-label"><i data-lucide="sun"></i> L'appel du matin :</span>
                                    <p>"Sa manière de vous dire bonjour ? S'éveiller en douceur dès que vous l'appelez
                                        d'une petite caresse."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Features Section */}
    <section id="features" className="features section reveal">
        <div className="section-container">
            <div className="features-intro">
                <span className="features-kicker">Ce qui rend Hibo unique</span>
                <h2>Un ami discret.<br />Une sécurité invisible.</h2>
                <p className="features-subtitle">Hibo ne ressemble pas à une application de sécurité. Il ne se comporte pas
                    comme une alarme. Il s'inquiète, il attend et il se réjouit, comme un vrai compagnon le ferait.</p>
            </div>

            {/* Feature Rows */}
            <div className="feature-row reveal">
                <div className="feature-row-visual">
                    <img src="/imgs/iphone_endormi.webp" alt="Animal endormi sur l'app" className="feature-row-media" loading="lazy" />
                </div>
                <div className="feature-row-text">
                    <span className="tag">🐾 Le compagnon</span>
                    <h3>Un compagnon, pas une surveillance</h3>
                    <p>Personne n'a envie de se sentir surveillé. Hibo ressemble à un compagnon, fonctionne comme un
                        filet de sécurité. Et ça change tout.</p>
                    <ul className="feature-bullets">
                        <li><i data-lucide="check-circle"></i> Interaction douce et naturelle</li>
                        <li><i data-lucide="check-circle"></i> Un rituel positif chaque matin</li>
                        <li><i data-lucide="check-circle"></i> Jamais intrusif, toujours bienveillant</li>
                    </ul>
                </div>
            </div>

            <div className="feature-row feature-row-reverse reveal">
                <div className="feature-row-visual">
                    <img src="/imgs/iphone_settings-01.webp" alt="Contacts d'urgence" className="feature-row-media" loading="lazy" />
                </div>
                <div className="feature-row-text">
                    <span className="tag">💛 Pour vos proches</span>
                    <h3>Contacts d'urgence</h3>
                    <p>Ajoutez les personnes qui comptent pour vous. Si Hibo remarque une absence inhabituelle, elles
                        sont prévenues.</p>
                    <ul className="feature-bullets">
                        <li><i data-lucide="check-circle"></i> Jusqu'à 3 contacts configurables</li>
                        <li><i data-lucide="check-circle"></i> Rappels progressifs avant toute alerte</li>
                        <li><i data-lucide="check-circle"></i> Une escalade pensée pour éviter les faux signaux</li>
                    </ul>
                </div>
            </div>

            <div className="feature-row reveal">
                <div className="feature-row-visual">
                    <img src="/imgs/iphone_mode vacances.webp" alt="Mode Vacances" className="feature-row-media" loading="lazy" />
                </div>
                <div className="feature-row-text">
                    <span className="tag">🌴 Liberté</span>
                    <h3>Partez serein Hibo s'adapte</h3>
                    <p>Vacances, déplacement, changement de rythme : Hibo s’ajuste à votre quotidien pour ne jamais
                        alerter inutilement.</p>
                    <ul className="feature-bullets">
                        <li><i data-lucide="check-circle"></i> Mode vacances en un geste</li>
                        <li><i data-lucide="check-circle"></i> Heure de rappel personnalisée</li>
                        <li><i data-lucide="check-circle"></i> Disponible sur iOS & Android</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    {/* Testimonials / Persona Section */}
    <section className="testimonials section reveal">
        {/* Background elements for depth */}
        <div className="persona-bg-blob blob-left"></div>
        <div className="persona-bg-blob blob-right"></div>

        <div className="section-container" style={{position: "relative", zIndex: 2}}>
            <div className="section-head text-center">
                <h2>Hibo, c'est pour qui ?</h2>
                <p className="subtitle">Une solution humaine, adaptée à chaque lien de confiance.</p>
            </div>

            <div className="personas-grid">
                {/* Case 1: Individuel */}
                <div className="persona-card card-orange">
                    <div className="persona-tag">Indépendance</div>
                    <div className="avatar bg-orange-light">
                        <i data-lucide="home"></i>
                    </div>
                    <h3>Pour vous, si vous vivez seul(e)</h3>
                    <p>Gardez votre autonomie tout en offrant une tranquillité d'esprit totale à vos proches. Un rituel
                        quotidien qui célèbre votre présence.</p>
                </div>

                {/* Case 2: Famille */}
                <div className="persona-card card-cream">
                    <div className="persona-tag">Famille</div>
                    <div className="avatar bg-cream-light">
                        <i data-lucide="heart"></i>
                    </div>
                    <h3>Pour vos enfants, si vous êtes loin</h3>
                    <p>Un fil invisible entre les générations. Recevez leur affection matinale sans avoir l'impression
                        de les déranger.</p>
                </div>

                {/* Case 3: Professionnels */}
                <div className="persona-card card-green">
                    <div className="persona-tag">Aidants</div>
                    <div className="avatar bg-green-light">
                        <i data-lucide="briefcase"></i>
                    </div>
                    <h3>Pour les aidants et soignants</h3>
                    <p>Simplifiez votre suivi quotidien. Hibo vous permet de vous concentrer sur l'essentiel : le lien
                        humain et l'accompagnement.</p>
                </div>
            </div>
        </div>
    </section>

    {/* Pricing Section */}
    <section id="pricing" className="pricing section reveal">
        {/* Decoration for glassmorphism */}
        <div className="pricing-bg-blob blob-1"></div>
        <div className="pricing-bg-blob blob-2"></div>

        <div className="section-container text-center" style={{position: "relative", zIndex: 2}}>
            <h2>Choisissez votre formule</h2>
            <p className="subtitle">Commencez gratuitement. Évoluez selon vos besoins.</p>

            <div className="pricing-glass-container">
                <div className="price-glass-col">
                    <h3 className="glass-title">Free</h3>
                    <p className="glass-desc">L’essentiel pour commencer <br /> en douceur.</p>
                    <div className="glass-price">0€<span>/ mois</span></div>
                    <div className="glass-divider"></div>
                    <ul className="glass-features">
                        <li>1 check-in par jour</li>
                        <li>Rappel push à H+2, puis H+5</li>
                        <li>Email au contact ppal à H+6</li>
                        <li>1 contact d'urgence</li>
                    </ul>
                    <a href="#" className="btn btn-glass mt-auto">Commencer gratuitement</a>
                </div>

                <div className="price-glass-col highlight">
                    <div className="highlight-badge">⭐ RECOMMANDÉ</div>
                    <h3 className="glass-title">Premium</h3>
                    <p className="glass-desc">Le bon équilibre pour <br /> le quotidien.</p>
                    <div className="glass-price">4.99€<span>/ mois</span></div>
                    <div className="glass-divider"></div>
                    <ul className="glass-features">
                        <li>1 check-in par jour</li>
                        <li>Rappel push dès H+1, puis H+3</li>
                        <li>Email à vos contacts à H+4</li>
                        <li>SMS à tous vos contacts à H+6</li>
                        <li>Jusqu'à 3 contacts d'urgence</li>
                        <li>Mode vacances</li>
                    </ul>
                    <a href="#" className="btn btn-primary-dark mt-auto">Essayer Premium</a>
                </div>

                <div className="price-glass-col">
                    <h3 className="glass-title">Sérénité +</h3>
                    <p className="glass-desc">Une vigilance renforcée, matin et soir.</p>
                    <div className="glass-price">6.99€<span>/ mois</span></div>
                    <div className="glass-divider"></div>
                    <ul className="glass-features">
                        <li>2 check-ins par jour (matin & soir)</li>
                        <li>Rappels ultra-précis matin et soir</li>
                        <li>Email & SMS progressifs sur 2 jours</li>
                        <li>Jusqu'à 3 contacts prioritaires</li>
                        <li>Mode vacances</li>
                    </ul>
                    <a href="#" className="btn btn-glass mt-auto">Choisir Sérénité +</a>
                </div>
            </div>
            <p className="pricing-note">Sans engagement. Géré via l'App Store / Google Play.</p>
        </div>
    </section>

    {/* Reassurance Section */}
    <section className="reassurance section reveal">
        <div className="section-container">
            <h2>Votre vie privée, c'est sacré.</h2>
            <div className="trust-grid">
                <div className="trust-item">
                    <i data-lucide="lock-keyhole"></i>
                    <h4>Données chiffrées</h4>
                    <p>Vos informations ne sont jamais revendues ni partagées.</p>
                </div>
                <div className="trust-item">
                    <i data-lucide="flag"></i>
                    <h4>Hébergé en Europe</h4>
                    <p>Vos données restent en Europe..</p>
                </div>
                <div className="trust-item">
                    <i data-lucide="map-pin-off"></i>
                    <h4>Aucune localisation</h4>
                    <p>Hibo ne suit jamais vos déplacements.</p>
                </div>
            </div>
        </div>
    </section>


    {/* FAQ Section */}
    <section id="faq" className="faq-section section reveal">
        <div className="faq-container">
            <div className="section-header">
                <span className="section-subtitle">FAQ</span>
                <h2 className="section-title">Questions fréquentes</h2>
                <p className="section-desc">Tout ce que vous devez savoir sur Hibo pour une tranquillité d'esprit totale.</p>
            </div>

            <div className="faq-grid">
                <div className="faq-item">
                    <details>
                        <summary>C'est quoi exactement Hibo ? <span className="plus">+</span></summary>
                        <div className="faq-content">
                            <p>Hibo est une application de bien-être et de lien social pour les personnes qui vivent seules. Chaque jour, vous caressez votre petit compagnon virtuel pour signaler que tout va bien. Si vous ne le faites pas, Hibo prévient doucement vos proches. C'est tout. Simple, doux, sans pression.</p>
                        </div>
                    </details>
                </div>

                <div className="faq-item">
                    <details>
                        <summary>Comment fonctionne le système d'alertes ? <span className="plus">+</span></summary>
                        <div className="faq-content">
                            <p>Vous choisissez une heure de rappel dans les réglages. Si vous n'avez pas fait votre check-in dans les heures qui suivent, Hibo vous envoie d'abord des rappels sur votre téléphone. Si vous ne répondez toujours pas, vos contacts d'urgence sont prévenus par email. Avec la version Premium, ils peuvent aussi être alertés par SMS.</p>
                        </div>
                    </details>
                </div>

                <div className="faq-item">
                    <details>
                        <summary>Mes proches seront-ils spammés ou dérangés inutilement ? <span className="plus">+</span></summary>
                        <div className="faq-content">
                            <p>Non. Vos proches ne reçoivent une alerte que si vous n'avez vraiment pas donné de nouvelles pendant plusieurs heures. Hibo est conçu pour ne jamais déranger inutilement, ni vous ni eux.</p>
                        </div>
                    </details>
                </div>

                <div className="faq-item">
                    <details>
                        <summary>Puis-je partir en vacances sans déclencher d'alertes ? <span className="plus">+</span></summary>
                        <div className="faq-content">
                            <p>Oui. Le mode vacances suspend toutes les alertes pour la durée que vous souhaitez. Il s'active en deux secondes depuis les réglages. Vos proches ne recevront rien pendant votre absence.</p>
                        </div>
                    </details>
                </div>

                <div className="faq-item">
                    <details>
                        <summary>Est-ce que je peux choisir mon animal ? <span className="plus">+</span></summary>
                        <div className="faq-content">
                            <p>Oui. Vous choisissez entre un chat, un chien ou un lapin. Chaque compagnon a sa personnalité et vous attend chaque matin. Vous pouvez en changer à tout moment depuis les réglages.</p>
                        </div>
                    </details>
                </div>

                <div className="faq-item">
                    <details>
                        <summary>Est-ce que Hibo me surveille ? <span className="plus">+</span></summary>
                        <div className="faq-content">
                            <p>Non. Hibo ne collecte pas votre localisation, n'accède pas à vos contacts téléphoniques et n'utilise aucune caméra. Si vos proches ne reçoivent rien, c'est que tout va bien. Pas de GPS. Pas de caméra. Juste un geste doux.</p>
                        </div>
                    </details>
                </div>

                <div className="faq-item">
                    <details>
                        <summary>Quelle est la différence entre Gratuit et Premium ? <span className="plus">+</span></summary>
                        <div className="faq-content">
                            <p>La version gratuite vous permet d'ajouter un contact d'urgence et d'envoyer des alertes par email. La version Premium vous permet d'ajouter jusqu'à 3 contacts, d'envoyer des alertes par email et par SMS, et bénéficie d'une escalade plus rapide.</p>
                        </div>
                    </details>
                </div>

                <div className="faq-item">
                    <details>
                        <summary>Comment résilier mon abonnement Premium ? <span className="plus">+</span></summary>
                        <div className="faq-content">
                            <p>Vous pouvez résilier à tout moment depuis les réglages de votre store, App Store ou Google Play. Aucune condition, aucune pénalité. Vous repassez automatiquement sur la version gratuite.</p>
                        </div>
                    </details>
                </div>
            </div>
        </div>
    </section>

    {/* Final CTA Box */}
    <section id="download" className="final-cta section reveal">
        <div className="section-container">
            <div className="cta-box">
                <div className="cta-bg-shape"></div>
                <div className="cta-bg-shape shape-2"></div>

                <div className="cta-box-content">
                    <h2>La tranquillité, c'est un petit geste par jour.</h2>

                    <ul className="cta-benefits">
                        <li>
                            <div className="icon-circle"><i data-lucide="check"></i></div>
                            Adoptez votre compagnon en 2 minutes
                        </li>
                        <li>
                            <div className="icon-circle"><i data-lucide="check"></i></div>
                            Commencez gratuitement
                        </li>
                    </ul>

                    <div className="cta-badges">
                        <a href="#" className="store-badge">
                            <img src="https://cdn.simpleicons.org/apple/ffffff" alt="Apple" className="store-icon" />
                            <div className="store-text">
                                <span className="small">Télécharger dans l'</span>
                                <span className="big">App Store</span>
                            </div>
                        </a>
                        <a href="#" className="store-badge">
                            <img src="https://cdn.simpleicons.org/googleplay/ffffff" alt="Google Play"
                                className="store-icon" />
                            <div className="store-text">
                                <span className="small">Disponible sur</span>
                                <span className="big">Google Play</span>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="cta-box-image">
                    <img src="/imgs/iphone_awake-dog.webp" alt="L'application Hibo" className="cta-mockup" loading="lazy" />
                </div>
            </div>
        </div>
    </section>

    {/* Footer */}
    <footer className="footer">
        <div className="footer-container">
            <div className="footer-logo">
                <img src="/imgs/icon.webp" alt="Hibo Icon" className="logo-img" />
                <span>Hibo</span>
            </div>
            <div className="footer-links">
                <a href="#">Politique de confidentialité</a>
                <a href="#">CGU</a>
                <a href="#">Contact</a>
            </div>
            <div className="footer-copyright">
                © 2026 Hibo — Fait avec 💛 pour ceux qui vivent seuls
            </div>
        </div>
    </footer>
    </main>
  );
}