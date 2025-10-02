import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';

function CountdownTimer({ date }: { date: string }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));

  function calculateTimeLeft(date: string) {
    const difference = new Date(date).getTime() - new Date().getTime();
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, date]);

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom align="center" color="primary">
          Countdown Timer
        </Typography>

        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Time until the event:
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            <Chip
              label={`${timeLeft.days} days`}
              color="primary"
              variant="filled"
              sx={{ fontSize: '1rem', px: 2, py: 1 }}
            />
            <Chip
              label={`${timeLeft.hours} hours`}
              color="secondary"
              variant="filled"
              sx={{ fontSize: '1rem', px: 2, py: 1 }}
            />
            <Chip
              label={`${timeLeft.minutes} minutes`}
              color="primary"
              variant="outlined"
              sx={{ fontSize: '1rem', px: 2, py: 1 }}
            />
            <Chip
              label={`${timeLeft.seconds} seconds`}
              color="secondary"
              variant="outlined"
              sx={{ fontSize: '1rem', px: 2, py: 1 }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CountdownTimer;
