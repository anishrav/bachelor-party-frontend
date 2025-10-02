import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Typography, Button, Box, Chip, Divider, Alert } from '@mui/material';
import CountdownTimer from './CountdownTimer';
import { RootState } from '../store/store';
import { setUser } from '../store/actions/authActions';

interface TripCardProps {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
}

function TripCard({ title, destination, startDate, endDate }: TripCardProps) {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const handleRSVP = async () => {
    if (!user || !token) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/v1/users/${user.id}/rsvp`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ hasRSVPd: true }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(
          setUser({
            user: { ...user, hasRSVPd: data.hasRSVPd },
            token,
          }),
        );
      } else {
        setError('Failed to update RSVP status');
      }
    } catch (err) {
      setError('An error occurred while updating RSVP');
      console.error('Error updating RSVP:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeRSVP = async () => {
    if (!user || !token) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/v1/users/${user.id}/rsvp`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ hasRSVPd: false }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(
          setUser({
            user: { ...user, hasRSVPd: data.hasRSVPd },
            token,
          }),
        );
      } else {
        setError('Failed to update RSVP status');
      }
    } catch (err) {
      setError('An error occurred while updating RSVP');
      console.error('Error updating RSVP:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom align="center" color="primary">
            {title}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>
                Location:
              </Typography>
              <Chip label={destination} color="primary" variant="outlined" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>
                Date:
              </Typography>
              <Typography variant="body1">
                {startDate} - {endDate}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {!user?.hasRSVPd ? (
            <>
              <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
                Please RSVP to let us know if you can attend
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRSVP}
                  size="large"
                  disabled={isLoading}
                >
                  RSVP Yes
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ mb: 2, textAlign: 'center' }}>
                <Chip label="You have RSVP'd" color="success" size="medium" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleChangeRSVP}
                  size="medium"
                  disabled={isLoading}
                >
                  Actually, I can't make it
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      <CountdownTimer date={startDate} />
    </Box>
  );
}

export default TripCard;
