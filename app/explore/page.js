'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './explore.module.css';

const stories = [
  {
    id: 1,
    title: "Alpine Ascent: The Matterhorn",
    date: "March 15, 2025",
    description: "Our team conquered the iconic peak using Nivis gear in -25°C conditions.",
    image: "https://picsum.photos/id/15/800/500" 
  },
  {
    id: 2,
    title: "Backcountry Powder Days",
    date: "February 28, 2025",
    description: "Deep snow and steep lines in the British Columbia backcountry.",
    image: "https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    title: "The Perfect Storm Test",
    date: "January 10, 2025",
    description: "Testing the Protego Pro Shell in hurricane-force winds on Mount Washington.",
    image: "https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 4,
    title: "Local Hero: Ski Patrol Edition",
    date: "December 5, 2024",
    description: "Meet the patrol team relying on Nivis gear for their daily rescues.",
    image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800"
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