const mongoose = require('mongoose');
const Booking = require('../models/booking.model');
const MockDB = require('./mock-db.service');
const sortBookingsByBoardingPriority = require('../utils/boardingAlgorithm');

// Helper to check if MongoDB is connected
const isConnected = () => mongoose.connection.readyState === 1;

/**
 * Service to handle boarding logic
 */
const boardingService = {
    /**
     * Get bookings sorted by optimal boarding sequence
     * @param {string} date - Travel date (YYYY-MM-DD)
     * @returns {Promise<Array>} - Sorted bookings with sequence numbers
     */
    async getBoardingSequence(date) {
        let bookings = [];

        // 1. Fetch bookings (Hybrid Strategy: Mongo or Mock)
        if (isConnected()) {
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);

            bookings = await Booking.find({
                travelDate: { $gte: startDate, $lte: endDate }
            }).lean(); // lean() for plain JS objects
        } else {
            bookings = await MockDB.getBoardingBookings(date);
        }

        if (!bookings || bookings.length === 0) {
            return [];
        }

        // 2. Apply Algorithm
        const sortedBookings = sortBookingsByBoardingPriority(bookings);

        // 3. Format Result with Sequence
        return sortedBookings.map((booking, index) => ({
            sequence: index + 1,
            bookingId: booking.id,
            seats: booking.seats,
            mobile: booking.mobileNumber
        }));
    }
};

module.exports = boardingService;
