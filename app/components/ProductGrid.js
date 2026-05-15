'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductGrid.module.css';

const products = [
  { id: 1, name: '1', price: '$650.00', image: '/images/products/image1.jpg', colorCount: 3 },
  { id: 2, name: '2', price: '$550.00', image: '/images/products/image2.jpg', colorCount: 4 },
  { id: 3, name: '3', price: '$450.00', image: '/images/products/image3.jpg', colorCount: 3 },
  { id: 4, name: '4', price: '$325.00', image: '/images/products/image4.jpg', colorCount: 3 }
];

export default function ProductGrid() {
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
              <div className={styles.imageContainer}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.price}>{product.price}</p>
              </div>
              <div className={styles.actions}>
                <Link href="/shop" className={styles.viewButton}>
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