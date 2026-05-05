import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Hibo - Votre compagnon du quotidien",
  description: "Hibo - Votre petit compagnon qui veille sur vous au quotidien avec une présence douce et sécurisante.",
  verification: {
    google: '3eG-kZYm5fnv8_Ef-xv6lkCCFT9MLT1Kyg5hwXcai7Q',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "Hibo - Votre compagnon du quotidien",
    description: "Un petit geste chaque jour, une grande tranquillité pour vous et vos proches.",
    url: 'https://hibo.app',
    siteName: 'Hibo',
    images: [
      {
        url: '/imgs/banniere-Hibo---Copie.webp',
        width: 1200,
        height: 630,
        alt: 'Hibo — Le compagnon discret pour votre sécurité',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hibo - Votre compagnon du quotidien",
    description: "Un petit geste chaque jour, une grande tranquillité pour vous et vos proches.",
    images: ['/imgs/banniere-Hibo---Copie.webp'],
  },
};

export const viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
        <Footer />
        
        {/* Scripts globaux */}
        <script src="https://unpkg.com/lucide@latest" defer></script>
        <script
          dangerouslySetInnerHTML={{
             __html: `
              function initLucide() {
                if (window.lucide && !window.lucideInitialized) {
                  lucide.createIcons();
                }
              }
              document.addEventListener('DOMContentLoaded', initLucide);
              setTimeout(initLucide, 1000);
            `
          }}
        />
      </body>
    </html>
  );
}
