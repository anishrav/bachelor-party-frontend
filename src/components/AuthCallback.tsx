import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, CircularProgress, Typography } from '@mui/material';
import { setUser } from '../store/actions/authActions';

const AuthCallback: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      // Get the token from URL parameters
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const user = params.get('user');

      if (token && user) {
        try {
          const userData = JSON.parse(decodeURIComponent(user));
          const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

          // Fetch complete user data including RSVP status
          const response = await fetch(`${apiUrl}/api/v1/users/${userData.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const completeUserData = await response.json();

            // Store token and complete user data in localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(completeUserData));

            // Update Redux store with complete user data
            dispatch(setUser({ user: completeUserData, token }));
          } else {
            // If user fetch fails, store basic user data from URL
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(userData));
            dispatch(setUser({ user: userData, token }));
          }

          // Redirect to main app
          window.history.replaceState({}, document.title, '/');
        } catch (error) {
          console.error('Error fetching user data:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      } else {
        // If no token, redirect to login
        window.location.href = '/';
      }
    };

    fetchUserData();
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
