'use client';

import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>PAGE NOT FOUND</h2>
          <p className={styles.description}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className={styles.actions}>
            <Link href="/" className={styles.primaryButton}>
              GO HOME
            </Link>
            <Link href="/shop" className={styles.secondaryButton}>
              SHOP NOW
            </Link>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.mountain}>
            <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 300L100 150L200 250L300 100L400 200L400 300H0Z" fill="url(#gradient)" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: 'var(--primary)', stopOpacity: 0.3}} />
                  <stop offset="100%" style={{stopColor: 'var(--primary-container)', stopOpacity: 0.1}} />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}