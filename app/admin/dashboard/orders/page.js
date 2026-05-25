'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const statusColors = {
  pending: { bg: '#fef3c7', color: '#d97706', label: 'Pending' },
  processing: { bg: '#dbeafe', color: '#2563eb', label: 'Processing' },
  shipped: { bg: '#ede9fe', color: '#7c3aed', label: 'Shipped' },
  delivered: { bg: '#d1fae5', color: '#059669', label: 'Delivered' },
  cancelled: { bg: '#fee2e2', color: '#dc2626', label: 'Cancelled' },
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => { loadOrders(); }, []);

  const loadOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      if (data.success) setOrders(data.orders || []);
    } catch (error) {
      console.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error('Failed to update status');
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  const toggleExpand = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  if (loading) return <div style={styles.container}><p>Loading...</p></div>;

  return (
    <div style={styles.container}>
      <Link href="/admin/dashboard" style={styles.backLink}>← Dashboard</Link>

      <div style={styles.header}>
        <h1 style={styles.title}>Orders ({orders.length})</h1>
      </div>

      {/* Filter Tabs */}
      <div style={styles.filters}>
        {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              ...styles.filterBtn,
              background: filter === status ? '#6366f1' : '#f1f5f9',
              color: filter === status ? '#fff' : '#475569',
            }}
          >
            {status === 'all' ? 'All' : statusColors[status]?.label || status}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div style={styles.card}>
        {filteredOrders.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
            No orders found
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} style={styles.orderCard}>
              <div style={styles.orderHeader} onClick={() => toggleExpand(order.id)}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: '#6366f1' }}>#{order.id}</span>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{order.user_email}</span>
                  <span style={{
                    ...styles.statusBadge,
                    background: statusColors[order.status]?.bg || '#f1f5f9',
                    color: statusColors[order.status]?.color || '#475569',
                  }}>
                    {statusColors[order.status]?.label || order.status}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>${order.total_amount}</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <div style={styles.orderDetails}>
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: '#475569' }}>
                      Items ({order.items?.length || 0})
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {order.items?.map((item, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: '#f8fafc', borderRadius: '6px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img src={item.image} alt={item.name} style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: '4px' }} />
                            <div>
                              <p style={{ fontWeight: 500, fontSize: '0.9rem' }}>{item.name}</p>
                              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>x{item.quantity}</p>
                            </div>
                          </div>
                          <span style={{ fontWeight: 600 }}>${item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: '#475569' }}>
                      Update Status
                    </h4>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {Object.entries(statusColors).map(([key, val]) => (
                        <button
                          key={key}
                          onClick={() => handleStatusChange(order.id, key)}
                          style={{
                            ...styles.statusBtn,
                            background: order.status === key ? val.color : '#f1f5f9',
                            color: order.status === key ? '#fff' : val.color,
                            border: `1px solid ${val.color}`,
                          }}
                        >
                          {val.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '1200px' },
  backLink: { color: '#6366f1', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, display: 'inline-block', marginBottom: '1.5rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
  title: { fontSize: '1.4rem', fontWeight: 700, color: '#1e293b' },
  filters: { display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' },
  filterBtn: { padding: '0.5rem 1rem', border: 'none', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' },
  card: { background: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  orderCard: { borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s' },
  orderHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem' },
  statusBadge: { padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 500 },
  orderDetails: { padding: '1.5rem', background: '#fafafa', borderTop: '1px solid #e2e8f0' },
  statusBtn: { padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' },
};