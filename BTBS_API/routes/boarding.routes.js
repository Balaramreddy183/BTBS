const express = require('express');
const router = express.Router();
const boardingController = require('../controllers/boarding.controller');

// Descriptive route name
router.get('/getBoardingSequence', boardingController.getBoardingSequence);

module.exports = router;
