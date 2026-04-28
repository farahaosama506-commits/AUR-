'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './tech.module.css';

const technologies = [
  {
    id: 1,
    title: 'Material Synthesis',
    description: 'Advanced composite materials engineered for extreme conditions. Our proprietary synthesis process creates fabrics that are 40% lighter yet 200% stronger than traditional materials.',
    specs: [
      { label: 'Tensile Strength', value: '500 MPa' },
      { label: 'Weight Reduction', value: '40%' },
      { label: 'Temperature Range', value: '-60°C to 120°C' },
      { label: 'Durability Rating', value: 'IP68' }
    ],
    image: 'https://picsum.photos/id/32/600/400',
    label: 'COMPOSITE SYNTHESIS'
  },
  {
    id: 2,
    title: 'Hydrostatic Testing',
    description: 'Every NIVIS GEAR product undergoes rigorous hydrostatic testing at pressures equivalent to 100 meters underwater. This ensures absolute waterproof integrity.',
    specs: [
      { label: 'Test Pressure', value: '10 bar' },
      { label: 'Waterproof Rating', value: 'IPX8' },
      { label: 'Test Duration', value: '24 hours' },
      { label: 'Failure Rate', value: '<0.01%' }
    ],
    image: 'https://picsum.photos/id/96/600/400',
    label: 'HYDROSTATIC TESTING'
  },
  {
    id: 3,
    title: 'Field Expedition',
    description: 'Real-world testing in extreme environments worldwide. Our products are battle-tested in deserts, mountains, and polar regions before reaching customers.',
    specs: [
      { label: 'Test Locations', value: '12 Countries' },
      { label: 'Field Testers', value: '50+ Explorers' },
      { label: 'Test Duration', value: '2 Years' },
      { label: 'Success Rate', value: '99.8%' }
    ],
    image: 'https://picsum.photos/id/104/600/400',
    label: 'FIELD EXPEDITION'
  }
];

export default function Tech() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
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
            TECHNOLOGY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Innovation drives exploration. Discover the cutting-edge technology behind NIVIS GEAR products.
          </motion.p>
        </div>

        <motion.div
          className={styles.sections}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {technologies.map((tech, index) => (
            <motion.section
              key={tech.id}
              className={styles.section}
              variants={sectionVariants}
            >
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{tech.title}</h2>
                <p className={styles.sectionDescription}>{tech.description}</p>
              </div>

              <div className={styles.content}>
                <div className={styles.textContent}>
                  <div className={styles.specs}>
                    {tech.specs.map((spec, specIndex) => (
                      <motion.div
                        key={specIndex}
                        className={styles.spec}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + specIndex * 0.1 }}
                      >
                        <div className={styles.specTitle}>{spec.label}</div>
                        <div className={styles.specValue}>{spec.value}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className={styles.visualContent}>
                  <img
                    src={tech.image}
                    alt={tech.title}
                    className={styles.image}
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                  <div className={styles.overlay}>
                    <div className={styles.techLabel}>{tech.label}</div>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}