# L'AURA Hotel Kiosk System

A modern self-service hotel kiosk application built using React Native, Express.js, and Supabase.

---

## Features

### Guest Check-In
- Guest registration
- Identity verification
- Reservation management

### Room Management
- Room selection
- Room availability
- Room extensions

### Payment Management
- Payment processing
- Transaction tracking

### Digital Key System
- Generate digital keys
- Update key validity
- Deactivate keys during checkout

### Visitor Management
- Visitor registration
- Visitor checkout

### Service Requests
- Housekeeping
- Maintenance
- Room service
- Emergency requests

### Feedback System
- Guest ratings
- Guest comments

### Checkout Management
- Checkout processing
- Key deactivation

---

## Tech Stack

### Frontend
- React Native
- Expo
- React Navigation

### Backend
- Node.js
- Express.js

### Database
- Supabase PostgreSQL

---

## Project Structure

```
hotel-kiosk-system
│
├── App.js
├── src
│   ├── screens
│   ├── components
│   ├── navigation
│   ├── context
│   └── translations
│
├── kiosk_backend
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   └── database
│   │
│   ├── server.js
│   └── package.json
```

---

## Backend APIs

### Guests
- POST /api/guests

### Reservations
- POST /api/reservations

### Rooms
- GET /api/rooms

### Payments
- POST /api/payments

### Digital Keys
- POST /api/digital-keys

### Extensions
- POST /api/extensions

### Feedback
- POST /api/feedback

### Service Requests
- POST /api/service-requests

### Visitors
- POST /api/visitors
- PUT /api/visitors/checkout

### Checkout
- PUT /api/checkout

---

## Installation

### Frontend

```bash
npm install
npx expo start
```

### Backend

```bash
cd kiosk_backend

npm install

npm run dev
```

---

## Environment Variables

Create:

```env
DATABASE_URL=your_supabase_connection_string
PORT=5000
```

---

## Future Improvements

- QR Code Digital Keys
- Admin Dashboard
- Staff Dashboard
- Real Payment Gateway Integration
- Analytics Dashboard
- Push Notifications

---

## Author

Manashvi Choksi

B.Tech Information Technology

CHARUSAT University