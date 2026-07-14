const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { protect, admin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try { res.json(await Review.find({ status: 'approved' }).sort({ createdAt: -1 }).limit(24).select('-email -status')); }
  catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, tour, rating, comment } = req.body;
    if (!name || !email || !comment || !Number.isInteger(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) return res.status(400).json({ message: 'Please complete your review and rating.' });
    const review = await Review.create({ name, email, tour, rating: Number(rating), comment });
    res.status(201).json({ message: 'Thank you. Your review is awaiting approval.', review: { id: review._id } });
  } catch (error) { res.status(400).json({ message: error.message }); }
});

router.get('/admin/all', protect, admin, async (req, res) => {
  try { res.json(await Review.find().sort({ createdAt: -1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
});

router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { status: req.body.status }, { returnDocument: 'after', runValidators: true });
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (error) { res.status(400).json({ message: error.message }); }
});

module.exports = router;
