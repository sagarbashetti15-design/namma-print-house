import mongoose from 'mongoose';

const MarketingSchema = new mongoose.Schema({
  configId: { type: String, required: true, unique: true, default: 'global' },
  activeCampaign: { type: String, default: 'none' },
  activePromo: { type: String, default: 'none' },
  activeDiscount: { type: String, default: 'none' }
}, { timestamps: true });

export default mongoose.model('Marketing', MarketingSchema);
