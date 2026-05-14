// app/login/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/lib/store/auth-store';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const success = await login(formData.username, formData.password);
    
    if (success) {
      router.push('/');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>LOGIN</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                clearError();
              }}
              placeholder="Enter username"
              required
            />
          </div>
          
          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                clearError();
              }}
              placeholder="Enter password"
              required
            />
          </div>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <button 
            type="submit" 
            className={styles.submit}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>
        
        <Link href="/" className={styles.back}>
          ← Back to Store
        </Link>
      </div>
    </div>
  );
}