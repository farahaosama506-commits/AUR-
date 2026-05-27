'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '@/lib/useTranslation';
import styles from './Header.module.css';
import useCartStore from '@/lib/store/cartStore';
import useAuthStore from '@/lib/store/auth-store';

export default function Header() {
  const [isTransparent, setIsTransparent] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t, isLoaded } = useTranslation();
  const { getItemCount } = useCartStore();
  const { isLoggedIn, user, logout } = useAuthStore();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsTransparent(window.scrollY < 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchToggle = useCallback(() => {
    setShowSearchInput(prev => !prev);
    if (showSearchInput) setSearchQuery('');
  }, [showSearchInput]);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearchInput(false);
    }
  }, [searchQuery, router]);

  const handleSearchKeyDown = useCallback((e) => {
    if (e.key === 'Enter') handleSearchSubmit(e);
    else if (e.key === 'Escape') {
      setShowSearchInput(false);
      setSearchQuery('');
    }
  }, [handleSearchSubmit]);

  const handleLogout = () => setShowLogoutConfirm(true);

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    setShowUserMenu(false);
    router.push('/');
  };

  const cancelLogout = () => setShowLogoutConfirm(false);

   const handleMobileNav = (href) => {
    setMobileMenuOpen(false);
    setTimeout(() => router.push(href), 100);
  };

  const itemCount = getItemCount();

  if (!isLoaded) return null;

  return (
    <>
      <header className={`${styles.header} ${isTransparent ? styles.transparent : styles.opaque}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <h2>AURÉ</h2>
          </Link>

          <nav className={styles.nav}>
            <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>HOME</Link>
            <Link href="/shop" className={`${styles.navLink} ${pathname === '/shop' ? styles.active : ''}`}>SHOP</Link>
            <Link href="/explore" className={`${styles.navLink} ${pathname === '/explore' ? styles.active : ''}`}>EXPLORE</Link>
            <Link href="/archive" className={`${styles.navLink} ${pathname === '/archive' ? styles.active : ''}`}>ARCHIVE</Link>
          </nav>

          <div className={styles.actions}>
            {/* Search */}
            <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
              {showSearchInput && (
                <input type="text" className={styles.searchInput} placeholder="Search..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleSearchKeyDown} autoFocus />
              )}
              <button type="button" className={styles.search} onClick={handleSearchToggle} title="Search">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <circle cx="8" cy="8" r="6" /><path d="M12 12L18 18" />
                </svg>
              </button>
            </form>

            {/* Cart */}
            {isLoggedIn && (
              <Link href="/cart" className={styles.cartIcon} title="Cart">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path d="M3 1H1v2h2l1.6 8.4a2 2 0 002 1.6h8.8a2 2 0 002-1.6L19 5H5" />
                  <circle cx="7" cy="17" r="1.5" fill="currentColor" /><circle cx="15" cy="17" r="1.5" fill="currentColor" />
                </svg>
                {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
              </Link>
            )}

            {/* User Menu */}
            {isLoggedIn ? (
              <div className={styles.userMenuContainer} ref={userMenuRef}>
                <button className={styles.userButton} onClick={() => setShowUserMenu(!showUserMenu)} title="Account">
                  <div className={styles.userAvatar}>
                    <span>{user?.username?.charAt(0)?.toUpperCase() || 'U'}</span>
                  </div>
                </button>
                {showUserMenu && (
                  <div className={styles.userDropdown}>
                    <div className={styles.userInfo}>
                      <div className={styles.userAvatarLarge}>
                        <span>{user?.username?.charAt(0)?.toUpperCase() || 'U'}</span>
                      </div>
                      <div className={styles.userDetails}>
                        <p className={styles.userName}>{user?.username || 'User'}</p>
                        <p className={styles.userEmail}>{user?.email || 'user@example.com'}</p>
                      </div>
                    </div>
                    <Link href="/my-orders" className={styles.dropdownLink} onClick={() => setShowUserMenu(false)}>📋 My Orders</Link>
                    <div className={styles.dropdownDivider} />
                    <button className={styles.logoutButton} onClick={handleLogout}>Sign Out</button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className={styles.loginButton} title="Login">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <circle cx="10" cy="7" r="3" /><path d="M2 17c0-2 3-4 8-4s8 2 8 4" />
                </svg>
              </Link>
            )}

            {/* Hamburger */}
            <button className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
        {/* Mobile Menu */}
{mobileMenuOpen && (
  <div className={styles.mobileMenu}>
    <nav className={styles.mobileNav}>
      <button className={styles.mobileNavLink} onClick={() => handleMobileNav('/')}>HOME</button>
      <button className={styles.mobileNavLink} onClick={() => handleMobileNav('/shop')}>SHOP</button>
      <button className={styles.mobileNavLink} onClick={() => handleMobileNav('/explore')}>EXPLORE</button>
      <button className={styles.mobileNavLink} onClick={() => handleMobileNav('/archive')}>ARCHIVE</button>
      
      <div className={styles.mobileDivider} />
      
      {isLoggedIn ? (
        <>
          <button className={styles.mobileNavLink} onClick={() => handleMobileNav('/my-orders')}>📋 My Orders</button>
          <button className={styles.mobileNavLink} onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>Sign Out</button>
        </>
      ) : (
        <button className={styles.mobileNavLink} onClick={() => handleMobileNav('/login')}>Login</button>
      )}
    </nav>
  </div>
)}

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className={styles.modalOverlay} onClick={cancelLogout}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Sign Out</h3>
            <p className={styles.modalText}>Are you sure you want to sign out?</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={cancelLogout}>Cancel</button>
              <button className={styles.confirmBtn} onClick={confirmLogout}>Sign Out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}