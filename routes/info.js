const express = require('express');
const router = express.Router();

/**
 * @desc   Get personal details from environment variables
 * @route  GET /api/info
 * @access Public (change to protected if needed)
 */
router.get('/', (req, res) => {
  const personalInfo = {
    name: process.env.PERSON_NAME,
    email: process.env.EMAIL,
    mobile: process.env.PERSON_MOBILE,
    address: process.env.PERSON_ADDRESS,
    website: process.env.PERSON_WEBSITE,
  };

  // Remove undefined values (in case any variable is missing)
  Object.keys(personalInfo).forEach(
    (key) => personalInfo[key] === undefined && delete personalInfo[key]
  );

  res.json(personalInfo);
});

module.exports = router;