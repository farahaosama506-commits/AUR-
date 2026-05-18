import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/lib/LanguageContext';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

// metadata بدون viewport
export const metadata = {
  title: 'AURÉ - Fashion Store',
  description: 'Discover your style with AURÉ',
};

// viewport منفصل
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}