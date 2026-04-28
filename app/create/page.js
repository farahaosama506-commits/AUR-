'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './create.module.css';

export default function Create() {
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState({
    type: 'shirt',
    color: '#ff0000',
    size: 'M',
    accessories: []
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateProduct = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1>أنشئ منتجك المخصص</h1>
        <div className={styles.steps}>
          <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>1. اختر النوع</div>
          <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>2. اختر اللون</div>
          <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>3. اختر الحجم</div>
          <div className={`${styles.step} ${step >= 4 ? styles.active : ''}`}>4. أضف إكسسوارات</div>
        </div>

        {step === 1 && (
          <div className={styles.stepContent}>
            <h2>اختر نوع المنتج</h2>
            <select value={product.type} onChange={(e) => updateProduct('type', e.target.value)}>
              <option value="shirt">قميص</option>
              <option value="pants">بنطال</option>
              <option value="dress">فستان</option>
            </select>
            <button onClick={nextStep}>التالي</button>
          </div>
        )}

        {step === 2 && (
          <div className={styles.stepContent}>
            <h2>اختر اللون</h2>
            <input type="color" value={product.color} onChange={(e) => updateProduct('color', e.target.value)} />
            <button onClick={prevStep}>السابق</button>
            <button onClick={nextStep}>التالي</button>
          </div>
        )}

        {step === 3 && (
          <div className={styles.stepContent}>
            <h2>اختر الحجم</h2>
            <select value={product.size} onChange={(e) => updateProduct('size', e.target.value)}>
              <option value="S">صغير</option>
              <option value="M">وسط</option>
              <option value="L">كبير</option>
            </select>
            <button onClick={prevStep}>السابق</button>
            <button onClick={nextStep}>التالي</button>
          </div>
        )}

        {step === 4 && (
          <div className={styles.stepContent}>
            <h2>أضف إكسسوارات</h2>
            <div className={styles.accessories}>
              <label><input type="checkbox" onChange={(e) => updateProduct('accessories', e.target.checked ? [...product.accessories, 'pocket'] : product.accessories.filter(a => a !== 'pocket'))} /> جيب</label>
              <label><input type="checkbox" onChange={(e) => updateProduct('accessories', e.target.checked ? [...product.accessories, 'buttons'] : product.accessories.filter(a => a !== 'buttons'))} /> أزرار</label>
            </div>
            <button onClick={prevStep}>السابق</button>
            <button onClick={() => alert('تم إنشاء المنتج!')}>إنهاء</button>
          </div>
        )}

        <div className={styles.preview}>
          <h3>معاينة المنتج</h3>
          <div className={styles.productPreview} style={{ backgroundColor: product.color }}>
            <p>نوع: {product.type}</p>
            <p>حجم: {product.size}</p>
            <p>إكسسوارات: {product.accessories.join(', ')}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}