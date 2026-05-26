'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import useCartStore from '@/lib/store/cartStore';
import useAuthStore from '@/lib/store/auth-store';

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      if (data.success) {
        setProduct(data.data);
      }
    } catch (error) {
      console.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    addToCart({ ...product, quantity });
    setMessage('Added to cart!');
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div style={styles.loading}>
          <p>Loading product...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div style={styles.loading}>
          <h2>Product not found</h2>
          <Link href="/shop" style={styles.backLink}>← Back to Shop</Link>
        </div>
        <Footer />
      </>
    );
  }

  const images = product.images || [product.image];

  return (
    <>
      <Header />
      <main style={styles.main}>
        <div style={styles.container}>
          <Link href="/shop" style={styles.backLink}>← Back to Shop</Link>

          <div style={styles.productGrid}>
            {/* Images */}
            <div style={styles.imagesSection}>
              <div style={styles.mainImage}>
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              
              {images.length > 1 && (
                <div style={styles.thumbnailRow}>
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      style={{
                        ...styles.thumbnail,
                        border: selectedImage === index ? '2px solid #1a1a1a' : '2px solid transparent',
                      }}
                    >
                      <Image src={img} alt={`${product.name} ${index + 1}`} fill style={{ objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div style={styles.infoSection}>
              <span style={styles.category}>{product.category}</span>
              <h1 style={styles.name}>{product.name}</h1>
              <p style={styles.price}>${product.price}</p>
              <p style={styles.description}>{product.description}</p>

              {product.in_stock ? (
                <span style={styles.inStock}>✓ In Stock</span>
              ) : (
                <span style={styles.outOfStock}>✕ Out of Stock</span>
              )}

              <div style={styles.quantityRow}>
                <label style={styles.label}>Quantity</label>
                <div style={styles.quantityControls}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={styles.qtyBtn}
                  >
                    −
                  </button>
                  <span style={styles.qtyValue}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={styles.qtyBtn}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                style={styles.addToCartBtn}
                disabled={!product.in_stock}
              >
                {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
              </button>

              {message && (
                <div style={styles.message}>{message}</div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    background: 'var(--background)',
    paddingTop: '100px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  backLink: {
    color: '#6366f1',
    textDecoration: 'none',
    fontSize: '0.9rem',
    display: 'inline-block',
    marginBottom: '2rem',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
  },
  imagesSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  mainImage: {
    position: 'relative',
    aspectRatio: '3/4',
    background: '#f8fafc',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  thumbnailRow: {
    display: 'flex',
    gap: '0.75rem',
  },
  thumbnail: {
    position: 'relative',
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    background: '#f8fafc',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  category: {
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#6b7280',
  },
  name: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#1a1a1a',
    lineHeight: 1.2,
  },
  price: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#1a1a1a',
  },
  description: {
    fontSize: '1rem',
    color: '#6b7280',
    lineHeight: 1.7,
  },
  inStock: {
    color: '#16a34a',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  outOfStock: {
    color: '#dc2626',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  quantityRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#1a1a1a',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  qtyBtn: {
    width: '40px',
    height: '40px',
    background: '#f8fafc',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1a1a1a',
  },
  qtyValue: {
    width: '50px',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '1rem',
  },
  addToCartBtn: {
    padding: '1rem 2rem',
    background: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginTop: '0.5rem',
    transition: 'all 0.2s',
  },
  message: {
    background: '#ecfdf5',
    color: '#059669',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    textAlign: 'center',
  },
  loading: {
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  },
};

// Responsive
if (typeof window !== 'undefined') {
  const mq = window.matchMedia('(max-width: 768px)');
  if (mq.matches) {
    styles.productGrid = { ...styles.productGrid, gridTemplateColumns: '1fr', gap: '2rem' };
    styles.name = { ...styles.name, fontSize: '1.5rem' };
    styles.price = { ...styles.price, fontSize: '1.4rem' };
  }
}