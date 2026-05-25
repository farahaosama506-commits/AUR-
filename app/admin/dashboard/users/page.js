'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', password: '', username: '', role: 'user' });

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      if (data.success) setUsers(data.users);
    } catch (error) {
      console.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
  if (!confirm('Delete this user?')) return;
  try {
    const response = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
    const data = await response.json();
    if (data.success) {
      setMessage('User deleted');
      // ✅ تحديث فوري للقائمة
      setUsers(users.filter(user => user.id !== id));
      setTimeout(() => setMessage(''), 3000);
    }
  } catch (error) {
    console.error('Failed to delete user');
  }
};
  const handleRoleChange = async (userId, newRole) => {
    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      setMessage(`Role updated to ${newRole}`);
      loadUsers();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to update role');
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      if (data.success) {
        setMessage('User created');
        setShowAddForm(false);
        setNewUser({ email: '', password: '', username: '', role: 'user' });
        loadUsers();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Failed to add user');
    }
  };

  if (loading) return <div style={styles.container}><p>Loading...</p></div>;

  return (
    <div style={styles.container}>
      <Link href="/admin/dashboard" style={styles.backLink}>← Dashboard</Link>

      <div style={styles.header}>
        <h1 style={styles.title}>Users ({users.length})</h1>
        <button onClick={() => setShowAddForm(!showAddForm)} style={styles.primaryBtn}>
          {showAddForm ? 'Cancel' : '+ Add User'}
        </button>
      </div>

      {message && <div style={styles.success}>{message}</div>}

      {/* Add User Form */}
      {showAddForm && (
        <div style={styles.formCard}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>New User</h3>
          <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <input type="email" placeholder="Email" required value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} style={styles.input} />
              <input type="password" placeholder="Password" required value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} style={styles.input} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <input type="text" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} style={styles.input} />
              <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} style={styles.select}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" style={styles.submitBtn}>Create User</button>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Joined</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={styles.tr}>
                <td style={{ ...styles.td, fontWeight: 600 }}>{user.email}</td>
                <td style={styles.td}>{user.username}</td>
                <td style={styles.td}>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    style={styles.selectRole}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td style={styles.td}>{new Date(user.created_at).toLocaleDateString()}</td>
                <td style={styles.td}>
                  <button onClick={() => handleDelete(user.id)} style={styles.deleteBtn}>Delete</button>
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
  primaryBtn: { padding: '0.6rem 1.4rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' },
  success: { background: '#ecfdf5', color: '#059669', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' },
  formCard: { background: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  input: { padding: '0.65rem 0.8rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.88rem', background: '#f8fafc', outline: 'none' },
  select: { padding: '0.65rem 0.8rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.88rem', background: '#f8fafc', outline: 'none', cursor: 'pointer' },
  submitBtn: { padding: '0.7rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' },
  card: { background: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { background: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
  th: { padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' },
  tr: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '0.85rem 1rem', fontSize: '0.9rem', color: '#334155' },
  selectRole: { padding: '0.4rem 0.6rem', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.85rem', background: '#f8fafc', cursor: 'pointer', color: '#1e293b' },
  deleteBtn: { padding: '0.4rem 0.8rem', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' },
};