'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body style={{
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'system-ui, sans-serif',
        background: '#f5f5f5',
        textAlign: 'center',
        padding: '2rem',
      }}>
        <div>
          <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem', color: '#000' }}>
            500
          </h1>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#666' }}>
            Server Error
          </h2>
          <p style={{ color: '#888', marginBottom: '2rem' }}>
            A critical error has occurred. Please try refreshing the page.
          </p>
          <button
            onClick={reset}
            style={{
              padding: '0.8rem 2rem',
              background: '#000',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            Refresh Page
          </button>
        </div>
      </body>
    </html>
  );
}