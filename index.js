const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./models/db');
const cookieParser = require('cookie-parser');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

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

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/info', infoRoutes);

// Route to render the mainpage.ejs on localhost:3000/
app.get('/', (req, res) => {
    res.render('mainpage', {
        title: 'Sundarban Nova Travels | Luxury Sundarban Tour Packages from Kolkata | Tiger Safari'
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