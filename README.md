## Features

- User sign-up with email verification.
- User login with JWT authentication.
- Password reset functionality.
- Google authentication for login and sign-up.
- Secure password storage using bcrypt.
- RESTful API with structured controllers and routes.

## Technologies Used

- **[Node.js](https://nodejs.org/)**: JavaScript runtime environment.
- **[Express.js](https://expressjs.com/)**: Web framework for Node.js.
- **[MongoDB](https://www.mongodb.com/)**: NoSQL database for storing user data.
- **[Mongoose](https://mongoosejs.com/)**: Object Data Modeling (ODM) library for MongoDB and Node.js.
- **[JWT (JSON Web Token)](https://jwt.io/)**: For authentication and securing routes.
- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)**: For hashing passwords.

## Prerequisites

- [Node.js](https://nodejs.org/) and npm installed on your machine.
- [MongoDB](https://www.mongodb.com/docs/manual/installation/) server running locally or a connection string to a remote MongoDB instance.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rohitcoding1991/redis-CRUD.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   MONGODB_URL=
   USER_EMAIL=
   PASS_EMAIL=
   JWT_SECRET=
   ```
4. To start the server, run:
   ```bash
   npm start
   ```
