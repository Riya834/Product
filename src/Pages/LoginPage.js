import React, { useState } from 'react';
import axios from 'axios';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import background from '../Images/webpage_copy.jpg';

import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Avatar,
  Snackbar,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    try {
      // Call your backend API to log in
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      console.log('Login Response:', response.data); // Log the response for debugging
      navigate('/home');
    } catch (error) {
      console.error('Login Error:', error); // Log any error that occurs
      setSnackbarMessage(error.response?.data?.message || 'An error occurred');
      setSnackbarOpen(true); // Open Snackbar for error messages
    }
  };

  // Function to handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setSnackbarMessage(`Welcome back, ${user.displayName}`);
      setSnackbarOpen(true);
      navigate('/home'); // Redirect to home after Google sign-in
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true); // Open Snackbar for error messages
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`, // Direct path to the image in the public folder
        backgroundSize: 'cover',  // Ensure the image covers the entire area
        backgroundPosition: 'center', // Center the background image
        minHeight: '100vh', // Full height of the viewport
        minWidth: '100vw',  // Full width of the viewport
        display: 'flex',
        alignItems: 'center', // Center content vertically
        justifyContent: 'center', // Center content horizontally
      }}
    >
      <Container component="main" maxWidth="xs" >
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: 'rgba(249, 249, 249, 0.8)', // Set a semi-transparent background
            width: '90%',
            maxWidth: '400px',
            alignSelf: 'flex-start',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', margin: 'auto' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Welcome Back!
          </Typography>
          <form onSubmit={handleLogin}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Work Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@site.com"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#3f51b5',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1a73e8',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1a73e8',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#3f51b5',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1a73e8',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1a73e8',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2, py: 1.5, fontSize: '16px' }}
                >
                  Log In
                </Button>
              </Grid>
            </Grid>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Or sign in with
          </Typography>

          <Grid container spacing={2} justifyContent="center" sx={{ mt: 1 }}>
            <Grid item>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                sx={{
                  borderColor: '#db4437',
                  color: '#db4437',
                  '&:hover': {
                    backgroundColor: '#db4437',
                    color: '#fff',
                  },
                }}
              >
                Google
              </Button>
            </Grid>
          </Grid>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Button variant="text" onClick={() => navigate('/')} sx={{ color: 'primary.main' }}>
              Sign Up
            </Button>
          </Typography>

          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
