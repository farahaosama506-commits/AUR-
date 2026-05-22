'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Page Error:', error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem',
      background: 'var(--background)',
      fontFamily: 'var(--font-inter), sans-serif',
    }}>
      <h1 style={{
        fontSize: 'clamp(3rem, 8vw, 6rem)',
        fontWeight: 700,
        marginBottom: '0.5rem',
        color: 'var(--on-surface, #000)',
        lineHeight: 1,
      }}>
        Oops!
      </h1>
      <h2 style={{
        fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
        fontWeight: 500,
        marginBottom: '1rem',
        color: 'var(--on-surface-variant, #666)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        Something went wrong
      </h2>
      <p style={{
        fontSize: '1rem',
        color: 'var(--on-surface-variant, #888)',
        marginBottom: '2rem',
        maxWidth: '400px',
        lineHeight: 1.6,
      }}>
        An unexpected error has occurred. Please try again.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={reset}
          style={{
            padding: '0.8rem 2rem',
            background: 'var(--on-surface, #000)',
            color: 'var(--surface, #fff)',
            border: 'none',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          Try Again
        </button>
        <Link
          href="/"
          style={{
            padding: '0.8rem 2rem',
            background: 'transparent',
            color: 'var(--on-surface, #000)',
            border: '1px solid var(--on-surface, #000)',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          Home
        </Link>
      </div>
    </div>
  );
}