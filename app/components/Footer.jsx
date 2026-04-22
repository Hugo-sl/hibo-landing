import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
        <div className="footer-container">
            <div className="footer-logo">
                <img src="/imgs/icon.webp" alt="Hibo Icon" className="logo-img" />
                <span>Hibo</span>
            </div>
            <div className="footer-links">
                <Link href="/mentions-legales">Mentions légales</Link>
                <Link href="#">Politique de confidentialité</Link>
                <Link href="#">CGU</Link>
                <Link href="#">Contact</Link>
            </div>
            <div className="footer-copyright">
                © 2026 Hibo — Fait avec 💛 pour ceux qui vivent seuls
            </div>
        </div>
    </footer>
  );
}
