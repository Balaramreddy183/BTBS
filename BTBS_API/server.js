require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/database');
const bookingsRoutes = require('./routes/bookings.routes');
const boardingRoutes = require('./routes/boarding.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - simple and clean
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Routes
app.use('/api/bookings', bookingsRoutes);
app.use('/api/boarding', boardingRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'BTBS API is running' });
});

// Start server
async function startServer() {
    await connectDatabase();

    app.listen(PORT, () => {
        console.log(`✓ Server running on http://localhost:${PORT}`);
    });
}

startServer();
