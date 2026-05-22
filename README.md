# Authentication API

A secure authentication system built with Node.js, Express, MongoDB, and JWT.

## Features

✅ User registration with password hashing (bcrypt)  
✅ User login with JWT token generation  
✅ Protected routes with middleware  
✅ MongoDB database with Mongoose  

## Tech Stack

- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcrypt
- **Testing:** Postman

## API Endpoints

| Route | Method | Description | Auth Required |
|-------|--------|-------------|---------------|
| `/api/auth/register` | POST | Register new user | No |
| `/api/auth/login` | POST | Login user | No |
| `/api/users/me` | GET | Get current user profile | Yes |

## Setup

1. Clone the repo
2. Install dependencies: `npm install`
3. Create `.env` file with:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
4. Run server: `node server.js`

## Author

Mohammed - [GitHub](https://github.com/TennciMohammed)