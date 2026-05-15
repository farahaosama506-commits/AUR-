import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/lib/LanguageContext';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata = {
  title: 'AURÉ - Fashion Store',
  description: 'Discover your style with AURÉ',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
      </head>
      <body>
        <LanguageProvider>
          <div id="root">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}