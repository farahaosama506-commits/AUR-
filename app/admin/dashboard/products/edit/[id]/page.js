'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'ZARA', image: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { loadProduct(); }, [id]);

  const loadProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      if (data.success) {
        setForm({ name: data.data.name || '', description: data.data.description || '', price: data.data.price || '', category: data.data.category || 'ZARA', image: data.data.image || '' });
      } else { setError('Product not found'); }
    } catch { setError('Failed to load'); } finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, price: parseFloat(form.price) }) });
      const data = await res.json();
      if (data.success) { router.push('/admin/dashboard/products'); } else { setError(data.error); }
    } catch { setError('Failed to update'); } finally { setSaving(false); }
  };

  if (loading) return <div style={styles.container}><p>Loading...</p></div>;

  return (
    <div style={styles.container}>
      <Link href="/admin/dashboard/products" style={styles.backLink}>← Back to Products</Link>
      <h1 style={styles.title}>Edit Product</h1>

      <div style={styles.card}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Product Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required style={styles.input} />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} style={styles.textarea} />
          </div>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Price ($)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required min="0" step="0.01" style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={styles.select}>
                <option value="ZARA">ZARA</option>
                <option value="NIKE">NIKE</option>
                <option value="DOM HILL">DOM HILL</option>
                <option value="ACCESSORIES">ACCESSORIES</option>
              </select>
            </div>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Image URL</label>
            <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} style={styles.input} />
          </div>
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" disabled={saving} style={styles.submitBtn}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '700px' },
  backLink: { color: '#6366f1', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, display: 'inline-block', marginBottom: '1.5rem' },
  title: { fontSize: '1.4rem', fontWeight: 700, color: '#1e293b', marginBottom: '1.5rem' },
  card: { background: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  field: { flex: 1 },
  label: { fontSize: '0.82rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.4rem' },
  input: { width: '100%', padding: '0.75rem 0.9rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.9rem', color: '#1e293b', background: '#f8fafc', outline: 'none' },
  textarea: { width: '100%', padding: '0.75rem 0.9rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.9rem', color: '#1e293b', background: '#f8fafc', outline: 'none', resize: 'vertical', fontFamily: 'inherit' },
  select: { width: '100%', padding: '0.75rem 0.9rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.9rem', color: '#1e293b', background: '#f8fafc', outline: 'none', cursor: 'pointer' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  error: { background: '#fef2f2', color: '#ef4444', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.85rem', border: '1px solid #fee2e2' },
  submitBtn: { padding: '0.85rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', marginTop: '0.5rem' },
};