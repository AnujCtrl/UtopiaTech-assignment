# Express Authentication API

This is a simple authentication API built with Express.js. It provides endpoints for user signup, login, and refreshing access tokens.

## Installation

1. Clone the repository:

```
git clone <repository-url>
```

2. Install the dependencies:

```
cd <project-folder>
npm install
```


3. Start the server:

```
ts-node app.ts
```

The server will start running on `http://localhost:3000`.

## API Endpoints

### Signup

- URL: `POST /auth/signup`
- Request Body:
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password.
- Response:
  - Success:
    - Status: 200
    - Body: `{ message: "Signup successful" }`
  - Error:
    - Status: 400
    - Body: `{ errors: [{ msg: "Invalid email" }, { msg: "Password must be at least 6 characters" }] }`

### Login

- URL: `POST /auth/login`
- Request Body:
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password.
- Response:
  - Success:
    - Status: 200
    - Body: `{ accessToken: "<access-token>", refreshToken: "<refresh-token>" }`
  - Error:
    - Status: 401
    - Body: `{ errors: [{ msg: "Invalid credentials" }] }`

### Refresh Token

- URL: `POST /auth/refresh-token`
- Request Body:
  - `refreshToken` (string, required): User's refresh token.
- Response:
  - Success:
    - Status: 200
    - Body: `{ accessToken: "<access-token>" }`
  - Error:
    - Status: 401
    - Body: `{ errors: [{ msg: "Invalid refresh token" }] }`

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken

Feel free to customize and enhance this API to fit your specific requirements.
