'use client';

import Link from 'next/link';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import useCartStore from '@/lib/store/cartStore';
import useAuthStore from '@/lib/store/auth-store';
import styles from './shop.module.css';

const categories = ['All', 'ZARA', 'NIKE', 'DOM HILL'];

export default function ShopClient({ products, error }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartMessage, setCartMessage] = useState('');
  const router = useRouter();
  const { addToCart } = useCartStore();
  const { isLoggedIn } = useAuthStore();

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = useCallback((product) => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    addToCart(product);
    setCartMessage(`${product.name} added to cart!`);
    setTimeout(() => setCartMessage(''), 3000);
  }, [isLoggedIn, router, addToCart]);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>SHOP</h1>
          <p className={styles.description}>Discover our complete range of AURÉ products.</p>
        </div>

        <div className={styles.controls}>
          <select className={styles.filter} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        {error && <p className={styles.error}>Failed to load products</p>}

        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.card}>
              <Link href={`/product/${product.id}`} className={styles.imageContainer}>
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 50vw, 25vw" className={styles.image} loading="lazy" />
              </Link>
              <div className={styles.content}>
                <div className={styles.category}>{product.category}</div>
                <h3 className={styles.name}>
                  <Link href={`/product/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{product.name}</Link>
                </h3>
                <div className={styles.price}>${product.price}</div>
                <button className={styles.addToCart} onClick={() => handleAddToCart(product)}>ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>

        {cartMessage && <div className={styles.cartMessage}>{cartMessage}</div>}
      </main>
      <Footer />
    </div>
  );
}