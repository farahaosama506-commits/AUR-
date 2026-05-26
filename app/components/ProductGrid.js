'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductGrid.module.css';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products?featured=true&limit=4')
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.data);
      });
  }, []);

  if (products.length === 0) return null;

  return (
    <section className={styles.section} id="products">
      <div className={styles.container}>
        <h2 className={styles.heading}>Best offers</h2>
        <p className={styles.subtitle}>
          We offer you the best deals you can get from global brands in a complete package.
        </p>

        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <Link href={`/product/${product.id}`} className={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.image}
                />
              </Link>
              <div className={styles.content}>
                <h3 className={styles.name}>
                  <Link href={`/product/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {product.name}
                  </Link>
                </h3>
                <p className={styles.price}>${product.price}</p>
              </div>
              <div className={styles.actions}>
                <Link href={`/product/${product.id}`} className={styles.viewButton}>
                  VIEW PRODUCT
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}