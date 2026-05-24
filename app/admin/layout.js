export const metadata = {
  title: 'AURÉ Admin',
  description: 'Admin Dashboard',
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {children}
    </div>
  );
}