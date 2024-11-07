// generateToken.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Function to generate JWT token
const generateToken = (user) => {
    // Create a token with user information and a secret
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Example user data (You can customize this)
const user = {
    id: '123', // User ID
    name: 'John Doe', // User Name
    email: 'john.doe@example.com', // User Email
};

// Generate and print the token
const token = generateToken(user);
console.log('Generated JWT Token:', token);
