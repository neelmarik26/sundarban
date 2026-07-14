const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./models/db');
const cookieParser = require('cookie-parser');
const Tour = require('./models/Tour');

// Load env vars
dotenv.config({ path: './.env' });

const starterTours = [
  { title: '1 Day - Day Cruise', duration: '12 hours', price: 1499, description: 'A relaxed day on the river with a guided boat safari and Bengali lunch.', highlights: ['Boat safari', 'Lunch', 'Local guide'] },
  { title: '2D / 1N - Classic Mangrove', duration: '2 days / 1 night', price: 3999, description: 'An overnight mangrove escape with stay, meals and two safaris.', highlights: ['Eco stay', 'All meals', '2 safaris'] },
  { title: '3D / 2N - Tiger Trail', duration: '3 days / 2 nights', price: 6499, description: 'More time on the waterways, watchtowers and village experiences.', highlights: ['Tiger zone', 'Canopy walk', 'Bonbibi visit'] },
  { title: '4D / 3N - Grand Expedition', duration: '4 days / 3 nights', price: 8999, description: 'A deeper Sundarban itinerary designed for unhurried exploration.', highlights: ['Netidhopani', 'Village walk', 'Sunrise cruise'] }
];

// Create a useful first catalogue without overwriting tours managed by the admin.
connectDB().then(async () => {
  if (await Tour.countDocuments() === 0) await Tour.insertMany(starterTours);
}).catch(() => {});

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Import routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const userRoutes = require('./routes/users');
const infoRoutes = require('./routes/info');
const tourRoutes = require('./routes/tours');
const adminRoutes = require('./routes/admin');
const reviewRoutes = require('./routes/reviews');
const mediaRoutes = require('./routes/media');
const settingsRoutes = require('./routes/settings');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/info', infoRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/settings', settingsRoutes);

// Route to render the mainpage.ejs on localhost:3000/
app.get('/', (req, res) => {
    res.render('mainpage', {
        title: 'Sundarban Nova Travels | Luxury Sundarban Tour Packages from Kolkata | Tiger Safari',
        companyPhone: process.env.PERSON_MOBILE || '+91 99079 47625',
        companyPhoneHref: (process.env.PERSON_MOBILE || '+919907947625').replace(/[^+\d]/g, '')
    });
});

// API health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Sundarban Nova Travels API is running' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/admin', (req, res) => res.render('admin', { title: 'Nova Travels | Admin' }));
