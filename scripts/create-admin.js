require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function createAdmin() {
  const { MONGODB_URI, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!MONGODB_URI || !ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error('Set MONGODB_URI, ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in .env before running this command.');
  }
  await mongoose.connect(MONGODB_URI);
  let user = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() }).select('+password');
  if (user) {
    user.name = ADMIN_NAME;
    user.role = 'admin';
    if (ADMIN_PASSWORD) user.password = ADMIN_PASSWORD;
    await user.save();
    console.log(`Promoted existing user ${user.email} to admin.`);
  } else {
    user = await User.create({ name: ADMIN_NAME, email: ADMIN_EMAIL, password: ADMIN_PASSWORD, role: 'admin' });
    console.log(`Created admin ${user.email}.`);
  }
  await mongoose.disconnect();
}

createAdmin().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});
