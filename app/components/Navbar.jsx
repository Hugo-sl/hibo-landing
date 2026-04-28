'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileActive, setIsMobileActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    // Initialize icons if lucide is available
    if (window.lucide) {
      window.lucide.createIcons();
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Re-initialize icons when mobile active state changes (to switch menu/x icons)
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [isMobileActive]);

  const toggleMobileMenu = () => {
    setIsMobileActive(!isMobileActive);
  };

  const closeMenu = () => {
    setIsMobileActive(false);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .navbar, .navbar.scrolled {
          background: rgba(255, 255, 255, 0.45) !important;
          backdrop-filter: blur(25px) saturate(200%) !important;
          -webkit-backdrop-filter: blur(25px) saturate(200%) !important;
          isolation: auto !important;
        }
      `}} />
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileActive ? 'mobile-active' : ''}`}>
        <div className="nav-container">
          <Link href="/" className="logo" onClick={closeMenu}>
            <img src="/imgs/icon.webp" alt="Hibo Icon" className="logo-img" />
            <span>Hibo</span>
          </Link>
          <div className="nav-links">
            <Link href="/#how-it-works" onClick={closeMenu}>Comment ça marche</Link>
            <Link href="/#features" onClick={closeMenu}>Fonctionnalités</Link>
            <Link href="/#pricing" onClick={closeMenu}>Tarifs</Link>
            <Link href="/contact" onClick={closeMenu}>Contact</Link>
            <Link href="/blog" onClick={closeMenu}>Blog</Link>
          </div>
          <div className="nav-right">
            <Link href="/#download" className="btn btn-primary nav-cta" onClick={closeMenu}>Télécharger gratuitement</Link>
            <button
              className="mobile-menu-toggle"
              aria-label="Menu"
              onClick={toggleMobileMenu}
            >
              <i data-lucide={isMobileActive ? 'x' : 'menu'}></i>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
