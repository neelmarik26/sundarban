const mongoose = require('mongoose');

const siteSettingSchema = new mongoose.Schema({
  key: { type: String, unique: true, default: 'homepage' },
  heroEyebrow: { type: String, default: 'UNESCO World Heritage | West Bengal | Since 2018', maxlength: 120 },
  heroTitle: { type: String, default: 'Discover the wild, tidal beauty of the Sundarbans.', maxlength: 160 },
  heroText: { type: String, default: 'Private and shared boat safaris, forest permits, Kolkata pickup, warm local hospitality, and memorable Bengali meals arranged end to end.', maxlength: 420 }
}, { timestamps: true });

module.exports = mongoose.model('SiteSetting', siteSettingSchema);
