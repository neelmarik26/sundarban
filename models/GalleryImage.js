const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  alt: { type: String, required: true, trim: true, maxlength: 140 },
  visible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
