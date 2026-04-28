'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './archive.module.css';

const archivedProducts = [
  {
    id: 1,
    name: "First Gen Protego",
    price: "$350.00",
    status: "sold_out",
    year: "2022",
    image: "https://picsum.photos/id/48/400/500"
  },
  {
    id: 2,
    name: "Limited Edition Summit",
    price: "$450.00",
    status: "sold_out",
    year: "2023",
    image: "https://picsum.photos/id/58/400/500"
  },
  {
    id: 3,
    name: "Glacier Pro Shell",
    price: "$400.00",
    status: "limited",
    year: "2024",
    image: "https://picsum.photos/id/22/400/500"
  }
];

export default function Archive() {
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
        duration: 0.5
      }
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.header}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            ARCHIVE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discontinued products from our journey. These legendary pieces are no longer available but remain part of our history.
          </motion.p>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {archivedProducts.map((product) => (
            <motion.div
              key={product.id}
              className={styles.card}
              variants={itemVariants}
            >
              <div className={styles.status}>{product.status === 'sold_out' ? 'SOLD OUT' : 'LIMITED'}</div>
              <div className={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.image}
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
                <div className={styles.overlay}>
                  <div className={styles.yearText}>{product.year}</div>
                </div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.price}>{product.price}</div>
                <div className={styles.statusText}>No Longer Available</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}