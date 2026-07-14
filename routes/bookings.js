const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User');
const Tour = require('../models/Tour');
const { protect, admin } = require('../middleware/auth');
const nodemailer = require('nodemailer');

const escapeHtml = (value) => String(value || '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);

async function sendBookingConfirmation(booking) {
  if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) return;
  const companyName = process.env.PERSON_NAME || 'Sundarban Nova Travels';
  const companyPhone = process.env.PERSON_MOBILE || '+91 99079 47625';
  const transporter = nodemailer.createTransport({ service: process.env.EMAIL_SERVICE || 'gmail', auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD } });
  const date = new Intl.DateTimeFormat('en-IN', { dateStyle: 'long' }).format(new Date(booking.travelDate));
  await transporter.sendMail({
    from: `${companyName} <${process.env.EMAIL}>`,
    to: booking.contactEmail,
    subject: `Booking request received — ${booking.package}`,
    text: `Hello ${booking.customerName},\n\nYour booking request for ${booking.package} on ${date} has been received. Our team will contact you soon to confirm availability and next steps.\n\nGuests: ${booking.numberOfPeople}\nEstimated total: ₹${booking.totalPrice.toLocaleString('en-IN')}\n\nNeed help? Call us at ${companyPhone}.\n\n${companyName}`,
    html: `<div style="max-width:620px;margin:auto;background:#f4f8f4;padding:32px;font-family:Arial,sans-serif;color:#10201a"><div style="background:#0b6e4f;color:#fff;padding:26px;border-radius:18px 18px 0 0"><div style="font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">Sundarban Nova Travels</div><h1 style="margin:10px 0 0;font-size:28px">Your request is safely with us.</h1></div><div style="background:#fff;padding:30px;border-radius:0 0 18px 18px"><p>Hello ${escapeHtml(booking.customerName)},</p><p>Thank you for choosing us. Your booking request has been submitted successfully, and our team will contact you soon to confirm availability and the next steps.</p><div style="padding:18px;border-radius:12px;background:#edf7f0"><strong>${escapeHtml(booking.package)}</strong><br><span style="color:#567065">${date} · ${booking.numberOfPeople} guest${booking.numberOfPeople > 1 ? 's' : ''}</span><br><strong style="display:block;margin-top:8px">Estimated total: ₹${booking.totalPrice.toLocaleString('en-IN')}</strong></div><p style="margin-top:26px">Need help sooner? Call or WhatsApp us at <a style="color:#0b6e4f;font-weight:700" href="tel:${escapeHtml(companyPhone)}">${escapeHtml(companyPhone)}</a>.</p><p style="margin-bottom:0">Warmly,<br><strong>${escapeHtml(companyName)}</strong></p></div></div>`
  });
}

const createBooking = async (req, res, userId) => {
  const { customerName, package: packageName, pickup, travelDate, numberOfPeople, specialRequests, contactPhone, contactEmail, marketingConsent } = req.body;
  const tour = await Tour.findOne({ title: packageName, active: true });
  if (!tour) return res.status(400).json({ message: 'Please choose an available tour.' });
  const guests = Number(numberOfPeople);
  if (!customerName || !contactPhone || !contactEmail || !travelDate || !Number.isInteger(guests) || guests < 1) {
    return res.status(400).json({ message: 'Please complete all required booking fields.' });
  }
  const booking = await Booking.create({
    user: userId,
    customerName,
    package: tour.title,
    pickup,
    travelDate,
    numberOfPeople: guests,
    totalPrice: tour.price * guests,
    specialRequests,
    contactPhone,
    contactEmail: String(contactEmail).toLowerCase(),
    marketingConsent: marketingConsent === true || marketingConsent === 'true'
  });
  if (userId) await User.findByIdAndUpdate(userId, { $addToSet: { bookings: booking._id } });
  sendBookingConfirmation(booking).catch((error) => console.error('Booking confirmation email failed:', error.message));
  res.status(201).json(booking);
};

router.post('/public', async (req, res) => {
  try { await createBooking(req, res); }
  catch (error) { res.status(400).json({ message: error.message }); }
});

router.post('/', protect, async (req, res) => {
  try { await createBooking(req, res, req.user.id); }
  catch (error) { res.status(400).json({ message: error.message }); }
});

router.get('/', protect, async (req, res) => {
  try {
    // Completed trips remain stored for reporting and opted-in future campaigns,
    // but do not clutter the active customer-enquiry workspace.
    const query = req.user.role === 'admin' ? { status: { $ne: 'completed' } } : { user: req.user.id };
    res.json(await Booking.find(query).sort({ createdAt: -1 }).populate('user', 'name email phone'));
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { returnDocument: 'after', runValidators: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) { res.status(400).json({ message: error.message }); }
});

module.exports = router;
