import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - AURÉ',
  description: 'Terms of Service for AURÉ Store',
};

export default function TermsPage() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <Link href="/" style={styles.backLink}>← Back to Store</Link>
        <h1 style={styles.title}>Terms of Service</h1>
        <p style={styles.date}>Last updated: {new Date().getFullYear()}</p>

        <section style={styles.section}>
          <h2 style={styles.heading}>1. Acceptance of Terms</h2>
          <p style={styles.text}>
            By accessing and using the AURÉ website, you accept and agree to be bound by the terms 
            and provision of this agreement. If you do not agree to abide by the above, please do 
            not use this website.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>2. Products and Pricing</h2>
          <p style={styles.text}>
            All products listed on our website are subject to availability. We reserve the right to 
            modify prices, discontinue products, or update product information at any time without 
            prior notice. Prices are listed in USD and do not include applicable taxes or shipping costs.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>3. Orders and Payment</h2>
          <ul style={styles.list}>
            <li>All orders are subject to acceptance and availability</li>
            <li>Payment must be made in full at the time of ordering</li>
            <li>We accept major credit cards through our secure payment processor</li>
            <li>Order confirmation will be sent via email upon successful payment</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>4. Shipping and Delivery</h2>
          <p style={styles.text}>
            We process orders within 1-3 business days. Delivery times vary based on location. 
            Shipping costs are calculated at checkout. We are not responsible for delays caused 
            by customs or shipping carriers.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>5. Returns and Refunds</h2>
          <p style={styles.text}>
            You may return unworn, unwashed items within 14 days of delivery for a full refund. 
            Return shipping costs are the responsibility of the customer unless the item is defective. 
            Refunds will be processed within 5-10 business days after we receive the returned item.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>6. Intellectual Property</h2>
          <p style={styles.text}>
            All content on this website, including text, graphics, logos, images, and software, 
            is the property of AURÉ and is protected by international copyright laws. You may not 
            reproduce, distribute, or use any content without our prior written consent.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>7. Limitation of Liability</h2>
          <p style={styles.text}>
            AURÉ shall not be liable for any indirect, incidental, special, consequential, or 
            punitive damages resulting from your use of or inability to use the website or products 
            purchased through the website.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>8. Governing Law</h2>
          <p style={styles.text}>
            These terms shall be governed by and construed in accordance with the laws of the 
            jurisdiction in which AURÉ operates, without regard to its conflict of law provisions.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>9. Contact Information</h2>
          <p style={styles.text}>
            For questions about these Terms of Service, please contact us at{' '}
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