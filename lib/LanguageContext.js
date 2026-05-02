'use client';

import { createContext, useContext, useState, useCallback, useRef } from 'react';

const LanguageContext = createContext(null);

// ترجمات ثابتة برا الـ component
const translations = {
  en: {
    'hero.title': 'AURÉ',
    'hero.subtitle': 'Discover Your Style',
    'hero.button': 'Explore Collection',
    'nav.shop': 'Shop',
    'nav.explore': 'Explore',
    'nav.archive': 'Archive',
    'footer.support': 'Support',
    'footer.shipping': 'Shipping',
    'footer.warranty': 'Warranty',
    'footer.company': 'Company',
    'footer.contact': 'Contact',
    'footer.ethics': 'Ethics',
    'brand.subtitle': 'Discover our story.',
    'brand.story.title': 'Our Story',
    'brand.values.title': 'Values',
    'brand.values.subtitle': 'What drives us.',
    'brand.values.1.title': 'Quality',
    'brand.values.2.title': 'Innovation',
    'brand.values.3.title': 'Sustainability',
    'contact.title': 'Contact',
    'contact.subtitle': 'Get in touch.',
    'contact.email.title': 'Email',
    'contact.address.title': 'Address',
    'contact.phone.title': 'Phone',
    'contact.form.title': 'Message',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send',
    'contact.form.success': 'Sent!',
    'ethics.title': 'Ethics',
    'ethics.subtitle': 'Our principles.',
    'ethics.1.title': 'Transparency',
    'ethics.2.title': 'Fair Labor',
    'ethics.3.title': 'Repair',
    'ethics.4.title': 'Climate',
    'ethics.5.title': 'Community',
    'ethics.report.title': 'Report'
  }
};

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('en');
  const cache = useRef(new Map());

  // t function cached
  const t = useCallback((key, fallback) => {
    const cacheKey = `${locale}:${key}`;
    
    if (cache.current.has(cacheKey)) {
      return cache.current.get(cacheKey);
    }

    let value = translations[locale]?.[key] || fallback || key;
    cache.current.set(cacheKey, value);
    return value;
  }, [locale]);

  const value = {
    locale,
    setLocale,
    t,
    isLoaded: true
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}