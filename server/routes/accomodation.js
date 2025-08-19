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
  brochureUrl
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
      brochureUrl
    });
    await newAcc.save();
    res.status(201).json(newAcc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Delete accomodation by id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Accomodation.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
