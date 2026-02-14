const boardingService = require('../services/boarding.service');

/**
 * Controller to handle boarding API requests
 */
async function getBoardingSequence(req, res) {
    try {
        const { travelDate } = req.query;

        // 1. Validate Parameter
        if (!travelDate) {
            return res.status(400).json({ message: 'Missing required query parameter: travelDate' });
        }

        // Simple date format validation (YYYY-MM-DD)
        if (isNaN(Date.parse(travelDate))) {
            return res.status(400).json({ message: 'Invalid travelDate format. Expected YYYY-MM-DD.' });
        }

        // 2. Call Service
        const sequence = await boardingService.getBoardingSequence(travelDate);

        // 3. Return Response
        res.status(200).json(sequence);

    } catch (error) {
        // 4. Handle Errors
        res.status(500).json({
            message: 'Internal Server Error processing boarding sequence',
            error: error.message
        });
    }
}

module.exports = {
    getBoardingSequence
};
