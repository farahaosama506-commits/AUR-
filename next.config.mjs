// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // تحسين الصور
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    minimumCacheTTL: 86400,
  },
  
  // تحسين الأداء
  compress: true,
  
  // تعطيل الـ powered by header
  poweredByHeader: false,
  
  // تحسين الـ bundle
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;