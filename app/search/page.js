// app/search/page.js
import { Suspense } from 'react';
import SearchResults from './SearchResults';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './search.module.css';

export default function SearchPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={
          <div className={styles.header}>
            <div className={styles.titleSection}>
              <h1>SEARCH RESULTS</h1>
              <p>Loading...</p>
            </div>
          </div>
        }>
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}