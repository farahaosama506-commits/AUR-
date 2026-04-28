'use client';

import { motion } from 'framer-motion';
import styles from './DevelopmentProcess.module.css';

const phases = [
  {
    id: 1,
    number: '01',
    title: 'MATERIAL SYNTHESIS',
    description: 'Developing custom crossweave membrane structures with 20+ layer stack-ups emphasizing breathability ratios.',
    image: 'https://picsum.photos/id/96/400/300'  // مختبر/مواد
  },
  {
    id: 2,
    number: '02',
    title: 'HYDROSTATIC TESTING',
    description: 'Subjecting seams to extreme pressure in 100% moisture loaded alpine chambers.',
    image: 'https://picsum.photos/id/32/400/300'  // اختبارات ماء
  },
  {
    id: 3,
    number: '03',
    title: 'FIELD EXPEDITION',
    description: 'Real-world testing for professionals under in extreme mountain conditions.',
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
          <h2>OUR DEVELOPMENT PROCESS</h2>
          <p>
            Each piece undergoes 24 months of field testing in the Northern Cascades and Himalayas before it reaches production.
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
