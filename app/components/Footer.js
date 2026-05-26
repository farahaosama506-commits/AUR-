'use client';

import { useTranslation } from '@/lib/useTranslation';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const { t, isLoaded } = useTranslation();

  if (!isLoaded) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h4>AURÉ</h4>
          <p>Shop quickly with the most beautiful international brands.</p>
          <div className={styles.social}>
            <a href="#" aria-label="Instagram">@</a>
            <a href="#" aria-label="Twitter">→</a>
          </div>
        </div>

        <div className={styles.column}>
          <h4>{t('support')}</h4>
          <ul>
           <li><Link href="/privacy">Privacy Policy</Link></li>
          <li><Link href="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>{t('company')}</h4>
          <ul>
            <li><Link href="/brand">BRAND</Link></li>
            <li><Link href="/contact">{t('contact')}</Link></li>
            <li><Link href="/ethics">{t('ethics')}</Link></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>COORDINATES</h4>
          <p>47.686°N, 162.275°W<br />SALAMIAH, WA / SY</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; 2026 AURÉ / All Rights Reserved</p>
      </div>
    </footer>
  );
}