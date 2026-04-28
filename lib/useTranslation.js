'use client';

import { useLanguage } from './LanguageContext';
import { useEffect, useState } from 'react';

export function useTranslation() {
  const { language, isLoaded } = useLanguage();
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${language}.json`);
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    };

    if (isLoaded) {
      loadTranslations();
    }
  }, [language, isLoaded]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations;

    for (const k of keys) {
      if (value[k]) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return value;
  };

  return { t, language, isLoaded };
}
