// Pre-compile regex for performance
const SEAT_REGEX = /[A-Z](\d+)/;

/**
 * Utility function to sort bookings based on boarding priority.
 * Rule: Board from farthest (highest row number) to nearest (lowest row number).
 *
 * @param {Array} bookings - List of booking objects
 * @returns {Array} - Sorted bookings
 */
function sortBookingsByBoardingPriority(bookings) {
    if (!bookings || !Array.isArray(bookings) || bookings.length === 0) {
        return [];
    }

    // Helper to extract maximum row number from a list of seats
    const getMaxRow = (seats) => {
        if (!seats || seats.length === 0) return 0;

        let maxRow = 0;
        seats.forEach(seat => {
            // Extract numeric part from seat (e.g., "A1" -> 1, "B10" -> 10)
            const match = seat.match(SEAT_REGEX);
            if (match && match[1]) {
                const row = parseInt(match[1], 10);
                if (row > maxRow) {
                    maxRow = row;
                }
            }
        });
        return maxRow;
    };

    // Create a shallow copy to avoid mutating original array
    // Map to include maxRow for efficient sorting
    const mappedBookings = bookings.map((booking, index) => ({
        booking,
        maxRow: getMaxRow(booking.seats),
        originalIndex: index // Determine stability
    }));

    // Sort descending by maxRow
    mappedBookings.sort((a, b) => {
        if (b.maxRow !== a.maxRow) {
            return b.maxRow - a.maxRow; // Descending (Farthest first)
        }
        return a.originalIndex - b.originalIndex; // Stable sort for ties
    });

    // Extract sorted bookings
    return mappedBookings.map(item => item.booking);
}

module.exports = sortBookingsByBoardingPriority;
