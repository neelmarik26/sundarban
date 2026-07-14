const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const router = express.Router();
const Booking = require('../models/Booking');
const Tour = require('../models/Tour');
const { protect, admin } = require('../middleware/auth');
const emailUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

const transporter = () => {
  if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) throw new Error('Email is not configured. Add EMAIL and EMAIL_PASSWORD to .env.');
  return nodemailer.createTransport({ service: process.env.EMAIL_SERVICE || 'gmail', auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD } });
};

const websiteBaseUrl = (req) => {
  const configured = (process.env.PERSON_WEBSITE || '').trim().replace(/\/$/, '');
  if (configured && !/example\.com/i.test(configured)) return configured;
  return `${req.protocol}://${req.get('host')}`;
};

router.get('/dashboard', protect, admin, async (req, res) => {
  try {
    const [bookings, tours, leads] = await Promise.all([Booking.countDocuments(), Tour.countDocuments({ active: true }), Booking.distinct('contactEmail', { marketingConsent: true })]);
    res.json({ bookings, activeTours: tours, marketingLeads: leads.length });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.get('/completed-bookings', protect, admin, async (req, res) => {
  try { res.json(await Booking.find({ status: 'completed' }).sort({ updatedAt: -1 }).select('customerName contactEmail package travelDate marketingConsent')); }
  catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/email', protect, admin, emailUpload.single('attachment'), async (req, res) => {
  try {
    const { subject, message } = req.body;
    const emails = Array.isArray(req.body.emails) ? req.body.emails : (typeof req.body.emails === 'string' ? JSON.parse(req.body.emails) : undefined);
    if (!subject || !message) return res.status(400).json({ message: 'Subject and message are required.' });
    const recipients = Array.isArray(emails) && emails.length
      ? [...new Set(emails.map((email) => String(email).toLowerCase()))]
      : await Booking.distinct('contactEmail', { marketingConsent: true });
    if (!recipients.length) return res.status(400).json({ message: 'No opted-in recipients found.' });
    const mailer = transporter();
    const attachments = req.file ? [{ filename: req.file.originalname, content: req.file.buffer, contentType: req.file.mimetype }] : [];
    const results = await Promise.allSettled(recipients.map((to) => mailer.sendMail({ from: process.env.EMAIL, to, subject, text: message, attachments })));
    const sent = results.filter((result) => result.status === 'fulfilled').length;
    res.json({ sent, failed: results.length - sent, recipients: results.length });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/bookings/:id/review-invitation', protect, admin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });
    if (booking.status !== 'completed') return res.status(400).json({ message: 'Mark the trip completed before requesting a review.' });
    const siteUrl = websiteBaseUrl(req);
    const reviewUrl = `${siteUrl}/#reviews`;
    await transporter().sendMail({
      from: `Sundarban Nova Travels <${process.env.EMAIL}>`,
      to: booking.contactEmail,
      subject: 'How was your Sundarban journey?',
      text: `Hello ${booking.customerName},\n\nThank you for travelling with Sundarban Nova Travels. We hope you enjoyed your ${booking.package} trip.\n\nWould you take a minute to share your honest experience? Your review helps future travellers plan with confidence.\n\nLeave a review: ${reviewUrl}\n\nWarmly,\nSundarban Nova Travels`,
      html: `<div style="max-width:600px;margin:auto;padding:30px;background:#f3f8f4;font-family:Arial,sans-serif;color:#10201a"><div style="padding:25px;background:#0b6e4f;color:#fff;border-radius:18px 18px 0 0"><div style="font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase">Sundarban Nova Travels</div><h1 style="margin:10px 0 0;font-size:27px">How was your journey?</h1></div><div style="padding:28px;background:#fff;border-radius:0 0 18px 18px"><p>Hello ${booking.customerName},</p><p>Thank you for travelling with us on the <strong>${booking.package}</strong>. We would love to hear about your experience.</p><p>Your honest review helps future travellers plan with confidence.</p><p style="margin:28px 0"><a href="${reviewUrl}" style="display:inline-block;padding:13px 20px;border-radius:999px;background:#0b6e4f;color:#fff;text-decoration:none;font-weight:bold">Share your review</a></p><p>Warmly,<br><strong>Sundarban Nova Travels</strong></p></div></div>`
    });
    res.json({ message: 'Review invitation sent.' });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;
