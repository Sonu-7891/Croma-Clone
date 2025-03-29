# Croma Clone - Backend

This is the backend service for the Croma Clone e-commerce application built with Node.js, Express, and MongoDB.

## Features

- User Authentication (Register/Login)
- Product Management
- Shopping Cart Functionality
- Search and Filter Products
- Product Ratings and Reviews
- Admin Dashboard Access

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd croma-clone/backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/croma-clone
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

4. Start the development server:

```bash
npm run dev
```

The server will start running on `http://localhost:5000`

## Project Structure

```
backend/
├── models/
│   ├── user.model.js
│   ├── product.model.js
│   └── cart.model.js
├── routes/
│   ├── auth.routes.js
│   ├── product.routes.js
│   └── cart.routes.js
├── middleware/
│   └── auth.middleware.js
├── .env
├── package.json
└── server.js
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/profile` - Get user profile (Protected Route)

### Products

- `GET /api/products` - Get all products with filters

  - Query Parameters:
    - `search`: Search by product name, description, category, or brand
    - `category`: Filter by category
    - `brand`: Filter by brand
    - `minPrice`: Minimum price filter
    - `maxPrice`: Maximum price filter
    - `sortBy`: Sort by price-asc, price-desc, rating-desc, or newest
    - `page`: Page number for pagination
    - `limit`: Number of items per page

- `GET /api/products/:id` - Get single product details

- `POST /api/products` - Create new product (Admin Only)

  ```json
  {
    "name": "Product Name",
    "description": "Product Description",
    "price": 999.99,
    "category": "Electronics",
    "brand": "Brand Name",
    "image": "image-url",
    "stock": 100,
    "specifications": {
      "key": "value"
    }
  }
  ```

- `PUT /api/products/:id` - Update product (Admin Only)
- `DELETE /api/products/:id` - Delete product (Admin Only)
- `POST /api/products/:id/ratings` - Add product rating (Protected Route)

### Cart

- `GET /api/cart` - Get user's cart (Protected Route)
- `POST /api/cart/add` - Add item to cart (Protected Route)
  ```json
  {
    "productId": "product-id",
    "quantity": 1
  }
  ```
- `PUT /api/cart/update/:productId` - Update cart item quantity (Protected Route)
- `DELETE /api/cart/remove/:productId` - Remove item from cart (Protected Route)
- `DELETE /api/cart/clear` - Clear cart (Protected Route)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header for protected routes:

```
Authorization: Bearer <your-token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Development

To run the server in development mode with auto-reload:

```bash
npm run dev
```

## Production

To run the server in production mode:

```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
