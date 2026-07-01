import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { products } from '../src/data/catalog.js';
import Product from './models/Product.js';
import Marketing from './models/Marketing.js';

dotenv.config();

const seedDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) throw new Error('MONGO_URI is missing in .env');

    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for Seeding...');

    // Clear existing collections
    await Product.deleteMany();
    await Marketing.deleteMany();
    console.log('Cleared existing products and marketing config.');

    // Seed Products
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products.`);

    // Seed Marketing
    const globalMarketing = new Marketing({
      configId: 'global',
      activeCampaign: 'none',
      activePromo: 'none',
      activeDiscount: 'none'
    });
    await globalMarketing.save();
    console.log('Seeded global marketing configuration.');

    console.log('Database Seeding Complete!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
