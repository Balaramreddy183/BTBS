# 🚌 Bus Ticket Booking System – Conductor App (MEAN Stack)

## 📌 Project Overview

Design and implement a **Bus Ticket Booking System** intended for a **Bus Conductor** to manage seat bookings and optimize passenger boarding time.

The system focuses on:
- Clean, readable, and optimized code
- Strong UI/UX
- Proper validations and error handling
- An algorithm to determine the **optimal boarding sequence** that minimizes total boarding time

---

## 🎯 Key Objectives

- Allow conductors to **book, update, and edit tickets**
- Visual **seat layout selection**
- Enforce booking constraints
- Display booking lists with boarding status
- Compute an **optimal boarding order** using a defined algorithm

---

## 🧱 Tech Stack (Recommended)

- **Frontend**: Angular
- **Backend**: Node.js + Express
- **Database**: MongoDB (or in-memory storage with persistence)
- **Architecture**: MEAN Stack
- **IDE**: VS Code
- **AI Assistance**: Codeium / Copilot (autocomplete only)

---

## 🖥 UI Requirements

### General UI Expectations
- Clean and intuitive design
- Responsive across screen sizes
- Clear validations and user feedback
- Proper error messages and success confirmations
- Follow standard UI/UX best practices

---

## 📘 Screen 1: Book / Update / Edit Booking

### Inputs
- **Travel Date**
- **Mobile Number**
- **Seat Selection (Visual Layout)**

### Seat Layout Specification
- 2 × 2 seating arrangement
- 15 rows
- Total seats: **60**
- Example seat numbering:
  - A1, B1 | C1, D1
  - ...
  - A15, B15 | C15, D15

> Seat numbering increases from **front to back** of the bus.

### Constraints
- A **maximum of 6 seats** can be booked per **mobile number per day**
- A seat cannot be double-booked for the same travel date

### Output
On successful booking, display a **confirmation popup** containing:
- Booking ID (system-generated)
- Travel Date
- Mobile Number
- Selected Seat(s)

---

## 📘 Screen 2: Booking List & Boarding Tracking

### Input
- **Travel Date**

### Output
A list of bookings with the following columns:
- Sequence Number (boarding order)
- Booking ID
- Seat(s) Selected
- 📞 Mobile Icon  
  - On click, initiate a call using the registered mobile number
- Boarding Action Button  
  - Toggle boarding status (Boarded / Not Boarded)

---

## ⚙️ Boarding Assumptions

The following assumptions **must be applied consistently**:

1. A passenger takes **60 seconds** to settle into their seat
2. While a passenger is settling, **no one can cross past that seat**
3. All passengers under the **same Booking ID board together**
4. Boarding happens **only through the front gate**
5. Walking time inside the bus is **negligible**
6. If multiple seats are booked together, all passengers **enter as a group**

---

## 🧠 Algorithm Requirement: Optimal Boarding Sequence

### Problem Statement
Determine the **optimal boarding sequence (Booking ID–wise)** such that the **total boarding time is minimized**.

---

### Example Input

| Booking ID | Seat  | Mobile       |
|----------|-------|--------------|
| 111      | A1    | 9999912345   |
| 222      | A7    | 9999912346   |
| 333      | A15   | 9999912347  |

---

### ❌ Option 1: Non-Optimal Sequence  
**Total Time: 180 seconds**

| Sequence | Booking ID | Seat |
|--------|------------|------|
| 1      | 111        | A1   |
| 2      | 222        | A7   |
| 3      | 333        | A15  |

**Explanation**
- Passenger at A1 blocks A7 and A15 for 60 seconds
- Passenger at A7 blocks A15 for another 60 seconds
- Total delay accumulates

---

### ✅ Option 2: Optimal Sequence  
**Total Time: 60 seconds**

| Sequence | Booking ID | Seat |
|--------|------------|------|
| 1      | 333        | A15  |
| 2      | 222        | A7   |
| 3      | 111        | A1   |

**Explanation**
- Passengers board from the **farthest seat to the nearest**
- No blocking occurs
- Overall boarding time is minimized

---

## 🧠 Algorithm Insight (Expected Logic)

- Determine the **maximum seat row number** per booking
- Sort bookings in **descending order of row number**
- Boarding sequence follows this sorted order

### Time Complexity
- O(n log n)

---

## 🗂 Suggested Project Structure

