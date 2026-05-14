'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useCartStore from '@/lib/store/cartStore';
import useAuthStore from '@/lib/store/auth-store';
import styles from './explore.module.css';

const products = [
  {
    id: 101,
    name: 'OLIVE GREEN T-SHIRT',
    category: 'T-SHIRTS',
    price: 45,
    image: '/images/explore/e1.jpg',
    description: 'Stylish olive-green t-shirt. 50% discount available.',
    date: 'March 15, 2025'
  },
  {
    id: 102,
    name: 'NIKE EXCLUSIVE',
    category: 'SHOES',
    price: 120,
    image: '/images/explore/e2.jpg',
    description: 'Exclusive Nike shoes at competitive prices.',
    date: 'February 28, 2025'
  },
  {
    id: 103,
    name: 'LUXURY WATCH',
    category: 'ACCESSORIES',
    price: 250,
    image: '/images/explore/e3.jpg',
    description: 'Sophisticated luxury watches now available.',
    date: 'January 10, 2025'
  }
];

export default function Explore() {
  const router = useRouter();
  const { addToCart } = useCartStore();
  const { isLoggedIn } = useAuthStore();

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    addToCart(product);
  };

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
            EXPLORE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover our exclusive collections and limited-time offers.
          </motion.p>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className={styles.card}
              variants={itemVariants}
            >
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
                  <div className={styles.content}>
                    <div className={styles.date}>{product.date}</div>
                    <div className={styles.category}>{product.category}</div>
                    <h3 className={styles.title}>{product.name}</h3>
                    <p className={styles.description}>{product.description}</p>
                    <div className={styles.priceRow}>
                      <span className={styles.price}>${product.price}</span>
                      <button 
                        className={styles.cta}
                        onClick={() => handleAddToCart(product)}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}