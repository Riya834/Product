import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  IconButton,
  Link,
  InputAdornment,
  Snackbar,
  Alert,
  Paper,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase'; // Ensure Facebook provider is imported
import { signInWithPopup } from 'firebase/auth';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/auth/register', {
  //       name,
  //       email,
  //       password,
  //     });
  //     setSnackbarMessage(response.data.message);
  //     setSnackbarOpen(true);
  //     navigate('/home');
  //   } catch (error) {
  //     const message = error.response?.data?.message || 'An error occurred';
  //     setSnackbarMessage(message);
  //     setSnackbarOpen(true);
  //   }
  // };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      
      // Store the user's name in localStorage
      localStorage.setItem('userName', name);
  
      setSnackbarMessage(response.data.message);
      setSnackbarOpen(true);
      navigate('/home'); // Redirect to home after sign-up
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred';
      setSnackbarMessage(message);
      setSnackbarOpen(true);
    }
  };

  // const handleGoogleSignIn = async () => {
  //   try {
  //     // Ensure Google prompts for account selection
  //     const result = await signInWithPopup(auth, provider.setCustomParameters({ prompt: 'select_account' }));
  //     const user = result.user;
  //     setSnackbarMessage(`Welcome ${user.displayName}`);
  //     setSnackbarOpen(true);

  //     // Optionally send user data to your backend here

  //     // Redirect to home page
  //     navigate('/home');
  //   } catch (error) {
  //     setSnackbarMessage(`Error: ${error.message}`);
  //     setSnackbarOpen(true);
  //   }
  // };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider.setCustomParameters({ prompt: 'select_account' }));
      const user = result.user;
  
      // Store the user's name in localStorage
      localStorage.setItem('userName', user.displayName);
  
      setSnackbarMessage(`Welcome ${user.displayName}`);
      setSnackbarOpen(true);
      navigate('/home'); // Redirect to home after Google sign-in
    } catch (error) {
      setSnackbarMessage(`Error: ${error.message}`);
      setSnackbarOpen(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 4 }}>
      <Paper elevation={10} sx={{ padding: 4, borderRadius: 3, backgroundColor: '#f9f9f9' }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main', margin: 'auto' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Or sign up with
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
          <Grid item>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<FacebookIcon />}
              // Uncomment below to enable Facebook sign-in if implemented
              // onClick={handleFacebookSignIn}
              sx={{
                borderColor: '#4267b2',
                color: '#4267b2',
                '&:hover': {
                  backgroundColor: '#4267b2',
                  color: '#fff',
                },
              }}
            >
              Facebook
            </Button>
          </Grid>
        </Grid>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link onClick={handleLoginRedirect} variant="body2" sx={{ cursor: 'pointer' }}>
            Login
          </Link>
        </Typography>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default SignUp;
