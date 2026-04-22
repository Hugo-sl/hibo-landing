import "./globals.css";

export const metadata = {
  title: "Hibo - Votre compagnon du quotidien",
  description: "Hibo - Votre petit compagnon qui veille sur vous au quotidien avec une présence douce et sécurisante.",
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
        {children}
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
