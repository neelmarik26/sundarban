const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  duration: { type: String, required: true, trim: true, maxlength: 40 },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true, trim: true, maxlength: 350 },
  highlights: [{ type: String, trim: true, maxlength: 60 }],
  image: { type: String, default: '/album/sundarban-river.jpg' },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Tour', tourSchema);
