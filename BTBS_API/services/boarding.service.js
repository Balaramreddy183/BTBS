const Booking = require('../models/booking.model');
const sortBookingsByBoardingPriority = require('../utils/boardingAlgorithm');

const boardingService = {
    /**
     * Get bookings sorted by optimal boarding sequence
     * @param {string} date - Travel date (YYYY-MM-DD)
     * @returns {Promise<Array>} - Sorted bookings with sequence numbers
     */
    async getBoardingSequence(date) {
        // 1. Fetch bookings from MongoDB
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const bookings = await Booking.find({
            travelDate: { $gte: startDate, $lte: endDate }
        }).lean();

        if (!bookings || bookings.length === 0) {
            return [];
        }

        // 2. Apply Algorithm
        const sortedBookings = sortBookingsByBoardingPriority(bookings);

        // 3. Format Result with Sequence
        // Return original booking properties + sequence
        return sortedBookings.map((booking, index) => ({
            ...booking, // Spread all booking fields (id, seats, boarded, mobileNumber etc)
            id: booking.id, // Explicitly ensure ID is present (sometimes _id vs id in Mongo)
            sequence: index + 1
        }));
    }
};

module.exports = boardingService;
