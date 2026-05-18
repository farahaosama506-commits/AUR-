// scripts/seed.js
import mongoose from 'mongoose';
import Product from '../lib/models/Product.js';

const products = [
  {
    name: 'AURÉ PRO',
    description: 'Zara black t-shirt.',
    price: 70,
    category: 'ZARA',
    image: '/images/shop/p1.jpg',
  },
  {
    name: 'AURÉ X',
    description: 'The shoe walks for you.',
    price: 90,
    category: 'NIKE',
    image: '/images/shop/p3.jpg',
  },
];

async function seed() {
  await mongoose.connect('mongodb://127.0.0.1:27017/aure');
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('✅ Products added!');
  process.exit(0);
}

seed();