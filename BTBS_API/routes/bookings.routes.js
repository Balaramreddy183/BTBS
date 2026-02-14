const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings.controller');

// Descriptive route names
router.get('/getAllBookings', bookingsController.getAllBookings);
router.get('/getBoardingBookings', bookingsController.getBoardingBookings);
router.get('/getBookingById/:id', bookingsController.getBookingById);
router.post('/createBooking', bookingsController.createBooking);
router.put('/updateBooking/:id', bookingsController.updateBooking);
router.patch('/updateBoardingStatus/:id', bookingsController.updateBoardingStatus);
router.delete('/deleteBooking/:id', bookingsController.deleteBooking);

module.exports = router;
