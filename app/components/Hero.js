'use client';

import { useLanguage } from '@/lib/LanguageContext';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section 
      className={styles.hero}
      style={{
        backgroundImage: 'url(/images/shop/hero-im.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>{t('hero.title')}</h1>
          <p className={styles.subtitle}>{t('hero.subtitle')}</p>
          <div className={styles.ctaContainer}>
            <Link href="/shop" className={styles.cta}>
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}