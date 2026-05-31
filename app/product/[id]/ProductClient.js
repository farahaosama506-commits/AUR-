'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import useCartStore from '@/lib/store/cartStore';
import useAuthStore from '@/lib/store/auth-store';

export default function ProductClient({ product }) {
  const router = useRouter();
  const { addToCart } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  if (!product) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <h2>Product not found</h2>
          <Link href="/shop" style={{ color: '#6366f1' }}>← Back to Shop</Link>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    addToCart({ ...product, quantity });
    setMessage('Added to cart!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', paddingTop: '100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          <Link href="/shop" style={{ color: '#6366f1', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>← Back to Shop</Link>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '12px', overflow: 'hidden', background: '#f8fafc' }}>
              <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} priority />
            </div>
            
            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#6b7280' }}>{product.category}</span>
              <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0' }}>{product.name}</h1>
              <p style={{ fontSize: '1.8rem', fontWeight: 700 }}>${product.price}</p>
              <p style={{ color: '#6b7280', lineHeight: 1.7, margin: '1rem 0' }}>{product.description}</p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 40, height: 40, background: '#f3f4f6', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>−</button>
                <span style={{ fontWeight: 600, width: 40, textAlign: 'center' }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} style={{ width: 40, height: 40, background: '#f3f4f6', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>+</button>
              </div>
              
              <button onClick={handleAddToCart} style={{ padding: '1rem 2rem', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase', width: '100%' }}>
                Add to Cart
              </button>
              
              {message && <div style={{ background: '#ecfdf5', color: '#059669', padding: '0.75rem', borderRadius: '8px', marginTop: '1rem', textAlign: 'center' }}>{message}</div>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}