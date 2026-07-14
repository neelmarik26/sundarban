const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const GalleryImage = require('../models/GalleryImage');
const { protect, admin } = require('../middleware/auth');

const uploadDir = path.join(__dirname, '..', 'public', 'album', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, done) => done(null, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${path.extname(file.originalname).toLowerCase()}`)
});
const imageUpload = multer({ storage, limits: { fileSize: 8 * 1024 * 1024 }, fileFilter: (req, file, done) => done(null, /^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)) });

router.get('/', async (req, res) => {
  try { res.json(await GalleryImage.find({ visible: true }).sort({ createdAt: -1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
});
router.get('/admin/all', protect, admin, async (req, res) => {
  try { res.json(await GalleryImage.find().sort({ createdAt: -1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
});
router.post('/upload', protect, admin, imageUpload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Choose a JPG, PNG, WebP, or GIF image up to 8 MB.' });
    const image = await GalleryImage.create({ path: `/album/uploads/${req.file.filename}`, alt: req.body.alt || 'Sundarban travel moment', visible: req.body.visible !== 'false' });
    res.status(201).json(image);
  } catch (error) { res.status(400).json({ message: error.message }); }
});
router.put('/:id', protect, admin, async (req, res) => {
  try { const image = await GalleryImage.findByIdAndUpdate(req.params.id, { alt: req.body.alt, visible: req.body.visible }, { returnDocument: 'after', runValidators: true }); if (!image) return res.status(404).json({ message: 'Image not found' }); res.json(image); }
  catch (error) { res.status(400).json({ message: error.message }); }
});
router.delete('/:id', protect, admin, async (req, res) => {
  try { const image = await GalleryImage.findByIdAndDelete(req.params.id); if (!image) return res.status(404).json({ message: 'Image not found' }); if (image.path.startsWith('/album/uploads/')) fs.unlink(path.join(__dirname, '..', 'public', image.path), () => {}); res.json({ message: 'Image deleted' }); }
  catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;
