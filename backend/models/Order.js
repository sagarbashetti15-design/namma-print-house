import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    productId: String,
    title: String,
    price: Number,
    quantity: Number,
    color: String,
    size: String,
    // Customization details for "Design Your Own"
    customization: {
      type: mongoose.Schema.Types.Mixed,
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  shippingAddress: {
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  paymentMethod: {
    type: String,
    default: 'Razorpay',
  },
  paymentStatus: {
    type: String,
    default: 'Pending',
  },
  trackingUrl: {
    type: String,
  }
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
