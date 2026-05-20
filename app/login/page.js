'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuthStore from '@/lib/store/auth-store';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError, isLoggedIn } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) {
      router.push('/');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) clearError();
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>← BACK</Link>
        
        <h1 className={styles.title}>LOGIN</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>
          
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>
        
        {/* Forgot Password Link */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a 
            href="/forgot-password"
            style={{ 
              color: '#666', 
              fontSize: '14px', 
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            Forgot your password?
          </a>
        </div>
        
        <p className={styles.switch}>
          Don't have an account?{' '}
          <Link href="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}