# BTBS API

Simple REST API for Bus Ticket Booking System using Node.js, Express, and MongoDB.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install MongoDB**
   - Download and install MongoDB Community Edition from https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud) for free

3. **Start MongoDB** (if using local)
   ```bash
   mongod
   ```

4. **Configure Environment**
   - Edit `.env` file if needed
   - Default: MongoDB on `localhost:27017`, Server on port `3000`

5. **Start Server**
   ```bash
   npm run dev
   ```

## API Endpoints

Base URL: `http://localhost:3000/api/bookings`

- `GET /getAllBookings` - Get all bookings
- `GET /getBoardingBookings?date=2026-02-14` - Get bookings for specific date
- `GET /getBookingById/:id` - Get single booking
- `POST /createBooking` - Create new booking
- `PUT /updateBooking/:id` - Update booking
- `PATCH /updateBoardingStatus/:id` - Update boarding status
- `DELETE /deleteBooking/:id` - Delete booking

## Testing

Use Postman, Thunder Client, or curl to test endpoints.

### Example: Create Booking
```bash
POST http://localhost:3000/api/bookings/createBooking
Content-Type: application/json

{
  "id": "BKG001",
  "seats": ["A1", "A2"],
  "travelDate": "2026-02-14",
  "mobileNumber": "9876543210"
}
```
