'use client';

import { useTranslation } from '@/lib/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Brand.module.css';

export default function BrandPage() {
  const { t, isLoaded } = useTranslation();

  if (!isLoaded) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backButton}>
        ← BACK
      </Link>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.overline}>EST. 2018</span>
            <h1 className={styles.title}>AURÉ</h1>
            <p className={styles.subtitle}>
              {t('brand.subtitle', 'Redefining fashion with timeless elegance and modern sophistication.')}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <h2 className={styles.heading}>
                {t('brand.story.title', 'Crafted for Elegance')}
              </h2>
              <p className={styles.paragraph}>
                Born from a passion for refined aesthetics, AURÉ emerged to bridge the gap 
                between luxury and accessibility. Every stitch, every fabric, every silhouette 
                is thoughtfully curated to empower individuals through style.
              </p>
              <p className={styles.paragraph}>
                Our atelier draws inspiration from global fashion capitals—Milan, Paris, 
                Tokyo—blending classic tailoring with contemporary trends. We believe 
                that what you wear is an extension of who you are.
              </p>
            </div>
            <div className={styles.storyImage}>
              <Image
                src="/images/brand/logo.jpg"
                alt="AURÉ Atelier - Fashion Design Studio"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>{t('brand.values.title', 'Our Philosophy')}</h2>
            <p>{t('brand.values.subtitle', 'The principles that guide every collection we create.')}</p>
          </div>

          <div className={styles.grid}>
            <div className={styles.card}>
              <span className={styles.cardNumber}>01</span>
              <h3>{t('brand.values.1.title', 'Timeless Design')}</h3>
              <p>
                We create pieces that transcend seasons and trends. Every garment is 
                designed with intention—clean lines, premium fabrics, and impeccable 
                tailoring that stands the test of time.
              </p>
            </div>

            <div className={styles.card}>
              <span className={styles.cardNumber}>02</span>
              <h3>{t('brand.values.2.title', 'Artisanal Quality')}</h3>
              <p>
                Our collections are crafted by skilled artisans who bring decades of 
                expertise. From hand-stitched details to carefully sourced materials, 
                quality is never compromised.
              </p>
            </div>

            <div className={styles.card}>
              <span className={styles.cardNumber}>03</span>
              <h3>{t('brand.values.3.title', 'Conscious Fashion')}</h3>
              <p>
                We are committed to sustainable practices—ethical sourcing, reduced waste, 
                and fair labor. Fashion should look good and do good, without compromise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Global Brands</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>12K+</span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Style Support</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}