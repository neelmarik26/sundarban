const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');
const { protect, admin } = require('../middleware/auth');

const imagePath = (image) => image && image.startsWith('/album/') ? image : '/album/sundarban-river.jpg';
const cleanTour = (body) => ({
  title: body.title,
  duration: body.duration,
  price: Number(body.price),
  description: body.description,
  highlights: Array.isArray(body.highlights) ? body.highlights.filter(Boolean) : String(body.highlights || '').split(',').map((item) => item.trim()).filter(Boolean),
  image: imagePath(body.image),
  active: body.active !== false
});

router.get('/', async (req, res) => {
  try { res.json(await Tour.find({ active: true }).sort({ createdAt: -1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
});

router.get('/admin/all', protect, admin, async (req, res) => {
  try { res.json(await Tour.find().sort({ createdAt: -1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/', protect, admin, async (req, res) => {
  try { res.status(201).json(await Tour.create(cleanTour(req.body))); }
  catch (error) { res.status(400).json({ message: error.message }); }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, cleanTour(req.body), { returnDocument: 'after', runValidators: true });
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (error) { res.status(400).json({ message: error.message }); }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json({ message: 'Tour deleted' });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;
