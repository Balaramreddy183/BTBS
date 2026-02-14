const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    seats: {
        type: [String],
        required: true
    },
    travelDate: {
        type: Date,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    boarded: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt
});

module.exports = mongoose.model('Booking', bookingSchema);
