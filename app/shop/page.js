'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useCartStore from '@/lib/store/cartStore';
import useAuthStore from '@/lib/store/auth-store';
import styles from './shop.module.css';

const categories = ['All', 'ZARA', 'NIKE', 'DOM HILL'];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartMessage, setCartMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { addToCart } = useCartStore();
  const { isLoggedIn } = useAuthStore();

  // جلب المنتجات من API
  const fetchProducts = useCallback(async (category) => {
    setIsLoading(true);
    setError('');
    
    try {
      const url = category === 'All' 
        ? '/api/products'
        : `/api/products?category=${category}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        setError(data.error || 'Failed to load products');
      }
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory, fetchProducts]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    addToCart(product);
    setCartMessage(`${product.name} added to cart!`);
    setTimeout(() => setCartMessage(''), 3000);
  };

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

        {/* Loading State */}
        {isLoading && (
          <div className={styles.loading}>
            <p>Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className={styles.error}>
            <p>{error}</p>
            <button onClick={() => fetchProducts(selectedCategory)}>
              Try Again
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && (
          <div className={styles.grid}>
            {products.length === 0 ? (
              <p className={styles.noProducts}>No products found.</p>
            ) : (
              products.map((product, index) => (
                <div 
                  key={product.id} 
                  className={styles.card}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
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
                    <p className={styles.description}>{product.description}</p>
                    <div className={styles.price}>${product.price}</div>
                    <button
                      className={styles.addToCart}
                      onClick={() => handleAddToCart(product)}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

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