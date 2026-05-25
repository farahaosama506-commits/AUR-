'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Check admin token
    const token = document.cookie.includes('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Load stats
    loadStats();
  }, []);

   const loadStats = async () => {
  try {
    const [statsRes, usersRes] = await Promise.all([
      fetch('/api/admin/stats'),
      fetch('/api/admin/users'),
    ]);

    const statsData = await statsRes.json();
    const usersData = await usersRes.json();

    if (statsData.success) {
      setStats({
        ...statsData.stats,
        users: usersData.users?.length || 0,
      });
    }
  } catch (error) {
    console.error('Failed to load stats');
  } finally {
    setLoading(false);
  }
};
  const handleLogout = () => {
    document.cookie = 'admin_token=; path=/admin; max-age=0';
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '250px',
        background: '#1a1a1a',
        color: '#fff',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '2rem' }}>
          AURÉ Admin
        </h2>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {[
            { key: 'overview', label: '📊 Overview', href: '/admin/dashboard' },
            { key: 'products', label: '📦 Products', href: '/admin/dashboard/products' },
            { key: 'users', label: '👥 Users', href: '/admin/dashboard/users' },
            { key: 'orders', label: '📋 Orders', href: '/admin/dashboard/orders' },
            { key: 'settings', label: '⚙️ Settings', href: '/admin/dashboard/settings' },
  
          ].map((item) => (
            <Link
              key={item.key}
              href={item.href}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '0.9rem',
                background: activeTab === item.key ? 'rgba(255,255,255,0.1)' : 'transparent',
                transition: 'background 0.2s',
              }}
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          style={{
            padding: '0.75rem',
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            marginTop: 'auto',
          }}
        >
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '2rem' }}>
          Dashboard Overview
        </h1>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {[
            { label: 'Products', value: stats.products, color: '#3b82f6', icon: '📦' },
            { label: 'Users', value: stats.users, color: '#10b981', icon: '👥' },
            { label: 'Orders', value: stats.orders, color: '#f59e0b', icon: '📋' },
            { label: 'Revenue', value: `$${stats.revenue}`, color: '#8b5cf6', icon: '💰' },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: stat.color }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div style={{
          background: '#fff',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
        }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>
            Recent Activity
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            No recent activity to display.
          </p>
        </div>
      </main>
    </div>
  );
}