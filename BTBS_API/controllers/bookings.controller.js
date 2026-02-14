const mongoose = require('mongoose');
const Booking = require('../models/booking.model');
const MockDB = require('../services/mock-db.service');

// Helper to check if MongoDB is connected
const isConnected = () => mongoose.connection.readyState === 1;

// Get all bookings
async function getAllBookings(req, res) {
    try {
        if (isConnected()) {
            const bookings = await Booking.find().sort({ createdAt: -1 });
            res.json(bookings);
        } else {
            const bookings = await MockDB.getAllBookings();
            res.json(bookings);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
}

// Get bookings for boarding (by date)
async function getBoardingBookings(req, res) {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ message: 'Date parameter is required' });
        }

        if (isConnected()) {
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);

            const bookings = await Booking.find({
                travelDate: { $gte: startDate, $lte: endDate }
            }).sort({ createdAt: -1 });

            res.json(bookings);
        } else {
            const bookings = await MockDB.getBoardingBookings(date);
            res.json(bookings);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching boarding bookings', error: error.message });
    }
}

// Get booking by ID
async function getBookingById(req, res) {
    try {
        if (isConnected()) {
            const booking = await Booking.findOne({ id: req.params.id });
            if (!booking) return res.status(404).json({ message: 'Booking not found' });
            res.json(booking);
        } else {
            const booking = await MockDB.getBookingById(req.params.id);
            if (!booking) return res.status(404).json({ message: 'Booking not found' });
            res.json(booking);
        }
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

        if (isConnected()) {
            const existingBooking = await Booking.findOne({ id });
            if (existingBooking) return res.status(400).json({ message: 'Booking ID already exists' });

            const booking = new Booking({
                id, seats, travelDate, mobileNumber, boarded: false
            });
            await booking.save();
            res.status(201).json(booking);
        } else {
            const existingBooking = await MockDB.getBookingById(id);
            if (existingBooking) return res.status(400).json({ message: 'Booking ID already exists' });

            const booking = await MockDB.createBooking(req.body);
            res.status(201).json(booking);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
}

// Update booking
async function updateBooking(req, res) {
    try {
        if (isConnected()) {
            const booking = await Booking.findOneAndUpdate(
                { id: req.params.id }, req.body, { new: true, runValidators: true }
            );
            if (!booking) return res.status(404).json({ message: 'Booking not found' });
            res.json(booking);
        } else {
            const booking = await MockDB.updateBooking(req.params.id, req.body);
            if (!booking) return res.status(404).json({ message: 'Booking not found' });
            res.json(booking);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error: error.message });
    }
}

// Update boarding status
async function updateBoardingStatus(req, res) {
    try {
        const { boarded } = req.body;

        if (isConnected()) {
            const booking = await Booking.findOneAndUpdate(
                { id: req.params.id }, { boarded }, { new: true }
            );
            if (!booking) return res.status(404).json({ message: 'Booking not found' });
            res.json(booking);
        } else {
            const booking = await MockDB.updateBoardingStatus(req.params.id, boarded);
            if (!booking) return res.status(404).json({ message: 'Booking not found' });
            res.json(booking);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating boarding status', error: error.message });
    }
}

// Delete booking
async function deleteBooking(req, res) {
    try {
        if (isConnected()) {
            const booking = await Booking.findOneAndDelete({ id: req.params.id });
            if (!booking) return res.status(404).json({ message: 'Booking not found' });
            res.json({ message: 'Booking deleted successfully' });
        } else {
            const booking = await MockDB.deleteBooking(req.params.id);
            if (!booking) return res.status(404).json({ message: 'Booking not found' });
            res.json({ message: 'Booking deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error: error.message });
    }
}

module.exports = {
    getAllBookings,
    getBoardingBookings,
    getBookingById,
    createBooking,
    updateBooking,
    updateBoardingStatus,
    deleteBooking
};
