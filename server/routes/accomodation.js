import express from 'express';
import Accomodation from '../models/Accomodation.js';

const router = express.Router();

// Get all accomodations
router.get('/', async (req, res) => {
  try {
    const accomodations = await Accomodation.find();
    res.json(accomodations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new accomodation
router.post('/', async (req, res) => {
  try {
    const {
      location,
      category,
      imageUrl,
      priceRange,
      rating,
      reviews,
      title,
      description,
      tags,
      uniqueFeatures,
      whatsapp,
      bookingLink
    } = req.body;
    const newAcc = new Accomodation({
      location,
      category,
      imageUrl,
      priceRange,
      rating,
      reviews,
      title,
      description,
      tags,
      uniqueFeatures,
      whatsapp,
      bookingLink
    });
    await newAcc.save();
    res.status(201).json(newAcc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
