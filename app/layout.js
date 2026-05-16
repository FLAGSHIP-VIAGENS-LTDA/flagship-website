import './globals.css';

export const metadata = {
  title: 'Flagship Viagens — Roteiros sob medida e Private 360',
  description:
    'Agência de viagens boutique. Roteiros sob medida para destinos como Maldivas, Bali, Santorini e Bora Bora. Conheça também o Private 360 — gestão de milhas e concierge para clientes private.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
