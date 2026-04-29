'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DownloadPage() {
    const [device, setDevice] = useState(null); // 'android', 'ios', 'desktop'
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent;
        if (/android/i.test(ua)) {
            setDevice('android');
            window.location.href = "https://play.google.com/store/apps/details?id=com.hugosl.hibo";
        } else if (/iPhone|iPad|iPod/i.test(ua)) {
            setDevice('ios');
        } else {
            setDevice('desktop');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            // Ici on pourrait envoyer l'email à une API ou Sanity
            console.log('Email collecté pour iOS:', email);
            setSubmitted(true);
        }
    };

    if (!device) return <div className="loading-screen">
        <div className="loader"></div>
        <style jsx>{`
            .loading-screen {
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #FFF9F0;
            }
            .loader {
                width: 40px;
                height: 40px;
                border: 3px solid #FF9F66;
                border-bottom-color: transparent;
                border-radius: 50%;
                display: inline-block;
                box-sizing: border-box;
                animation: rotation 1s linear infinite;
            }
            @keyframes rotation {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}</style>
    </div>;

    // Redirection en cours pour Android
    if (device === 'android') {
        return (
            <div className="download-container">
                <img src="/imgs/icon.webp" alt="Hibo" className="download-logo" />
                <h1>Redirection vers Google Play...</h1>
                <p>Si la page ne s'ouvre pas, <a href="https://play.google.com/store/apps/details?id=com.hugosl.hibo">cliquez ici</a>.</p>
                
                <style jsx>{`
                    .download-container {
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 2rem;
                        text-align: center;
                        background: #FFF9F0;
                        font-family: 'Nunito', sans-serif;
                    }
                    .download-logo { width: 80px; margin-bottom: 2rem; }
                    h1 { color: #1A1A1A; margin-bottom: 1rem; }
                    a { color: #FF9F66; font-weight: 700; text-decoration: underline; }
                `}</style>
            </div>
        );
    }

    return (
        <div className="download-page">
            <div className="download-card reveal active">
                <Link href="/" className="logo-link">
                    <img src="/imgs/icon.webp" alt="Hibo" className="download-logo" />
                    <span>Hibo</span>
                </Link>

                {device === 'ios' ? (
                    <div className="content-ios">
                        <h1>Hibo arrive bientôt sur iOS</h1>
                        {!submitted ? (
                            <>
                                <p>Nous finalisons les derniers détails pour vous offrir la meilleure expérience sur iPhone.</p>
                                <p className="highlight-text">Laissez-nous votre email pour être prévenu en premier :</p>
                                <form onSubmit={handleSubmit} className="download-form">
                                    <input 
                                        type="email" 
                                        placeholder="votre@email.com" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                    />
                                    <button type="submit" className="btn btn-primary">Me prévenir</button>
                                </form>
                            </>
                        ) : (
                            <div className="success-msg">
                                <div className="icon-success">✓</div>
                                <p>C'est noté ! On vous envoie un petit mot dès que Hibo est disponible sur l'App Store.</p>
                                <Link href="/" className="btn btn-ghost mt-4">Retour à l'accueil</Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="content-desktop">
                        <h1>Téléchargez Hibo gratuitement</h1>
                        <p>Disponible dès maintenant pour Android. <br />La version iOS arrive très prochainement.</p>
                        
                        <div className="download-badges">
                            <a href="https://play.google.com/store/apps/details?id=com.hugosl.hibo" target="_blank" rel="noopener noreferrer" className="store-badge active">
                                <img src="https://cdn.simpleicons.org/googleplay/ffffff" alt="Google Play" className="store-icon" />
                                <div className="store-text">
                                    <span className="small">Disponible sur</span>
                                    <span className="big">Google Play</span>
                                </div>
                            </a>

                            <div className="store-badge disabled">
                                <img src="https://cdn.simpleicons.org/apple/ffffff" alt="Apple" className="store-icon" />
                                <div className="store-text">
                                    <span className="small">Bientôt disponible</span>
                                    <span className="big">App Store</span>
                                </div>
                            </div>
                        </div>
                        <Link href="/" className="back-link">Continuer sur le site web</Link>
                    </div>
                )}
            </div>

            <style jsx>{`
                .download-page {
                    min-height: 100vh;
                    background: radial-gradient(circle at top left, #FFF9F0, #FFEADD);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.5rem;
                    font-family: 'Inter', sans-serif;
                }
                .download-card {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    border-radius: 40px;
                    padding: 4rem 3rem;
                    max-width: 600px;
                    width: 100%;
                    text-align: center;
                    box-shadow: 0 40px 80px rgba(0,0,0,0.05);
                }
                .logo-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 3rem;
                    text-decoration: none;
                }
                .logo-link span {
                    font-family: 'Nunito', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: #1A1A1A;
                }
                .download-logo { width: 40px; height: 40px; }
                
                h1 { 
                    font-family: 'Nunito', sans-serif;
                    font-size: 2.25rem;
                    font-weight: 800;
                    margin-bottom: 1.5rem;
                    color: #1A1A1A;
                    line-height: 1.2;
                }
                p { color: #555; font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem; }
                .highlight-text { font-weight: 600; color: #1A1A1A; margin-top: 2rem; }

                .download-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }
                input {
                    padding: 1.25rem 1.5rem;
                    border-radius: 20px;
                    border: 1px solid #FFE8D6;
                    background: white;
                    font-size: 1rem;
                    outline: none;
                    transition: border-color 0.3s;
                }
                input:focus { border-color: #FF9F66; }

                .btn {
                    padding: 1.25rem 2rem;
                    border-radius: 999px;
                    font-weight: 700;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: all 0.3s;
                    border: none;
                    text-decoration: none;
                    display: inline-block;
                }
                .btn-primary { background: #FF9F66; color: white; box-shadow: 0 10px 20px rgba(255, 159, 102, 0.2); }
                .btn-primary:hover { background: #FF8A4D; transform: translateY(-2px); }
                .btn-ghost { background: transparent; color: #555; border: 2px solid #FFE8D6; }
                
                .success-msg { padding: 2rem 0; }
                .icon-success {
                    width: 60px;
                    height: 60px;
                    background: #4CAF50;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    margin: 0 auto 1.5rem;
                }

                .download-badges {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    align-items: center;
                    margin: 2.5rem 0;
                }
                .store-badge {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem 2rem;
                    border-radius: 100px;
                    width: 280px;
                    text-decoration: none;
                    transition: all 0.3s;
                }
                .store-badge.active { background: #111; color: white; }
                .store-badge.active:hover { background: #000; transform: translateY(-3px); }
                .store-badge.disabled { background: #EEE; color: #AAA; cursor: not-allowed; opacity: 0.8; }
                
                .store-icon { width: 32px; height: 32px; }
                .store-text { display: flex; flex-direction: column; align-items: flex-start; text-align: left; }
                .store-text .small { font-size: 0.75rem; text-transform: uppercase; opacity: 0.8; }
                .store-text .big { font-size: 1.25rem; font-weight: 600; line-height: 1.1; }

                .back-link { color: #FF9F66; font-weight: 600; text-decoration: none; font-size: 1rem; }
                .back-link:hover { text-decoration: underline; }

                @media (max-width: 600px) {
                    .download-card { padding: 3rem 1.5rem; border-radius: 30px; }
                    h1 { font-size: 1.75rem; }
                    .store-badge { width: 100%; max-width: 300px; }
                }
            `}</style>
        </div>
    );
}
