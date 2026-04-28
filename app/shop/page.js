'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
    name: ' AURÉ STREET',
    category: 'DOM HILL',
    price: 130,
    image: '/images/shop/p5.jpg',
    description: 'Street-ready exploration equipment.'
  }
];

const categories = ['All', 'ZARA', 'NIKE' , 'DOM HILL'];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartMessage, setCartMessage] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory]);

  const handleAddToCart = (productName) => {
    setCartMessage(`${productName} added to cart!`);
    setTimeout(() => setCartMessage(''), 3000);
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
            SHOP
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover our complete range of AURÉ products.
          </motion.p>
        </div>

        <div className={styles.controls}>
          <select
            className={styles.filter}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.map((product) => (
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
              </div>
              <div className={styles.content}>
                <div className={styles.category}>{product.category}</div>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.price}>${product.price.toLocaleString('en-US')}</div>
                <button
                  className={styles.addToCart}
                  onClick={() => handleAddToCart(product.name)}
                >
                  ADD TO CART
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {cartMessage && (
          <motion.div
            className={styles.cartMessage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {cartMessage}
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}