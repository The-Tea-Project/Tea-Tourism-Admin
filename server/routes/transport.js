import express from 'express';
import Transport from '../models/Transport.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

// Get all transport experiences
router.get('/', requireAuth, async (req, res) => {
  try {
    const transports = await Transport.find();
    res.json(transports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new transport experience
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, category, imageUrl, priceRange, rating, reviews, description, keyFeatures, departureInfo, bookingLink } = req.body;
    const newTransport = new Transport({ title, category, imageUrl, priceRange, rating, reviews, description, keyFeatures, departureInfo, bookingLink });
    await newTransport.save();
    res.status(201).json(newTransport);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete transport experience by id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const deleted = await Transport.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
