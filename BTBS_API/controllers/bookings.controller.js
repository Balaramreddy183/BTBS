const Booking = require('../models/booking.model');

// Get all bookings
async function getAllBookings(req, res) {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
}

// Get booking by ID
async function getBookingById(req, res) {
    try {
        const booking = await Booking.findOne({ id: req.params.id });
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking', error: error.message });
    }
}

// Create new booking
async function createBooking(req, res) {
    try {
        const { id, seats, travelDate, mobileNumber } = req.body;

        if (!id || !seats || !travelDate || !mobileNumber) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingBooking = await Booking.findOne({ id });
        if (existingBooking) return res.status(400).json({ message: 'Booking ID already exists' });

        const booking = new Booking({
            id, seats, travelDate, mobileNumber, boarded: false, totalAmount: req.body.totalAmount
        });
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
}

// Update booking
async function updateBooking(req, res) {
    try {
        const booking = await Booking.findOneAndUpdate(
            { id: req.params.id }, req.body, { new: true, runValidators: true }
        );
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error: error.message });
    }
}

// Update boarding status
async function updateBoardingStatus(req, res) {
    try {
        const { boarded } = req.body;
        const booking = await Booking.findOneAndUpdate(
            { id: req.params.id }, { boarded }, { new: true }
        );
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error updating boarding status', error: error.message });
    }
}

// Delete booking
async function deleteBooking(req, res) {
    try {
        const booking = await Booking.findOneAndDelete({ id: req.params.id });
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error: error.message });
    }
}

module.exports = {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    updateBoardingStatus,
    deleteBooking
};
