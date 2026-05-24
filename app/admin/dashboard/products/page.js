'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.success) setProducts(data.data);
    } catch (error) {
      console.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setMessage('Product deleted');
      loadProducts();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to delete');
    }
  };

  if (loading) return <div style={styles.container}><p>Loading...</p></div>;

  return (
    <div style={styles.container}>
      <Link href="/admin/dashboard" style={styles.backLink}>← Dashboard</Link>

      <div style={styles.header}>
        <h1 style={styles.title}>Products ({products.length})</h1>
        <Link href="/admin/dashboard/products/add" style={styles.primaryBtn}>+ Add Product</Link>
      </div>

      {message && <div style={styles.success}>{message}</div>}

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={styles.tr}>
                <td style={styles.td}>
                  <img src={product.image} alt={product.name} style={styles.productImage} />
                </td>
                <td style={{ ...styles.td, fontWeight: 600 }}>{product.name}</td>
                <td style={styles.td}>
                  <span style={styles.badge}>{product.category}</span>
                </td>
                <td style={{ ...styles.td, fontWeight: 700 }}>${product.price}</td>
                <td style={{ ...styles.td, display: 'flex', gap: '0.5rem' }}>
                  <Link href={`/admin/dashboard/products/edit/${product.id}`} style={styles.editBtn}>Edit</Link>
                  <button onClick={() => handleDelete(product.id)} style={styles.deleteBtn}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '1200px' },
  backLink: { color: '#6366f1', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, display: 'inline-block', marginBottom: '1.5rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
  title: { fontSize: '1.4rem', fontWeight: 700, color: '#1e293b' },
  primaryBtn: { padding: '0.6rem 1.4rem', background: '#6366f1', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s' },
  success: { background: '#ecfdf5', color: '#059669', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' },
  card: { background: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { background: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
  th: { padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' },
  tr: { borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' },
  td: { padding: '0.85rem 1rem', fontSize: '0.9rem', color: '#334155' },
  productImage: { width: 42, height: 42, objectFit: 'cover', borderRadius: '6px' },
  badge: { padding: '0.25rem 0.6rem', background: '#f1f5f9', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 500, color: '#475569' },
  editBtn: { padding: '0.4rem 0.8rem', background: '#eff6ff', color: '#3b82f6', textDecoration: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 500, transition: 'all 0.2s' },
  deleteBtn: { padding: '0.4rem 0.8rem', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' },
};