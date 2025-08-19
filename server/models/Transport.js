import mongoose from 'mongoose';

const transportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  priceRange: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  description: { type: String, required: true },
  keyFeatures: [{ type: String }],
  departureInfo: { type: String, required: true },
  bookingLink: { type: String }
}, { timestamps: true });

export default mongoose.model('Transport', transportSchema);
