import express from 'express';
import Product from '../models/Product.js';
import { products as initialProducts } from '../../src/data/catalog.js';
import Marketing from '../models/Marketing.js';

const router = express.Router();

// Seed database endpoint (Admin use only)
router.get('/seed', async (req, res) => {
  try {
    await Product.deleteMany();
    await Product.insertMany(initialProducts);
    
    await Marketing.deleteMany();
    const globalMarketing = new Marketing({ configId: 'global' });
    await globalMarketing.save();

    res.json({ message: 'Database seeded successfully', productsCount: initialProducts.length });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update product stock status
router.put('/:id/stock', async (req, res) => {
  try {
    const { outOfStock, outOfStockSizes } = req.body;
    let product = await Product.findOne({ id: req.params.id });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (outOfStock !== undefined) product.outOfStock = outOfStock;
    if (outOfStockSizes !== undefined) product.outOfStockSizes = outOfStockSizes;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a new product
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
