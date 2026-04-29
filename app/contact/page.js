'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/useTranslation';
import Link from 'next/link';
import styles from './Contact.module.css';

export default function ContactPage() {
  const { t, isLoaded } = useTranslation();
  const [formState, setFormState] = useState({ submitted: false, error: null });

  if (!isLoaded) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ submitted: true, error: null });
  };

  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backButton}>
        ← BACK
      </Link>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.overline}>DIRECT LINE</span>
            <h1 className={styles.title}>{t('contact us', 'Contact Us')}</h1>
            <p className={styles.subtitle}>
              {t( 'Response within 24 hours from our Seattle workshop.')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            {/* Contact Info Cards */}
            <div className={styles.infoSide}>
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>✉</span>
                <h3 className={styles.infoTitle}>
                  {t( 'Email')}
                </h3>
                <p className={styles.infoText}>
                  support@aur.com<br />
                  wholesale@aur.com
                </p>
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>⌂</span>
                <h3 className={styles.infoTitle}>
                  {t('Workshop')}
                </h3>
                <p className={styles.infoText}>
                  Hama Street<br />
                  Salamiah<br />
                  Syria
                </p>
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>☏</span>
                <h3 className={styles.infoTitle}>
                  {t('Phone')}
                </h3>
                <p className={styles.infoText}>
                 +963 939197057<br />
                  Mon–Fri / 08:00–18:00 PST
                </p>
              </div>
            </div>

            {/* Form Side */}
            <div className={styles.formSide}>
              <h2 className={styles.formTitle}>
                {t( 'Send a Message')}
              </h2>

              {formState.submitted && !formState.error ? (
                <div className={styles.successMessage}>
                  <p>{t('Message received. We will respond within 24 hours.')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="name">
                        {t( 'Name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="email">
                        {t( 'Email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        className={styles.input}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="subject">
                      {t('Subject')}
                    </label>
                    <select id="subject" className={styles.select}>
                      <option value="general">General Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="warranty">Warranty Claim</option>
                      <option value="wholesale">Wholesale</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="message">
                      {t('Message')}
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className={styles.textarea}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    {t( 'Send Message')}
                    <span className={styles.arrow}>→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}