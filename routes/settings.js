const express = require('express');
const router = express.Router();
const SiteSetting = require('../models/SiteSetting');
const { protect, admin } = require('../middleware/auth');

router.get('/', async (req, res) => { try { res.json(await SiteSetting.findOneAndUpdate({ key: 'homepage' }, {}, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true })); } catch (error) { res.status(500).json({ message: error.message }); } });
router.put('/', protect, admin, async (req, res) => { try { res.json(await SiteSetting.findOneAndUpdate({ key: 'homepage' }, { heroEyebrow: req.body.heroEyebrow, heroTitle: req.body.heroTitle, heroText: req.body.heroText }, { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true })); } catch (error) { res.status(400).json({ message: error.message }); } });

module.exports = router;
