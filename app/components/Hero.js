'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/useTranslation';
import styles from './Hero.module.css';

export default function Hero() {
  const { t, isLoaded } = useTranslation();

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isLoaded) {
    return null;
  }

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
          <h1 className={styles.title}>{t("WELCOME")}</h1>
          <p className={styles.subtitle}>Engineered for alpine expeditions</p>
          <div className={styles.ctaContainer}>
            <Link href="/shop" className={styles.cta}>
              SHOP NOW
            </Link>
            <button className={styles.secondaryCta} onClick={scrollToProducts}>
              {t("explore")}
            </button>
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <span>SCROLL TO EXPLORE</span>
          <div className={styles.arrow}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
