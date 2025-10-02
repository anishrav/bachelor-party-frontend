import React from 'react';
import { Box, Button, Card, CardContent, Typography, Container } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Login: React.FC = () => {
  const handleSignIn = () => {
    window.location.href = 'http://localhost:8000/api/v1/auth/google';
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ width: '100%', boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 2 }}>
              Anish's Bachelor Party
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
              Sign in to view event details and RSVP
            </Typography>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSignIn}
              startIcon={<GoogleIcon />}
              sx={{
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
              }}
            >
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
