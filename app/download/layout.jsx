export const metadata = {
  title: "Télécharger Hibo — Disponible sur iOS et Android",
  description: "Téléchargez l'application Hibo gratuitement sur l'App Store et Google Play. Votre petit compagnon qui veille sur vous au quotidien.",
  alternates: {
    canonical: 'https://hibo.app/download',
  },
  openGraph: {
    title: "Télécharger Hibo — Disponible sur iOS et Android",
    description: "Téléchargez l'application Hibo gratuitement sur l'App Store et Google Play.",
    url: 'https://hibo.app/download',
    siteName: 'Hibo',
    images: [
      {
        url: '/imgs/banniere-Hibo---Copie.webp',
        width: 1200,
        height: 630,
        alt: 'Télécharger Hibo',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Télécharger Hibo — Disponible sur iOS et Android",
    description: "Téléchargez l'application Hibo gratuitement sur l'App Store et Google Play.",
    images: ['/imgs/banniere-Hibo---Copie.webp'],
  },
};

export default function DownloadLayout({ children }) {
  return children;
}
