'use client';

import { motion } from 'framer-motion';
import styles from './ProductGrid.module.css';

const products = [
  {
    id: 1,
    name: 'PROTECTO SKI JACKET',
    price: '$650.00',
    image: 'https://picsum.photos/id/20/400/500',  // منظر جبلي
    colorCount: 3
  },
  {
    id: 2,
    name: 'PROTECTO SHELL',
    price: '$550.00',
    image: 'https://picsum.photos/id/29/400/500',  // طبيعة ثلجية
    colorCount: 4
  },
  {
    id: 3,
    name: 'TENDO JACKET',
    price: '$450.00',
    image: 'https://picsum.photos/id/35/400/500',  // منظر جبلي آخر
    colorCount: 3
  },
  {
    id: 4,
    name: 'EVERYDAY PUFFY',
    price: '$325.00',
    image: 'https://picsum.photos/id/46/400/500',  // طبيعة شتوية
    colorCount: 3
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function ProductGrid() {
  return (
    <section className={styles.section} id="products">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className={styles.heading}>ENGINEERED SYSTEMS</h2>
          <p className={styles.subtitle}>
            High-altitude performance requires gear that sits as a second skin. Our latest shells are tested in the most demanding alpine conditions.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className={`${styles.card} ${product.featured ? styles.featured : ''}`}
            >
              <div className={styles.imageContainer}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className={styles.image}
                />
              </div>
              
              <div className={styles.content}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.price}>{product.price}</p>
              </div>

              <div className={styles.actions}>
                <button className={styles.viewButton}>VIEW PRODUCT</button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
