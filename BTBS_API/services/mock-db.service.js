// In-memory storage for development when MongoDB is not available
let bookings = [];

const MockDB = {
    // Get all bookings
    getAllBookings: async () => {
        return [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    // Get bookings for boarding (by date)
    getBoardingBookings: async (date) => {
        const targetDate = new Date(date).toDateString();
        return bookings.filter(b =>
            new Date(b.travelDate).toDateString() === targetDate
        ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    // Get booking by ID
    getBookingById: async (id) => {
        return bookings.find(b => b.id === id) || null;
    },

    // Create new booking
    createBooking: async (bookingData) => {
        const booking = {
            ...bookingData,
            boarded: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        bookings.push(booking);
        return booking;
    },

    // Update booking
    updateBooking: async (id, updateData) => {
        const index = bookings.findIndex(b => b.id === id);
        if (index === -1) return null;

        bookings[index] = { ...bookings[index], ...updateData, updatedAt: new Date() };
        return bookings[index];
    },

    // Update boarding status
    updateBoardingStatus: async (id, boarded) => {
        const index = bookings.findIndex(b => b.id === id);
        if (index === -1) return null;

        bookings[index].boarded = boarded;
        bookings[index].updatedAt = new Date();
        return bookings[index];
    },

    // Delete booking
    deleteBooking: async (id) => {
        const index = bookings.findIndex(b => b.id === id);
        if (index === -1) return null;

        const deleted = bookings[index];
        bookings.splice(index, 1);
        return deleted;
    }
};

module.exports = MockDB;
