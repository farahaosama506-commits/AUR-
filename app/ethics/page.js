'use client';

import { useTranslation } from '@/lib/useTranslation';
import Link from 'next/link';
import styles from './Ethics.module.css';

export default function EthicsPage() {
  const { t, isLoaded } = useTranslation();

  if (!isLoaded) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  const principles = [
    {
      number: '01',
      title: t('ethics.1.title', 'Material Transparency'),
      description:
        'We believe in full transparency across our supply chain. Every fabric, every button, every zipper is traceable to its origin. We partner exclusively with suppliers who meet our rigorous ethical standards and share our vision for a cleaner fashion industry.',
    },
    {
      number: '02',
      title: t('ethics.2.title', 'Fair Labor Commitment'),
      description:
        'Every AURÉ garment is produced in facilities that guarantee fair wages, safe working conditions, and reasonable hours. We conduct regular unannounced audits and maintain long-term partnerships with ateliers that treat their artisans with dignity and respect.',
    },
    {
      number: '03',
      title: t('ethics.3.title', 'Sustainable Sourcing'),
      description:
        'We prioritize eco-friendly materials—organic cotton, recycled polyester, and responsibly sourced wool. Our design philosophy embraces quality over quantity, creating pieces that last for years, not just seasons, reducing fashion waste significantly.',
    },
    {
      number: '04',
      title: t('ethics.4.title', 'Carbon Accountability'),
      description:
        'We measure and offset our entire carbon footprint, from raw material production to delivery at your doorstep. Our ambitious goal is to become carbon-neutral by 2026 and carbon-positive by 2028 through innovative logistics and green partnerships.',
    },
    {
      number: '05',
      title: t('ethics.5.title', 'Community Investment'),
      description:
        '2% of every purchase goes directly to initiatives supporting emerging designers, fashion education programs, and organizations providing professional attire to underserved communities. Style should empower everyone.',
    },
  ];

  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backButton}>
        ← BACK
      </Link>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.overline}>OUR ETHICS</span>
            <h1 className={styles.title}>
              {t('ethics.title', 'Fashion with Integrity')}
            </h1>
            <p className={styles.subtitle}>
              {t(
                'ethics.subtitle',
                'Style should never come at the cost of ethics. Our commitment to transparency, sustainability, and fair labor is woven into every garment we create.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.principlesGrid}>
            {principles.map((principle) => (
              <div key={principle.number} className={styles.card}>
                <span className={styles.cardNumber}>{principle.number}</span>
                <h3 className={styles.cardTitle}>{principle.title}</h3>
                <p className={styles.cardDescription}>{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Banner */}
      <section className={styles.reportBanner}>
        <div className={styles.container}>
          <div className={styles.reportContent}>
            <h2 className={styles.reportTitle}>
              {t('ethics.report.title', 'Annual Ethics Report')}
            </h2>
            <p className={styles.reportText}>
              Full transparency on our progress, challenges, and commitments for the year ahead.
            </p>
            <button className={styles.reportButton}>
              DOWNLOAD REPORT (PDF)
              <span className={styles.arrow}>↓</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}