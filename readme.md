# Airtime Top-Up Service

This Node.js application utilizes a microservices architecture to facilitate airtime top-up transactions. The service employs various technologies including Express for routing, JWT for token authentication, Redis for caching, MongoDB with Mongoose for data storage, and queues for handling asynchronous tasks.

## Features

- **Microservice Architecture**: The application is designed with a microservices architecture, allowing for modular and scalable development.

- **User Service Integration**: The service leverages a separate User Service https://github.com/AdewaleAdeniji/microservices-user-service for user authentication and authorization, ensuring secure sign-in and sign-up functionality.

- **JWT Token Authentication**: JSON Web Tokens (JWT) are employed to authenticate users and authorize access to protected routes.

- **RESTful Communication**: Services communicate via RESTful APIs, enabling seamless integration and interaction between different components.

- **Microservice Integration for Wallet Service**: The API service interfaces with a https://github.com/AdewaleAdeniji/quadry-wallet-service, a multi tenant wallet microservice to integrate the Wallet Service, providing the necessary functionalities for managing user wallets.

- **Airtime Top-Up Functionality**: The core functionality of the application is to facilitate airtime top-up transactions through both a user interface and API endpoints.

## Technologies Used

- **Express.js**: The application utilizes Express for handling routing and middleware.

- **Microservices**: The architecture is designed around microservices, allowing for independent development and scalability of different components.

- **JWT Authentication**: JSON Web Tokens are implemented for secure authentication and authorization.

- **Redis Caching**: Redis is used for caching frequently accessed data, improving response times and performance.

- **MongoDB with Mongoose**: The application employs MongoDB for data storage, and Mongoose as an ODM for simplified interaction with the database.

- **Queue Implementation**: Queues are used to handle asynchronous tasks, ensuring efficient processing of airtime top-up requests.

## Installation and Setup

1. Clone the repository from the provided GitHub link.

2. Install the required dependencies using the package manager of your choice:

   ```bash
   npm install
   ```

3. Set up the necessary environment variables, including database connections, JWT secret, and Redis configuration.

4. Run the application:

   ```bash
   npm start
   ```

5. Access the service through the provided API endpoints.

## Usage

The application provides both a user interface and API endpoints for airtime top-up transactions. Users can sign in or sign up using the User Service, and then initiate airtime top-up requests.

## Contributing

If you'd like to contribute to the development of this project, please follow the standard Git workflow:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your fork.
4. Create a pull request for review.
