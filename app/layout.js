import { Inter } from 'next/font/google';
import Script from 'next/script';
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        
        {/* ✅ تأجيل السكربتات الخارجية */}
        <Script 
          src="https://js.stripe.com/v3/" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}