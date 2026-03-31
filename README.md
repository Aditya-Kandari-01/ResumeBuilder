# ResumeBuilder (Backend)

A Node.js and Express backend for the ResumeBuilder project. It provides user authentication with JWT, password hashing, cookie-based token storage, and token blacklisting on logout.

## Features

- User registration with hashed passwords
- User login with JWT token generation
- User logout with token blacklisting
- MongoDB connection using Mongoose
- Cookie-based token handling
- Organized MVC-style structure

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- cookie-parser
- dotenv

## Folder Structure

```bash
backend/
├── src/
│   └── app.js
├── config/
│   └── db.js
├── controllers/
│   └── authController.js
├── models/
│   ├── userModel.js
│   └── blackListModel.js
├── routes/
│   └── auth.js
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```


## Environment Variables

Create a `.env` file inside the `backend` folder and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Running the Server

Start the server with:

```bash
npm start
```

If you are using nodemon, make sure your `package.json` contains a start script like:

```json
"scripts": {
  "start": "nodemon server.js"
}
```

## API Endpoints

### Register User
**POST** `/api/auth/register`

Request body:
```json
{
  "username": "aditya",
  "email": "aditya@example.com",
  "password": "123456"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "userDetails": {
    "id": "user_id",
    "username": "aditya",
    "email": "aditya@example.com"
  }
}
```

### Login User
**POST** `/api/auth/login`

Request body:
```json
{
  "email": "aditya@example.com",
  "password": "123456"
}
```

Response:
```json
{
  "message": "user loggedIn successfully",
  "user": {
    "id": "user_id",
    "username": "aditya",
    "email": "aditya@example.com"
  }
}
```

### Logout User
**GET** `/api/auth/logout`

Response:
```json
{
  "message": "User logged out successfully"
}
```

## Authentication Flow

- On registration, the password is hashed with `bcryptjs`
- A JWT token is created using `jsonwebtoken`
- The token is stored in a cookie named `token`
- On logout, the token is saved in the blacklist collection on mongodb and the cookie is cleared

## Example Improvements

- Add input validation for email and password strength
- Add centralized error handling middleware
- Add protected routes using JWT verification
- Add token expiry/refresh handling

