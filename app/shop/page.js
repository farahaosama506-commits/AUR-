'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useCartStore from '@/lib/store/cartStore';
import useAuthStore from '@/lib/store/auth-store';
import styles from './shop.module.css';

const products = [
  {
    id: 1,
    name: 'AURÉ PRO',
    category: 'ZARA',
    price: 70,
    image: '/images/shop/p1.jpg',
    description: 'Zara black t-shirt.'
  },
  {
    id: 2,
    name: 'AURÉ PRO',
    category: 'ZARA',
    price: 110,
    image: '/images/shop/p2.jpg',
    description: 'Complete outfit for simple outings.'
  },
  {
    id: 3,
    name: 'AURÉ X',
    category: 'NIKE',
    price: 90,
    image: '/images/shop/p3.jpg',
    description: 'The shoe walks for you.'
  },
  {
    id: 4,
    name: 'AURÉ MINI',
    category: 'NIKE',
    price: 70,
    image: '/images/shop/p4.jpg',
    description: 'Compact exploration kit.'
  },
  {
    id: 5,
    name: 'AURÉ ELITE',
    category: 'DOM HILL',
    price: 140,
    image: '/images/shop/p6.jpg',
    description: 'Elite expedition gear for professional explorers.'
  },
  {
    id: 6,
    name: 'AURÉ STREET',
    category: 'DOM HILL',
    price: 130,
    image: '/images/shop/p5.jpg',
    description: 'Street-ready exploration equipment.'
  }
];

const categories = ['All', 'ZARA', 'NIKE', 'DOM HILL'];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartMessage, setCartMessage] = useState('');
  
  const router = useRouter();
  const { addToCart } = useCartStore();
  const { isLoggedIn } = useAuthStore();

  // تصفية المنتجات مباشرة بدون useEffect
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = useCallback((product) => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    addToCart(product);
    setCartMessage(`${product.name} added to cart!`);
    setTimeout(() => setCartMessage(''), 3000);
  }, [isLoggedIn, router, addToCart]);

  const handleCategoryChange = useCallback((e) => {
    setSelectedCategory(e.target.value);
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>SHOP</h1>
          <p className={styles.description}>
            Discover our complete range of AURÉ products.
          </p>
        </div>

        <div className={styles.controls}>
          <select
            className={styles.filter}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageContainer}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <div className={styles.content}>
                <div className={styles.category}>{product.category}</div>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.price}>${product.price}</div>
                <button
                  className={styles.addToCart}
                  onClick={() => handleAddToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>

        {cartMessage && (
          <div className={styles.cartMessage}>
            {cartMessage}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}