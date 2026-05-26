import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - AURÉ',
  description: 'Privacy Policy for AURÉ Store',
};

export default function PrivacyPage() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <Link href="/" style={styles.backLink}>← Back to Store</Link>
        <h1 style={styles.title}>Privacy Policy</h1>
        <p style={styles.date}>Last updated: {new Date().getFullYear()}</p>

        <section style={styles.section}>
          <h2 style={styles.heading}>1. Information We Collect</h2>
          <p style={styles.text}>
            When you register on our site, place an order, or subscribe to our newsletter, we collect 
            personal information such as your name, email address, mailing address, and phone number. 
            This information is used solely for processing your orders and improving your shopping experience.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>2. How We Use Your Information</h2>
          <ul style={styles.list}>
            <li>To process and fulfill your orders</li>
            <li>To send order confirmations and updates</li>
            <li>To respond to customer service requests</li>
            <li>To improve our website and product offerings</li>
            <li>To send promotional emails (with your consent)</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>3. Data Protection</h2>
          <p style={styles.text}>
            We implement a variety of security measures to maintain the safety of your personal information 
            when you place an order or enter, submit, or access your personal information. All sensitive 
            payment information is transmitted via Secure Socket Layer (SSL) technology and encrypted 
            into our payment gateway providers database.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>4. Cookies</h2>
          <p style={styles.text}>
            We use cookies to help us remember and process the items in your shopping cart, understand 
            and save your preferences for future visits, and compile aggregate data about site traffic 
            and site interaction so that we can offer better site experiences and tools in the future.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>5. Third-Party Disclosure</h2>
          <p style={styles.text}>
            We do not sell, trade, or otherwise transfer to outside parties your personally identifiable 
            information. This does not include trusted third parties who assist us in operating our website, 
            conducting our business, or servicing you, so long as those parties agree to keep this 
            information confidential.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>6. Your Rights</h2>
          <p style={styles.text}>
            You have the right to access, correct, or delete your personal data at any time. 
            You may also unsubscribe from marketing communications by following the instructions 
            included in each email or by contacting us directly.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>7. Contact Us</h2>
          <p style={styles.text}>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:support@aure.com" style={styles.link}>support@aure.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    background: 'var(--background, #f8fafc)',
    padding: '6rem 2rem 4rem',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    background: '#fff',
    padding: '3rem 2.5rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  },
  backLink: {
    color: '#6366f1',
    textDecoration: 'none',
    fontSize: '0.9rem',
    display: 'inline-block',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: '0.5rem',
  },
  date: {
    color: '#6b7280',
    fontSize: '0.9rem',
    marginBottom: '2rem',
  },
  section: {
    marginBottom: '2rem',
  },
  heading: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#1a1a1a',
    marginBottom: '0.75rem',
  },
  text: {
    fontSize: '0.95rem',
    color: '#4b5563',
    lineHeight: 1.7,
  },
  list: {
    fontSize: '0.95rem',
    color: '#4b5563',
    lineHeight: 1.8,
    paddingLeft: '1.5rem',
  },
  link: {
    color: '#6366f1',
    textDecoration: 'underline',
  },
};