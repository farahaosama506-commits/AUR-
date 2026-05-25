'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useCartStore from '@/lib/store/cartStore';
import useAuthStore from '@/lib/store/auth-store';
import Link from 'next/link';
import styles from './cart.module.css';

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCartStore();
  const { isLoggedIn , user } = useAuthStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState('');

  const total = typeof getTotal === 'function' ? getTotal() : items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
  if (!isLoggedIn) {
    router.push('/login');
    return;
  }

  if (items.length === 0) {
    setError('Your cart is empty');
    return;
  }

  setIsCheckingOut(true);
  setError('');

  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items,
        userEmail: user?.email || '',
        userId: user?.id || '',
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Checkout failed');
    }

    window.location.href = data.url;
  } catch (err) {
    setError(err.message);
    setIsCheckingOut(false);
  }
};

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.empty}>
          <h2>Cart is Empty</h2>
          <Link href="/shop">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>SHOPPING CART</h1>

        {error && <div className={styles.error}>{error}</div>}
        
        <div className={styles.items}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemInfo}>
                <h3>{item.name}</h3>
                <p className={styles.itemCategory}>{item.category}</p>
                <p className={styles.itemPrice}>${item.price}</p>
                <div className={styles.quantity}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <div className={styles.itemTotal}>
                <p>${item.price * item.quantity}</p>
                <button className={styles.remove} onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.footer}>
          <div className={styles.total}>
            <span>Total:</span>
            <strong>${total}</strong>
          </div>
          <div className={styles.actions}>
            <button onClick={clearCart} className={styles.clearBtn}>Clear Cart</button>
            <Link href="/shop" className={styles.continueBtn}>Continue Shopping</Link>
          </div>
          
          {/* Checkout Button */}
          {isLoggedIn && (
            <button 
              className={styles.checkoutBtn}
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Processing...' : `Checkout - $${total}`}
            </button>
          )}
          
          {!isLoggedIn && (
            <Link href="/login" className={styles.checkoutBtn}>
              Login to Checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}


