const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  customerName: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: 80
  },
  package: {
    type: String,
    required: [true, 'Please select a package']
  },
  pickup: {
    type: String,
    required: [true, 'Please select a pickup location']
  },
  travelDate: {
    type: Date,
    required: [true, 'Please provide a travel date']
  },
  numberOfPeople: {
    type: Number,
    required: [true, 'Please provide number of people'],
    min: [1, 'At least 1 person required']
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  specialRequests: {
    type: String,
    maxlength: [500, 'Special requests cannot exceed 500 characters']
  },
  contactPhone: {
    type: String,
    required: [true, 'Please provide a contact phone number']
  },
  contactEmail: {
    type: String,
    required: [true, 'Please provide a contact email']
  },
  marketingConsent: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

bookingSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Booking', bookingSchema);
