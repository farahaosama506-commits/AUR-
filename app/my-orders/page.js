'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import useAuthStore from '@/lib/store/auth-store';

const statusConfig = {
  pending: { label: 'Pending', color: '#d97706', bg: '#fef3c7', icon: '⏳' },
  processing: { label: 'Processing', color: '#2563eb', bg: '#dbeafe', icon: '🔄' },
  shipped: { label: 'Shipped', color: '#7c3aed', bg: '#ede9fe', icon: '📦' },
  delivered: { label: 'Delivered', color: '#059669', bg: '#d1fae5', icon: '✅' },
  cancelled: { label: 'Cancelled', color: '#dc2626', bg: '#fee2e2', icon: '❌' },
};

export default function MyOrdersPage() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    loadOrders();
  }, [isLoggedIn]);

  const loadOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      if (data.success) {
        // تصفية طلبات المستخدم الحالي
        const myOrders = (data.orders || []).filter(
          order => order.user_email === user?.email
        );
        setOrders(myOrders);
      }
    } catch (error) {
      console.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  if (loading) {
    return (
      <>
        <Header />
        <div style={styles.container}>
          <div style={styles.loading}>
            <div style={styles.spinner} />
            <p>Loading your orders...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main style={styles.main}>
        <div style={styles.container}>
          <Link href="/" style={styles.backLink}>← Back to Store</Link>

          <div style={styles.header}>
            <div>
              <h1 style={styles.title}>My Orders</h1>
              <p style={styles.subtitle}>
                {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div style={styles.filters}>
            {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                style={{
                  ...styles.filterBtn,
                  background: filter === status ? '#1a1a1a' : '#f3f4f6',
                  color: filter === status ? '#fff' : '#4b5563',
                }}
              >
                {status === 'all' ? 'All' : statusConfig[status]?.label || status}
              </button>
            ))}
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div style={styles.empty}>
              <div style={styles.emptyIcon}>📋</div>
              <h2 style={styles.emptyTitle}>No orders found</h2>
              <p style={styles.emptyText}>
                {filter === 'all' 
                  ? "You haven't placed any orders yet."
                  : `No ${statusConfig[filter]?.label?.toLowerCase()} orders found.`}
              </p>
              <Link href="/shop" style={styles.shopBtn}>
                Start Shopping
              </Link>
            </div>
          ) : (
            <div style={styles.orderList}>
              {filteredOrders.map((order) => (
                <div key={order.id} style={styles.orderCard}>
                  <div 
                    style={styles.orderHeader}
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <div style={styles.orderHeaderLeft}>
                      <span style={styles.orderId}>Order #{order.id}</span>
                      <span style={styles.orderDate}>
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div style={styles.orderHeaderRight}>
                      <span style={{
                        ...styles.statusBadge,
                        background: statusConfig[order.status]?.bg || '#f3f4f6',
                        color: statusConfig[order.status]?.color || '#4b5563',
                      }}>
                        {statusConfig[order.status]?.icon} {statusConfig[order.status]?.label || order.status}
                      </span>
                      <span style={styles.expandIcon}>
                        {expandedOrder === order.id ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>

                  {/* Order Summary (always visible) */}
                  <div style={styles.orderSummary}>
                    <span style={styles.itemCount}>
                      {order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'}
                    </span>
                    <span style={styles.orderTotal}>Total: ${order.total_amount}</span>
                  </div>

                  {/* Expanded Details */}
                  {expandedOrder === order.id && (
                    <div style={styles.orderDetails}>
                      <div style={styles.itemsList}>
                        {order.items?.map((item, index) => (
                          <div key={index} style={styles.orderItem}>
                            <div style={styles.itemImageContainer}>
                              <img 
                                src={item.image || '/images/placeholder.jpg'} 
                                alt={item.name} 
                                style={styles.itemImage} 
                              />
                            </div>
                            <div style={styles.itemInfo}>
                              <Link href={`/product/${item.id}`} style={styles.itemName}>
                                {item.name}
                              </Link>
                              <p style={styles.itemMeta}>
                                Qty: {item.quantity} × ${item.price}
                              </p>
                            </div>
                            <span style={styles.itemTotal}>
                              ${item.price * item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div style={styles.detailsFooter}>
                        <div style={styles.detailsRow}>
                          <span>Subtotal</span>
                          <span>${order.total_amount}</span>
                        </div>
                        <div style={styles.detailsRow}>
                          <span>Shipping</span>
                          <span style={{ color: '#059669' }}>Free</span>
                        </div>
                        <div style={{ ...styles.detailsRow, borderTop: '2px solid #1a1a1a', paddingTop: '1rem', fontWeight: 700, fontSize: '1.1rem' }}>
                          <span>Total</span>
                          <span>${order.total_amount}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    background: 'var(--background, #f8fafc)',
    paddingTop: '100px',
    paddingBottom: '4rem',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  backLink: {
    color: '#6366f1',
    textDecoration: 'none',
    fontSize: '0.9rem',
    display: 'inline-block',
    marginBottom: '2rem',
    fontWeight: 500,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: '0.25rem',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '0.9rem',
  },
  filters: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  orderCard: {
    background: '#fff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem 1.5rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  orderHeaderLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  orderId: {
    fontWeight: 700,
    fontSize: '1rem',
    color: '#1a1a1a',
  },
  orderDate: {
    fontSize: '0.85rem',
    color: '#6b7280',
  },
  orderHeaderRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  statusBadge: {
    padding: '0.35rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 500,
  },
  expandIcon: {
    fontSize: '0.7rem',
    color: '#9ca3af',
  },
  orderSummary: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.75rem 1.5rem',
    background: '#f9fafb',
    borderTop: '1px solid #e5e7eb',
    fontSize: '0.9rem',
    color: '#6b7280',
  },
  itemCount: {},
  orderTotal: {
    fontWeight: 600,
    color: '#1a1a1a',
  },
  orderDetails: {
    borderTop: '1px solid #e5e7eb',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
  },
  orderItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #f3f4f6',
  },
  itemImageContainer: {
    width: '56px',
    height: '56px',
    borderRadius: '8px',
    overflow: 'hidden',
    background: '#f3f4f6',
    flexShrink: 0,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontWeight: 600,
    fontSize: '0.9rem',
    color: '#1a1a1a',
    textDecoration: 'none',
    marginBottom: '0.25rem',
    display: 'block',
  },
  itemMeta: {
    fontSize: '0.8rem',
    color: '#6b7280',
  },
  itemTotal: {
    fontWeight: 600,
    fontSize: '0.95rem',
    color: '#1a1a1a',
  },
  detailsFooter: {
    padding: '1.25rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  detailsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: '#4b5563',
  },
  empty: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: '#fff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  emptyTitle: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: '0.5rem',
  },
  emptyText: {
    color: '#6b7280',
    marginBottom: '1.5rem',
    fontSize: '0.95rem',
  },
  shopBtn: {
    display: 'inline-block',
    padding: '0.75rem 2rem',
    background: '#1a1a1a',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  loading: {
    textAlign: 'center',
    padding: '6rem 2rem',
    color: '#6b7280',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #e5e7eb',
    borderTopColor: '#1a1a1a',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    margin: '0 auto 1rem',
  },
};