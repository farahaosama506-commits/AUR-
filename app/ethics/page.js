'use client';


import { useTranslation } from '@/lib/useTranslation';
import { useRouter } from 'next/navigation';
import styles from './Ethics.module.css';

export default function EthicsPage() {
  const { t, isLoaded } = useTranslation();
  const router = useRouter();

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
      title: t( 'Material Transparency'),
      description:
        'Full disclosure on our supply chain. Every material, from face fabrics to zippers, is traceable to its source. We publish an annual materials report with third-party verification.',
    },
    {
      number: '02',
      title: t('Fair Labor Commitment'),
      description:
        'Every Nivis product is produced in facilities that meet or exceed SA8000 certification standards. Regular unannounced audits ensure compliance with wage, safety, and working-hour requirements.',
    },
    {
      number: '03',
      title: t('Repair, Not Replace'),
      description:
        'We design for serviceability. Our repair program keeps gear in the field and out of landfills. All products include a lifetime repair guarantee against manufacturing defects.',
    },
    {
      number: '04',
      title: t('Carbon Accountability'),
      description:
        'We measure and offset our entire operational footprint, including Scope 3 emissions from material production to end-of-life product disposal. Our goal: carbon-positive by 2028.',
    },
    {
      number: '05',
      title: t('Community Investment'),
      description:
        '1% of every sale goes directly to organizations protecting alpine environments and supporting mountain communities hardest hit by climate change.',
    },
  ];

  return (
    <main className={styles.main}>
         <button onClick={() => router.back()} className={styles.backButton}>
        ← BACK
      </button>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.overline}>OUR ETHICS</span>
            <h1 className={styles.title}>
              {t( 'Built on Principle')}
            </h1>
            <p className={styles.subtitle}>
              {t(
                'ethics.subtitle',
                'Technical performance cannot come at the expense of ethical responsibility. Our commitment to transparency, sustainability, and fair labor is as rigorous as our engineering standards.'
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
              {t('Annual Ethics Report')}
            </h2>
            <p className={styles.reportText}>
              Full transparency on our progress, setbacks, and goals.
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