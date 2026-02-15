# Bus Ticket Booking System (BTBS)

## Project Summary
A full-stack web application for booking bus tickets and managing boarding sequences. Built with **Angular 19** (Frontend) and **Node.js/Express** (Backend), using **MongoDB** for data persistence. The system features a responsive 2x2 seat selection interface, real-time booking updates, and an optimal wise boarding algorithm to minimize boarding time.

## Technology Stack
-   **Frontend**: Angular 19, Tailwind CSS, PrimeNG, Lucide Icons.
-   **Backend**: Node.js, Express.js.
-   **Database**: MongoDB (Mongoose ODM).

## Features
1.  **Booking Interface**:
    -   Visual 2x2 seat layout with 15 rows (Max 6 seats/booking).
    -   Real-time seat availability and pricing (Window seat surcharge).
    -   Mobile-responsive design.
2.  **Boarding Management**:
    -   **Optimal Boarding Algorithm**: Sorts passengers from the farthest row to the nearest to minimize blocking.
    -   Track boarded/pending status.
    -   One-click dial to passenger mobile.
3.  **Code Quality**:
    -   Modular architecture (Facade pattern, Separation of concerns).
    -   Efficient data handling with pre-compiled regex for sorting.
    -   Standard REST API status codes and validation.

## Boarding Algorithm Explanation
**Problem**: Passengers blocking the aisle while settling in seats (60s delay).
**Solution**: The system implements a **Farthest-First Boarding Strategy**.
-   Passengers are sorted based on their row number in descending order (Back rows first).
-   **Logic**: A passenger settling in Row 15 does not block a passenger trying to reach Row 1.
-   **Result**: Blocks are eliminated (Time = 0s overhead), minimizing total boarding time.

## Setup & Execution Steps

### Prerequisites
-   Node.js (v18+)
-   MongoDB (Running locally or Atlas URI)
-   Angular CLI (`npm install -g @angular/cli`)

### 1. Backend Setup
1.  Navigate to the API directory:
    ```bash
    cd BTBS_API
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment:
    -   Create a `.env` file in `BTBS_API` (if not present) with:
        ```env
        PORT=3000
        MONGODB_URI=mongodb://localhost:27017/btbs_db
        CORS_ORIGIN=http://localhost:4200
        ```
4.  Start the server:
    ```bash
    node server.js
    ```
    *Server should run on http://localhost:3000*

### 2. Frontend Setup
1.  Navigate to the Web directory:
    ```bash
    cd BTBS_WEB
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the application:
    ```bash
    ng serve
    ```
4.  Open browser at: `http://localhost:4200`

Github Link: https://github.com/Balaramreddy183/BTBS