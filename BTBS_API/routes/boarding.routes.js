const express = require('express');
const router = express.Router();
const boardingController = require('../controllers/boarding.controller');

// GET /api/boarding?travelDate=YYYY-MM-DD
router.get('/', boardingController.getBoardingSequence);

module.exports = router;
