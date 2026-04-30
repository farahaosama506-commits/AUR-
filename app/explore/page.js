'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './explore.module.css';

const stories = [
  {
    id: 1,
    title: "A collection of stylish olive-green t-shirts",
    date: "March 15, 2025",
    description: "We have displayed the largest collection of t-shirts in the store with a 50% discount..",
    image: "/images/explore/e1.jpg" 
  },
  {
    id: 2,
    title: "Exclusive NIKE shoes",
    date: "February 28, 2025",
    description: "Get the largest collection of Nike brand shoes at a competitive price.",
    image: "/images/explore/e2.jpg"
  },
  {
    id: 3,
    title: "Time Event",
    date: "January 10, 2025",
    description: "We have expanded to showcase the most luxurious and sophisticated watches..",
    image: "/images/explore/e3.jpg"
  }
];

export default function Explore() {
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
            Join the community of explorers sharing their stories and discoveries from around the world.
          </motion.p>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stories.map((story) => (
            <motion.div
              key={story.id}
              className={styles.card}
              variants={itemVariants}
            >
              <div className={styles.imageContainer}>
                <img
                  src={story.image}
                  alt={story.title}
                  className={styles.image}
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
                <div className={styles.overlay}>
                  <div className={styles.content}>
                    <div className={styles.date}>{story.date}</div>
                    <h3 className={styles.title}>{story.title}</h3>
                    <p className={styles.description}>{story.description}</p>
                    <button className={styles.cta}>READ STORY</button>
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