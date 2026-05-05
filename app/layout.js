import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Hibo - Votre compagnon du quotidien",
  description: "Hibo - Votre petit compagnon qui veille sur vous au quotidien avec une présence douce et sécurisante.",
  verification: {
    google: '3eG-kZYm5fnv8_Ef-xv6lkCCFT9MLT1Kyg5hwXcai7Q',
  },
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
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Nunito:wght@600;700;800&display=swap" rel="stylesheet" />
        {/* Preload Video */}
        <link rel="preload" href="/videos/hibo-animation.mp4" as="video" type="video/mp4" />
        <script src="https://unpkg.com/lucide@latest" defer></script>
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <script
          dangerouslySetInnerHTML={{
             __html: `
              function initLucide() {
                if (window.lucide && !window.lucideInitialized) {
                  lucide.createIcons();
                  // Marquer comme initialisé pour éviter les boucles si on utilise un observer
                  // Mais ici on va juste essayer de limiter les appels
                }
              }
              document.addEventListener('DOMContentLoaded', initLucide);
              // On lance aussi après un court délai pour être sûr
              setTimeout(initLucide, 1000);
            `
          }}
        />
      </body>
    </html>
  );
}
