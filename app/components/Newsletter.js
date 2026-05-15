'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || isLoading) return;
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSubmitted(true);
    setEmail('');
    setIsLoading(false);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className={styles.content}
        >
          <h2>THE INTELLIST</h2>
          <p>Early access to technical drops and expedition reports. No marketing fluff.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <input
            type="email"
            placeholder="EMAIL ADDRESS"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
            inputMode="email"
            autoComplete="email"
          />
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? '...' : 'JOIN'}
          </button>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.message}
            >
              Thanks for subscribing!
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}