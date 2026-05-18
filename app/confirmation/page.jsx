'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');

    let title = "Lien invalide ou expiré";
    let message = "Ce lien de confirmation n'est plus valable. Demandez à la personne de vous renvoyer une invitation depuis l'application Hibo.";

    if (status === 'success') {
        title = "Confirmation enregistrée 💛";
        message = "Merci ! Vous êtes bien enregistré comme contact d'urgence. Cette personne peut compter sur vous.";
    } else if (status === 'already_confirmed') {
        title = "Déjà confirmé";
        message = "Vous aviez déjà validé cette invitation. Tout est en ordre !";
    } else if (status === 'opt_out') {
        title = "Retrait enregistré";
        message = "Vous avez déjà demandé à ne plus être contact d'urgence pour cette personne.";
    } else if (status === 'opt_out_success') {
        title = "Retrait confirmé";
        message = "Vous avez bien été retiré de la liste des contacts d'urgence. Vous ne recevrez plus d'e-mails de notre part pour cet utilisateur.";
    } else if (status === 'opt_out_already') {
        title = "Retrait déjà enregistré";
        message = "Vous aviez déjà demandé à être retiré de cette liste. Votre demande est bien prise en compte.";
    }

    return (
        <div className="content-desktop">
            <h1>{title}</h1>
            <p>{message}</p>
            <div className="download-badges" style={{marginTop: '2.5rem'}}>
                <Link href="/download" className="btn btn-primary" style={{width: '100%', maxWidth: '300px'}}>
                    Télécharger Hibo
                </Link>
            </div>
        </div>
    );
}

export default function ConfirmationPage() {
    return (
        <div className="download-page">
            <div className="download-card reveal active">
                <Link href="/" className="logo-link">
                    <img src="/favicon/favicon.svg" alt="Hibo" className="download-logo" />
                </Link>

                <Suspense fallback={<div className="loader-container"><div className="loader"></div></div>}>
                    <ConfirmationContent />
                </Suspense>
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
                    margin-bottom: 2.5rem;
                    text-decoration: none;
                }
                .download-logo { width: 80px; height: 80px; }
                
                h1 { 
                    font-family: 'Nunito', sans-serif;
                    font-size: 2.25rem;
                    font-weight: 800;
                    margin-bottom: 2.5rem;
                    color: #1A1A1A;
                    line-height: 1.2;
                }
                p { color: #555; font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem; }
                
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
                
                .loader-container { padding: 2rem 0; }
                .loader {
                    width: 40px;
                    height: 40px;
                    border: 3px solid #FF9F66;
                    border-bottom-color: transparent;
                    border-radius: 50%;
                    display: inline-block;
                    box-sizing: border-box;
                    animation: rotation 1s linear infinite;
                    margin: 0 auto;
                }
                @keyframes rotation {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @media (max-width: 600px) {
                    .download-card { padding: 3rem 1.5rem; border-radius: 30px; }
                    h1 { font-size: 1.75rem; }
                }
            `}</style>
        </div>
    );
}
