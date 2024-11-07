import axios from 'axios';

// Set up the Axios instance with a base URL and default headers
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests for cross-site requests
});

// Helper function for handling API errors
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code outside of the 2xx range
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('No response received from the server. Please try again.');
  } else {
    // Something happened in setting up the request
    throw new Error('Error setting up the request');
  }
};

// Login user function
export const loginUser = async (data) => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Register user function
export const registerUser = async (data) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
