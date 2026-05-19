'use client';

import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/lib/LanguageContext';
import useAuthStore from '@/lib/store/auth-store';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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