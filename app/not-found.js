import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'var(--background, #f5f5f5)',
      textAlign: 'center',
      padding: '2rem',
      fontFamily: 'var(--font-inter), sans-serif',
    }}>
      <h1 style={{
        fontSize: 'clamp(4rem, 10vw, 8rem)',
        fontWeight: 700,
        marginBottom: '0.5rem',
        color: 'var(--on-surface, #000)',
        lineHeight: 1,
      }}>
        404
      </h1>
      <h2 style={{
        fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
        fontWeight: 500,
        marginBottom: '1.5rem',
        color: 'var(--on-surface-variant, #666)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        Page Not Found
      </h2>
      <p style={{
        fontSize: '1rem',
        color: 'var(--on-surface-variant, #888)',
        marginBottom: '2rem',
        maxWidth: '400px',
        lineHeight: 1.6,
      }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          padding: '0.8rem 2rem',
          background: 'var(--on-surface, #000)',
          color: 'var(--surface, #fff)',
          textDecoration: 'none',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontSize: '0.9rem',
          fontWeight: 600,
          transition: 'background 0.2s',
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}