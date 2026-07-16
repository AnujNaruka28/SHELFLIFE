# ShelfLife Server API

![Node.js](https://img.shields.io/badge/Node.js-24.14.1-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.0-blue?logo=typescript)
![Express](https://img.shields.io/badge/Express-5.2.1-white?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-9.7.3-green?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-9.0.3-red)

A RESTful API server for ShelfLife - a food inventory management system that helps users track items, reduce waste, and save money.

## 🚀 Tech Stack

- **Runtime**: Node.js 24.14.1
- **Language**: TypeScript 5.6.0
- **Framework**: Express 5.2.1
- **Database**: MongoDB 9.7.3 with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Security**: Helmet, CORS, Express Rate Limiter
- **File Storage**: Cloudinary
- **Email**: Resend
- **Validation**: Zod 4.4.3
- **API Documentation**: Swagger UI (swagger-ui-express)
- **Password Hashing**: bcryptjs 3.0.3
- **OTP Generation**: otp-generator 4.0.1

## 📋 Prerequisites

- Node.js 24.14.1 or higher
- MongoDB instance (local or cloud)
- Cloudinary account (for image uploads)
- Resend API key (for email services)

## 🔧 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Copy .env.example to .env and fill in the required values
```

## 🏃 Running the Server

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The server runs on port 4000 by default (configurable via `PORT` environment variable).

## 📚 API Documentation

Interactive API documentation is available at:
```
http://localhost:4000/docs
```

## 🔐 Authentication

Most endpoints require JWT authentication. Include the token in the `Authorization` header:
```
Authorization: Bearer <your-jwt-token>
```

## 🛣️ API Endpoints

### Authentication

#### `POST /api/v1/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt-token",
    "user": { ... }
  }
}
```

#### `POST /api/v1/auth/register`
Register a new user with OTP verification.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "otp": 123456
}
```

#### `POST /api/v1/auth/otp`
Generate and send OTP for email verification.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

### Households

#### `POST /api/v1/households`
Create a new household (requires authentication).

**Request Body:**
```json
{
  "name": "My Household"
}
```

#### `POST /api/v1/households/join`
Join an existing household using invite code (requires authentication).

**Request Body:**
```json
{
  "inviteCode": "ABC123"
}
```

#### `POST /api/v1/households/leave`
Leave the current household (requires authentication).

#### `GET /api/v1/households/me`
Get the authenticated user's household (requires authentication).

#### `GET /api/v1/households/:id/members`
Get all members of a specific household (requires authentication).

### Items

#### `GET /api/v1/items`
Get items with optional filtering and pagination (requires authentication).

**Query Parameters:**
- `category` (optional): Filter by category
- `status` (optional): Filter by status (fresh, expiring-soon, expired, used, wasted)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

#### `POST /api/v1/items`
Create a new item (requires authentication).

**Request Body:**
```json
{
  "name": "Milk",
  "quantity": 2,
  "category": "Dairy",
  "expiryDate": "2024-12-31T23:59:59Z"
}
```

#### `PUT /api/v1/items/:id`
Update an existing item (requires authentication, only by creator).

**Request Body:**
```json
{
  "name": "Milk",
  "quantity": 1,
  "category": "Dairy",
  "expiryDate": "2024-12-31T23:59:59Z"
}
```

#### `DELETE /api/v1/items/:id`
Delete an item (requires authentication, only by creator).

#### `PATCH /api/v1/items/:id/status`
Update item status to used or wasted (requires authentication, only by creator).

**Request Body:**
```json
{
  "status": "used"
}
```

### Dashboard

#### `GET /api/v1/dashboard/stats`
Get dashboard statistics for the user's household (requires authentication).

**Response:**
```json
{
  "success": true,
  "message": "Stats fetched successfully",
  "data": {
    "totalItems": 50,
    "wasteScore": 12.5,
    "fresh": 30,
    "expiring": 8,
    "expired": 5,
    "wasted": 4,
    "used": 3
  }
}
```

#### `GET /api/v1/dashboard/expiring`
Get items expiring in the next 24 hours (requires authentication).

### Profile

#### `PUT /api/v1/change-profile`
Upload and update user profile picture (requires authentication).

**Request:** Multipart form data with `profileImage` file.

#### `DELETE /api/v1/delete-profile`
Delete user profile picture and revert to default (requires authentication).

## 🔒 Security Features

- **Helmet**: HTTP security headers
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: 30-day token expiration
- **Input Validation**: Zod schemas for all endpoints
- **Authorization**: Role-based access control for item modifications

## 📧 Email Services

Email notifications are sent using Resend for:
- OTP verification during registration
- Daily digest of expiring items

## 🖼️ Image Upload

Profile pictures are uploaded to Cloudinary with:
- Automatic resizing (24x24px)
- Folder organization
- Public URL generation

## 🧪 Testing

Test cases are documented in `tests/all-test-cases.txt` covering:
- Authentication edge cases
- Household management scenarios
- Item CRUD operations
- Authorization checks
- Error handling

## 🗄️ Database Models

- **User**: name, email, password, householdId, profileImage
- **Household**: name, inviteCode, members
- **Item**: name, quantity, category, expiryDate, status, householdId, addedBy, updatedBy
- **OTP**: email, otp, createdAt

## 🔄 Cron Jobs

- **daily-itemstatus-cron**: Updates item statuses based on expiry dates
- **daily-mail-cron**: Sends daily digest emails for expiring items
- **clean-expired-items-cron**: Cleans up expired items

## 📝 Environment Variables

Required environment variables:
- `PORT`: Server port (default: 4000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `RESEND_API_KEY`: Resend API key for emails
- `ORIGIN`: CORS allowed origin
- `NODE_ENV`: Environment (development/production)

## 🚦 Health Check

```
GET /health-check
```

Returns server health status.

## 📄 License

This project is private and proprietary.

## 👥 Contact

For support or questions, contact: shelflife.eco@gmail.com
