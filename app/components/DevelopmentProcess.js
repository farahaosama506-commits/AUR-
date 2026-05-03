'use client';

import { motion } from 'framer-motion';
import styles from './DevelopmentProcess.module.css';

const phases = [
  {
    id: 1,
    number: '01',
    title: '1',
    description: '11.',
    image: 'https://picsum.photos/id/96/400/300'  // مختبر/مواد
  },
  {
    id: 2,
    number: '02',
    title: '2',
    description: '22.',
    image: 'https://picsum.photos/id/32/400/300'  // اختبارات ماء
  },
  {
    id: 3,
    number: '03',
    title: '3',
    description: '33.',
    image: 'https://picsum.photos/id/104/400/300'  // متسلقين جبال
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function DevelopmentProcess() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className={styles.header}
        >
          <h2>Classic and VIP</h2>
          <p>
      Get the rarest pieces in the Middle East
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {phases.map((phase) => (
            <motion.div key={phase.id} variants={itemVariants} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img 
                  src={phase.image} 
                  alt={phase.title}
                  className={styles.image}
                />
              </div>
              
              <div className={styles.content}>
                <div className={styles.phaseNumber}>{phase.number}</div>
                <h3>{phase.title}</h3>
                <p>{phase.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
