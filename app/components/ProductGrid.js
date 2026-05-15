'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductGrid.module.css';

const products = [
  { id: 1, name: 'Alpine Shell', price: '$650.00', image: '/images/products/image1.jpg', colorCount: 3 },
  { id: 2, name: 'Summit Parka', price: '$550.00', image: '/images/products/image2.jpg', colorCount: 4 },
  { id: 3, name: 'Trail Pants', price: '$450.00', image: '/images/products/image3.jpg', colorCount: 3 },
  { id: 4, name: 'Expedition Boots', price: '$325.00', image: '/images/products/image4.jpg', colorCount: 3 }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function ProductGrid() {
  return (
    <section className={styles.section} id="products">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          <h2 className={styles.heading}>Best Offers</h2>
          <p className={styles.subtitle}>
            We offer you the best deals from global brands in a complete package.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants} className={styles.card}>
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
                <Link href="/shop" className={styles.viewButton}>VIEW PRODUCT</Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}