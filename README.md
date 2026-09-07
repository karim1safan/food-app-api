<div align="center">

# Food App API

Backend API for a food delivery application built with Node.js, Express, MongoDB, and Mongoose.

</div>

## Introduction

Food App API provides the backend services for a food ordering platform. Users can create accounts, authenticate with JWT, browse restaurants, categories, and foods, and create and manage orders.

The project follows the **MVC (Model-View-Controller)** architecture. Since this is a REST API, the API responses act as the application output instead of server-rendered views.

## Features

- User registration and login
- JWT-based authentication
- User profile management
- Password update and password reset
- Restaurant management
- Food management
- Category management
- Order creation with server-side total calculation
- Order retrieval, update, and deletion
- Order status management for administrators
- MongoDB document relationships using Mongoose references
- JSON request and response format

## Technology Stack

- **Node.js** - JavaScript runtime
- **Express 5** - HTTP server and routing framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling and schema validation
- **JSON Web Token** - Authentication tokens
- **bcryptjs** - Password hashing
- **dotenv** - Environment variable loading
- **cors** - Cross-origin request support
- **helmet** - Security-related HTTP headers
- **morgan** - HTTP request logging
- **nodemon** - Development server restart utility

## Project Architecture

```text
food-app/
|-- config/
|   `-- db.js                  MongoDB connection
|-- controllers/               Request handling and business logic
|   |-- authController.js
|   |-- categoryController.js
|   |-- foodController.js
|   |-- orderController.js
|   |-- resturantController.js
|   |-- testController.js
|   `-- userController.js
|-- data/
|   `-- data.js                 Sample data
|-- middlewares/
|   |-- adminMiddleware.js      Admin authorization
|   `-- authMiddleware.js       JWT authentication
|-- models/                     Mongoose schemas and models
|   |-- categoryModel.js
|   |-- foodModel.js
|   |-- orderModel.js
|   |-- resturantModel.js
|   `-- userModel.js
|-- routes/                     API route definitions
|-- server.js                   Express application entry point
|-- package.json
`-- README.md
```

### MVC Responsibilities

#### Models

Models define the MongoDB structure and validation rules. The main models are `User`, `Foods`, `Category`, `Resturant`, and `Orders`.

#### Views

There are no server-rendered views. The application is an API, so controllers return JSON responses that can be consumed by a web or mobile frontend.

#### Controllers

Controllers validate request data, call the models, apply application logic, and return HTTP responses.

#### Routes

Routes map HTTP methods and URL paths to controllers. Protected routes use authentication middleware before the controller runs.

#### Middleware

- `authMiddleware` reads a `Bearer` token, verifies it with `JWT_SECRET`, and stores the decoded user in `req.user`.
- `adminMiddleware` checks the authenticated user role before allowing admin operations.

## Installation

### Requirements

- Node.js 18 or newer
- npm
- MongoDB, either local or hosted with MongoDB Atlas

### Setup

1. Clone the repository:

	 ```bash
	 git clone <repository-url>
	 cd food-app
	 ```

2. Install dependencies:

	 ```bash
	 npm install
	 ```

3. Create a `.env` file in the project root:

	 ```env
	 PORT=3000
	 MONGO_URI=mongodb://127.0.0.1:27017/food-app
	 JWT_SECRET=replace-with-a-long-random-secret
	 ```

4. Start the development server:

	 ```bash
	 npm run server
	 ```

The API will be available at:

```text
http://localhost:3000
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm install` | Install project dependencies |
| `npm run server` | Start the server with Nodemon |
| `npm test` | Placeholder test command |

## API Conventions

The API base path is:

```text
/api/v1
```

Protected endpoints require this header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Requests with a JSON body should include:

```http
Content-Type: application/json
```

Successful responses generally include `success: true` and a resource-specific property. Error responses include `success: false`, a `message`, and sometimes an `error` property.

## API Endpoints

### Test

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| GET | `/api/v1/test/` | Public | Check that the API is running |

### Authentication

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/auth/register` | Public | Register a new user |
| POST | `/api/v1/auth/login` | Public | Log in and receive a JWT |

#### Register body

```json
{
	"username": "Karim",
	"email": "karim@example.com",
	"password": "password123",
	"address": ["123 Main Street"],
	"phone": "5551234567",
	"answer": "blue"
}
```

#### Login body

```json
{
	"email": "karim@example.com",
	"password": "password123"
}
```

Use the `token` returned by login in protected requests.

### Users

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| GET | `/api/v1/user/getProfile` | Private | Get the authenticated user's profile |
| PUT | `/api/v1/user/updateProfile` | Private | Update username, email, phone, or address |
| PUT | `/api/v1/user/updatePassword` | Private | Change the current password |
| POST | `/api/v1/user/resetPassword` | Private | Reset password using email and answer |
| DELETE | `/api/v1/user/deleteProfile` | Private | Delete the authenticated user's account |
| POST | `/api/v1/user/logout` | Private | Return a logout response |

### Restaurants

The project uses the existing route spelling `resturant` in its URL paths.

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/resturant/create` | Private | Create a restaurant |
| GET | `/api/v1/resturant/getAll` | Public | Get all restaurants |
| GET | `/api/v1/resturant/get/:id` | Public | Get one restaurant |
| DELETE | `/api/v1/resturant/delete/:id` | Private | Delete a restaurant |

### Categories

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/category/create` | Private | Create a category |
| GET | `/api/v1/category/getAll` | Public | Get all categories |
| GET | `/api/v1/category/get/:id` | Public | Get one category |
| PUT | `/api/v1/category/update/:id` | Private | Update a category |
| DELETE | `/api/v1/category/delete/:id` | Private | Delete a category |

### Foods

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/food/create` | Private | Create a food item |
| GET | `/api/v1/food/getAll` | Public | Get all food items |
| GET | `/api/v1/food/get/:id` | Public | Get one food item |
| GET | `/api/v1/food/getByRestaurant/:id` | Public | Get foods for a restaurant |
| GET | `/api/v1/food/getRandom` | Public | Get one random food item |
| PUT | `/api/v1/food/update/:id` | Private | Update a food item |
| DELETE | `/api/v1/food/delete/:id` | Private | Delete a food item |

### Orders

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/order/createOrder` | Private | Create an order |
| GET | `/api/v1/order/getAllOrders` | Private | Get orders |
| GET | `/api/v1/order/getOrder/:id` | Private | Get one order |
| PUT | `/api/v1/order/updateOrder/:id` | Private | Update an order |
| DELETE | `/api/v1/order/deleteOrder/:id` | Private | Delete an order |
| POST | `/api/v1/order/admin/order/status/:id` | Admin | Update order status |

#### Create order body

`totalAmount` is calculated on the server from the prices of the submitted, available food items. It should not be sent by the client.

```json
{
	"foods": [
		"6a9ed99adb066110407dd532",
		"6a9f1507db066110407dd535"
	],
	"payment": {
		"method": "cash"
	},
	"deliveryAddress": "123 Main Street",
	"notes": "Leave the order at the door"
}
```

#### Update order status body

```json
{
	"orderStatus": "on the way"
}
```

Valid order statuses are `preparing`, `on the way`, and `delivered`.

## Data Models

### User

Stores username, email, hashed password, address, phone, user type, profile image, and password-reset answer.

### Food

Stores food name, description, price, image, tags, category, availability, restaurant reference, and rating information.

### Restaurant

Stores restaurant details, opening status, delivery and pickup options, rating information, and coordinates.

### Category

Stores category name and image URL.

### Order

Stores food references, payment information, payment status, calculated total amount, delivery address, notes, buyer reference, order status, and timestamps.

## Order Calculation

When an order is created:

1. The API validates that `foods` is a non-empty array.
2. MongoDB is queried for the matching available food items.
3. The API adds the price of each food item.
4. The calculated total is saved as `totalAmount`.
5. The authenticated user's ID is saved as `buyer`.

This prevents clients from changing the order total in the request body.

## Authentication Flow

1. Register a user with `/api/v1/auth/register`.
2. Log in with `/api/v1/auth/login`.
3. Copy the returned JWT token.
4. Send it with protected requests using `Authorization: Bearer TOKEN`.
5. The authentication middleware verifies the token and exposes the payload through `req.user`.

## Security Notes

- Keep `.env` out of version control.
- Use a long, unpredictable `JWT_SECRET` in production.
- Use HTTPS when deploying the API.
- Validate and sanitize user input before storing it.
- Restrict administrative operations to users with the intended admin role.
- Configure CORS for trusted frontend origins in production instead of allowing every origin.

## Current Implementation Notes

- The API uses the existing spelling `resturant` for restaurant routes and model names.
- The logout endpoint returns a success response but does not revoke tokens; JWTs remain valid until expiration.
- The project currently has a placeholder `npm test` script.
- The admin middleware currently checks `req.user.role === "admin"`. Ensure the JWT payload and user role values use the same property and casing when enabling admin-only operations.

## License

This project currently uses the ISC license as specified in `package.json`.
