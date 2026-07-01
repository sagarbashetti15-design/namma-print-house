import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  tag: { type: String },
  image: { type: String, required: true },
  images: [{ type: String }],
  sizes: [{ type: String }],
  description: { type: String },
  outOfStock: { type: Boolean, default: false },
  outOfStockSizes: [{ type: String }],
  colors: [{ type: String }],
  colorImages: {
    type: Map,
    of: String
  },
  isVisualCustomizer: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);
