'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ConfirmPage() {
  const router = useRouter();
  const [status, setStatus] = useState('confirming');

  useEffect(() => {
    setTimeout(() => {
      setStatus('confirmed');
      setTimeout(() => router.push('/login'), 3000);
    }, 2000);
  }, []);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#f8fafc',
      padding: '2rem',
    }}>
      <div style={{
        background: '#fff',
        padding: '3rem 2.5rem',
        borderRadius: '12px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>
        {status === 'confirming' ? (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Confirming your email...
            </h1>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              Please wait while we verify your email address.
            </p>
          </>
        ) : (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Email Confirmed!
            </h1>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Your email has been verified. Redirecting to login...
            </p>
            <Link href="/login" style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              background: '#1a1a1a',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 600,
            }}>
              Go to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}