'use client';

import { useTranslation } from '@/lib/useTranslation';
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
              {t( 'Technical alpine protection engineered at elevation.')}
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
                {t( 'Born in the Alpine')}
              </h2>
              <p className={styles.paragraph}>
                Our journey began above the treeline, where conventional gear failed and 
                the margin between success and failure is measured in millimeters. We 
                set out to create equipment that mountain professionals could trust with 
                their lives—no compromises, no marketing fluff.
              </p>
              <p className={styles.paragraph}>
                Every Nivis product is conceived, tested, and refined at our 
                headquarters in Seattle, with field testing conducted from the North 
                Cascades to the Alaska Range.
              </p>
            </div>
            <div className={styles.storyImage}>
              <div className={styles.imagePlaceholder}>
                <span>MOUNTAIN PROFILE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>{t( 'Our Values')}</h2>
            <p>{t('What drives every stitch, seam, and decision.')}</p>
          </div>

          <div className={styles.grid}>
            <div className={styles.card}>
              <span className={styles.cardNumber}>01</span>
              <h3>{t(
                 'Technical Integrity')}</h3>
              <p>
                We engineer from first principles. Every product must solve a real 
                problem for mountain professionals. No feature exists without purpose.
              </p>
            </div>

            <div className={styles.card}>
              <span className={styles.cardNumber}>02</span>
              <h3>{t('Athlete-Driven Design')}</h3>
              <p>
                Our products are co-developed with IFMGA guides, ski patrollers, and 
                SAR teams who depend on their gear in consequential terrain.
              </p>
            </div>

            <div className={styles.card}>
              <span className={styles.cardNumber}>03</span>
              <h3>{t('Alpine Durability')}</h3>
              <p>
                We build for the long haul. Our gear is designed to be repaired, not 
                replaced. Extended lifecycles reduce waste and build lasting trust.
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
              <span className={styles.statNumber}>12,400m</span>
              <span className={styles.statLabel}>Highest Field Test</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>47°N</span>
              <span className={styles.statLabel}>Design Latitude</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>1,200+</span>
              <span className={styles.statLabel}>Athlete Partnerships</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}