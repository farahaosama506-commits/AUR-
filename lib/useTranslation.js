'use client';

import { useState, useEffect, useCallback } from 'react';

// ترجمات ثابتة خارج الـ component عشان ما تنعاد كل مرة
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
    'brand.subtitle': 'Technical alpine protection engineered at elevation.',
    'brand.story.title': 'Born in the Alpine',
    'brand.values.title': 'Our Values',
    'brand.values.subtitle': 'What drives every stitch, seam, and decision.',
    'brand.values.1.title': 'Technical Integrity',
    'brand.values.2.title': 'Athlete-Driven Design',
    'brand.values.3.title': 'Alpine Durability',
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Response within 24 hours.',
    'contact.email.title': 'Email',
    'contact.address.title': 'Workshop',
    'contact.phone.title': 'Phone',
    'contact.form.title': 'Send a Message',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.form.success': 'Message received.',
    'ethics.title': 'Built on Principle',
    'ethics.subtitle': 'Technical performance with ethical responsibility.',
    'ethics.1.title': 'Material Transparency',
    'ethics.2.title': 'Fair Labor Commitment',
    'ethics.3.title': 'Repair, Not Replace',
    'ethics.4.title': 'Carbon Accountability',
    'ethics.5.title': 'Community Investment',
    'ethics.report.title': 'Annual Ethics Report'
  }
};

// قيمة افتراضية عشان ما نرجع null
const defaultLocale = 'en';

export function useTranslation() {
  // نبدأ بـ true عشان ما نعلق الصفحة
  const [isLoaded, setIsLoaded] = useState(true);
  const [locale, setLocale] = useState(defaultLocale);

  useEffect(() => {
    // لو بدك تضيف لغة من localStorage لاحقاً
    const savedLocale = localStorage?.getItem('locale');
    if (savedLocale && translations[savedLocale]) {
      setLocale(savedLocale);
    }
  }, []);

  const t = useCallback((key, fallback) => {
    // أولاً: جرب الترجمة
    if (translations[locale]?.[key]) {
      return translations[locale][key];
    }
    // ثانياً: استخدم fallback إذا موجود
    if (fallback) {
      return fallback;
    }
    // ثالثاً: رجع المفتاح نفسه (ما بيرجع undefined أبداً)
    return key;
  }, [locale]);

  return { t, isLoaded, locale };
}