const express = require('express');
const router = express.Router();
const boardingController = require('../controllers/boarding.controller');

router.get('/', boardingController.getBoardingSequence);

module.exports = router;
