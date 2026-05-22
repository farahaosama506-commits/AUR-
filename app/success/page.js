'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import useCartStore from '@/lib/store/cartStore';

export default function SuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>✅ Payment Successful!</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Thank you for your purchase. Your order has been received.
      </p>
      <Link href="/shop" style={{
        padding: '0.8rem 2rem',
        background: '#000',
        color: '#fff',
        textDecoration: 'none',
        textTransform: 'uppercase',
      }}>
        Continue Shopping
      </Link>
    </div>
  );
}