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
        <link rel="preload" href="/videos/Hibo%20animation.mp4" as="video" type="video/mp4" />
      </head>
      <body>{children}</body>
    </html>
  );
}
