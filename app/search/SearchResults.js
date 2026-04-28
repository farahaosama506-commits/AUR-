// app/search/SearchResults.js
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { searchProducts } from '@/lib/products';
import styles from './search.module.css';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const foundResults = searchProducts(query);
    setResults(foundResults);
    setIsLoaded(true);
  }, [query]);

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

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            SEARCH RESULTS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={styles.query}
          >
            {query ? `Results for "${query}"` : 'Enter a search term'}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.count}
          >
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </motion.p>
        </div>
      </div>

      {results.length > 0 ? (
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {results.map((product) => (
            <motion.div
              key={`${product.id}-${product.source}`}
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
                <div className={styles.badge}>
                  {product.source === 'archive' ? 'ARCHIVE' : 'SHOP'}
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.category}>{product.category}</div>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.priceSection}>
                  <div className={styles.price}>${product.price}</div>
                  <Link
                    href={product.source === 'archive' ? '/archive' : '/shop'}
                    className={styles.viewLink}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className={styles.empty}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.emptyIcon}>🔍</div>
          <h2>No Products Found</h2>
          <p>
            {query
              ? `We couldn't find any products matching "${query}". Try a different search term.`
              : 'Enter a search term to find products.'}
          </p>
          <Link href="/shop" className={styles.shopLink}>
            Browse Shop
          </Link>
        </motion.div>
      )}
    </>
  );
}