'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '@/lib/useTranslation';
import { useLanguage } from '@/lib/LanguageContext';
import styles from './Header.module.css';

export default function Header() {
  const [isTransparent, setIsTransparent] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const { t, isLoaded } = useTranslation();
  const { toggleLanguage, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsTransparent(window.scrollY < 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchToggle = () => {
    setShowSearchInput(!showSearchInput);
    if (showSearchInput) {
      setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearchInput(false);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    } else if (e.key === 'Escape') {
      setShowSearchInput(false);
      setSearchQuery('');
    }
  };

  const navItems = [
    { href: '/shop', label: 'nav.shop' },
    { href: '/explore', label: 'nav.explore' },
    { href: '/tech', label: 'nav.tech' },
    { href: '/archive', label: 'nav.archive' }
  ];

  if (!isLoaded) {
    return null;
  }

  return (
    <header className={`${styles.header} ${isTransparent ? styles.transparent : styles.opaque}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <h2>AURÉ</h2>
        </Link>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>
        <div className={styles.actions}>
          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            {showSearchInput && (
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                autoFocus
              />
            )}
            <button
              type="button"
              className={styles.search}
              onClick={handleSearchToggle}
              title="Search"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <circle cx="8" cy="8" r="6" />
                <path d="M12 12L18 18" />
              </svg>
            </button>
            {showSearchInput && (
              <button
                type="submit"
                className={styles.searchSubmit}
                title="Search"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </button>
            )}
          </form>
          <button className={styles.account}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <circle cx="10" cy="7" r="3" />
              <path d="M2 17c0-2 3-4 8-4s8 2 8 4" />
            </svg>
          </button>
          <button 
            className={styles.languageToggle} 
            onClick={toggleLanguage}
            title="Switch language"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </div>
    </header>
  );
}
