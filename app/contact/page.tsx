import React from 'react';
import Link from 'next/link';
import ContactForm from './ContactForm';

export const metadata = {
  title: "Contactez l'équipe Hibo — Nous sommes à votre écoute",
  description: "Une question sur Hibo ? Un besoin d'assistance ? Contactez-nous via notre formulaire ou directement par email. Réponse sous 48h garantie.",
};

export default function ContactPage() {
  return (
    <main className="section" style={{ paddingTop: '8rem', backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
      <div className="section-container" style={{ maxWidth: '1100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        
        {/* Left Side: Info */}
        <div className="contact-info">
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            lineHeight: '1.1', 
            marginBottom: '2rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: '800',
            letterSpacing: '-0.02em'
          }}>
            Parlons de <span className="text-gradient">votre sécurité</span>.
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.6' }}>
            Que vous ayez une question technique, une suggestion ou besoin d'aide pour configurer votre Hibo, notre équipe est là pour vous accompagner.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ width: '56px', height: '56px', background: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', border: '1px solid #eee', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.2rem' }}>Email de support</h3>
                <a href="mailto:contact@hibo.app" style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '1rem', textDecoration: 'none' }}>contact@hibo.app</a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ width: '56px', height: '56px', background: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', border: '1px solid #eee', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.2rem' }}>Délai de réponse</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Sous 48h maximum (souvent plus vite !)</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '4rem' }}>
             <Link href="/" style={{ color: 'var(--text-secondary)', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
               Retour à l'accueil
             </Link>
          </div>
        </div>

        {/* Right Side: Form */}
        <ContactForm />

      </div>
    </main>
  );
}
