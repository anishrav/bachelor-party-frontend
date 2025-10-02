import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, CircularProgress, Typography } from '@mui/material';
import { setUser } from '../store/actions/authActions';

const AuthCallback: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Get the token from URL parameters
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const user = params.get('user');

    if (token && user) {
      try {
        const userData = JSON.parse(decodeURIComponent(user));

        // Store token in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));

        // Update Redux store
        dispatch(setUser({ user: userData, token }));

        // Redirect to main app
        window.history.replaceState({}, document.title, '/');
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    } else {
      // If no token, redirect to login
      window.location.href = '/';
    }
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" color="text.secondary">
        Signing you in...
      </Typography>
    </Box>
  );
};

export default AuthCallback;
