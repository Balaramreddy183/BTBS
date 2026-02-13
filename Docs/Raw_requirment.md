Design and implement a Bus Ticket Booking System for a Bus Conductor, focusing on:

Coding Quality & Optimization
Clean and readable code
Naming conventions
Proper documentation
Error handling
Efficient logic and data handling
Edge-case handling
Performance considerations
UI Expectations
UI/UX design
Visually clean and intuitive
Responsive across screen sizes
Proper validations and user feedback
Follows UI best practices
Screen 1: Book / Update / Edit Booking
Inputs
Travel Date
Mobile Number
Seat Selection
Seat Layout
2 × 2 seating arrangement
15 rows
You may refer to any existing bus booking app
You are free to make reasonable assumptions where required
Constraints
Maximum 6 seats can be booked per mobile number per day
Output
On successful booking, display a confirmation popup with:
Booking ID (system-generated)
Travel Date
Mobile Number
Selected Seats
Screen 2: Booking List & Boarding Tracking
Input
Travel Date
Output
A list of bookings with the following columns:
Sequence Number
Booking ID
Seat(s) Selected
Mobile Icon - On click, initiate a call to the registered mobile number
Action Button to mark whether the traveller has boarded the bus
Assumptions
A passenger takes 60 seconds to settle into their seat
While a passenger is settling, no one can cross past that seat
All passengers under the same Booking ID board together
Boarding happens only through the front gate
Walking time inside the bus is negligible
If multiple seats are booked together, all passengers enter as a group
Algorithm Requirement
Problem Statement: Write an algorithm that determines the optimal boarding sequence (Booking ID–wise) such that the total time taken for all passengers to board is minimized.

Example Input
Booking ID      Seat                 Mobile
111                  A1                    9999912345
222                  A7                    9999912346
333                  A15                  9999912347

Option 1: Non-Optimal Sequence – Total Time: 180 seconds
Sequence        Booking ID      Seat
1                      111                  A1
2                      222                  A7
3                      333                  A15

Explanation
Passenger at A1 blocks access to A7 and A15 for 60 seconds
Passenger at A7 blocks access to A15 for another 60 seconds
Total delay accumulates
Option 2: Optimal Sequence - Total Time: 60 seconds
Sequence        Booking ID      Seat
1                      111                  A15
2                      222                  A7
3                      333                  A1

Explanation
Passengers board from the farthest seat to the nearest
No blocking occurs
Overall boarding time is minimized
 