import mongoose from 'mongoose';

const accomodationSchema = new mongoose.Schema({
  location: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  priceRange: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  uniqueFeatures: [{ type: String }],
  whatsapp: { type: String, required: true },
  bookingLink: { type: String }
}, { timestamps: true });

export default mongoose.model('Accomodation', accomodationSchema);
