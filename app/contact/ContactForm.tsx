"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactForm() {
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('LOADING');
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify({
      ...object,
      access_key: "89a55aad-1218-4f80-8036-20eb4bb74b70",
    });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();
      if (result.success) {
        setStatus('SUCCESS');
        setMessage("Merci ! Votre message a bien été envoyé. Nous vous répondrons sous 48h.");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('ERROR');
        setMessage(result.message || "Une erreur est survenue lors de l'envoi.");
      }
    } catch (error) {
      setStatus('ERROR');
      setMessage("Impossible de contacter le serveur. Veuillez réessayer plus tard.");
    }
  }

  return (
    <div className="contact-form-wrapper" style={{ 
      background: 'white', 
      padding: '2.5rem', 
      borderRadius: '24px', 
      boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
      border: '1px solid rgba(0,0,0,0.05)'
    }}>
      {status === 'SUCCESS' ? (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: '#e6f6ec', 
            color: '#059669', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1.5rem' 
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 style={{ color: '#065f46', marginBottom: '1rem' }}>Message envoyé !</h2>
          <p style={{ color: '#065f46', marginBottom: '2rem' }}>{message}</p>
          <button 
            onClick={() => setStatus('IDLE')}
            className="btn btn-primary"
            style={{ width: 'auto' }}
          >
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Honeypot anti-spam */}
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

          <div className="form-group">
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Nom complet</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              placeholder="Votre nom" 
              required 
              style={{ 
                width: '100%', 
                padding: '0.8rem 1rem', 
                borderRadius: '12px', 
                border: '1.5px solid #eee',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Adresse Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="votre@email.com" 
              required 
              style={{ 
                width: '100%', 
                padding: '0.8rem 1rem', 
                borderRadius: '12px', 
                border: '1.5px solid #eee',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Sujet</label>
            <input 
              type="text" 
              name="subject" 
              id="subject" 
              placeholder="De quoi souhaitez-vous discuter ?" 
              required 
              style={{ 
                width: '100%', 
                padding: '0.8rem 1rem', 
                borderRadius: '12px', 
                border: '1.5px solid #eee',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Message</label>
            <textarea 
              name="message" 
              id="message" 
              rows={5} 
              placeholder="Votre message ici..." 
              required 
              style={{ 
                width: '100%', 
                padding: '0.8rem 1rem', 
                borderRadius: '12px', 
                border: '1.5px solid #eee',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            ></textarea>
          </div>

          {status === 'ERROR' && (
            <div style={{ color: '#dc2626', background: '#fef2f2', padding: '1rem', borderRadius: '10px', fontSize: '0.9rem' }}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={status === 'LOADING'}
            className="btn btn-primary"
            style={{ 
              padding: '1rem', 
              fontSize: '1rem', 
              fontWeight: '700',
              opacity: status === 'LOADING' ? 0.7 : 1,
              cursor: status === 'LOADING' ? 'not-allowed' : 'pointer'
            }}
          >
            {status === 'LOADING' ? 'Envoi en cours...' : 'Envoyer le message'}
          </button>
        </form>
      )}
    </div>
  );
}
