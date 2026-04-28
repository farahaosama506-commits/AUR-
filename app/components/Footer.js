'use client';

import { useTranslation } from '@/lib/useTranslation';
import styles from './Footer.module.css';

export default function Footer() {
  const { t, isLoaded } = useTranslation();

  if (!isLoaded) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h4>NIVIS GEAR</h4>
          <p>Technical alpine protection engineered at elevation.</p>
          <div className={styles.social}>
            <button>@</button>
            <button>→</button>
          </div>
        </div>

        <div className={styles.column}>
          <h4>{t('footer.support')}</h4>
          <ul>
            <li><a href="#shipping">{t('footer.shipping')}</a></li>
            <li><a href="#warranty">{t('footer.warranty')}</a></li>
            <li><a href="#care">CARE INSTRUCTIONS</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>{t('footer.company')}</h4>
          <ul>
            <li><a href="/brand">BRAND</a></li>
            <li><a href="/contact">{t('footer.contact')}</a></li>
            <li><a href="/ethics">{t('footer.ethics')}</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>COORDINATES</h4>
          <p>47.686°N, 162.275°W<br/>SEATTLE, WA / USA</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; 2026 AURÉ / All Rights Reserved</p>
      </div>
    </footer>
  );
}
