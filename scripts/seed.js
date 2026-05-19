// scripts/seed.js
import mongoose from 'mongoose';
import Product from '../lib/models/Product.js';
import User from '../lib/models/User.js';

// استخدم الرابط المحلي
const MONGODB_URI = 'mongodb://127.0.0.1:27017/aure';

const products = [
  {
    name: 'AURÉ PRO',
    description: 'Zara black t-shirt.',
    price: 70,
    category: 'ZARA',
    image: '/images/shop/p1.jpg',
  },
  {
    name: 'AURÉ SET',
    description: 'Complete outfit for simple outings.',
    price: 110,
    category: 'ZARA',
    image: '/images/shop/p2.jpg',
  },
  {
    name: 'AURÉ X',
    description: 'The shoe walks for you.',
    price: 90,
    category: 'NIKE',
    image: '/images/shop/p3.jpg',
  },
  {
    name: 'AURÉ MINI',
    description: 'Compact exploration kit.',
    price: 70,
    category: 'NIKE',
    image: '/images/shop/p4.jpg',
  },
  {
    name: 'AURÉ ELITE',
    description: 'Elite expedition gear for professional explorers.',
    price: 140,
    category: 'DOM HILL',
    image: '/images/shop/p6.jpg',
  },
  {
    name: 'AURÉ STREET',
    description: 'Street-ready exploration equipment.',
    price: 130,
    category: 'DOM HILL',
    image: '/images/shop/p5.jpg',
  },
];

const users = [
  {
    username: 'admin',
    email: 'admin@aure.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    username: 'user',
    email: 'user@aure.com',
    password: 'user123',
    role: 'user',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️ Old data cleared');

    // إضافة المنتجات
    const insertedProducts = await Product.insertMany(products);
    console.log(`📦 ${insertedProducts.length} products added`);

    // إضافة المستخدمين - مع تشفير الباسورد
    for (const user of users) {
      const newUser = await User.create({
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
      });
      console.log(`👤 User created: ${newUser.username} (${newUser.role})`);
    }

    console.log('\n🎉 Seed completed!');
    console.log('Admin: admin@aure.com / admin123');
    console.log('User: user@aure.com / user123');
    
  } catch (error) {
    console.error('❌ Seed error:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();