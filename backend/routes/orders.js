import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Get all orders (Admin only eventually)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('user', ['name', 'email']);
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { user, items, totalAmount, shippingAddress, paymentMethod } = req.body;

    const newOrder = new Order({
      user,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update order status (Admin)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    let order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;

    // Phase 4: Mock Shipping Integration
    // If the admin marks the order as 'Shipped', automatically generate a tracking URL (mocking Shiprocket API)
    if (status === 'Shipped' && !order.trackingUrl) {
      const mockTrackingId = 'SR' + Math.floor(Math.random() * 100000000);
      order.trackingUrl = `https://shiprocket.co/tracking/${mockTrackingId}`;
    }

    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
