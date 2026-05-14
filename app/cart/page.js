'use client';

import useCartStore from '@/lib/store/cartStore';
import Link from 'next/link';
import styles from './cart.module.css';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.empty}>
          <h2>🛒 Cart is Empty</h2>
          <p>Add some products to your cart</p>
          <Link href="/shop" className={styles.continue}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const total = getTotal();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>SHOPPING CART</h1>
        
        <div className={styles.items}>
          {items.map(item => (
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
                <button 
                  className={styles.remove}
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
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
            <button onClick={clearCart} className={styles.clearBtn}>
              Clear Cart
            </button>
            <Link href="/shop" className={styles.continueBtn}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}