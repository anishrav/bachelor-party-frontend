import {
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  Box,
  Chip,
  Divider,
  Stack,
  CircularProgress,
  Alert,
  Avatar,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState, AppDispatch } from '../store/store';
import { votingActions } from '../store/actions/VotingActions';

function AttendeeList() {
  const dispatch = useDispatch<AppDispatch>();
  const attendees = useSelector((state: RootState) => state.voting.attendees);
  const activities = useSelector((state: RootState) => state.voting.activities);
  const token = useSelector((state: RootState) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/v1/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch attendees');
        }

        const users = await response.json();
        dispatch(votingActions.fetchAttendeesSuccess(users));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load attendees');
        console.error('Error fetching attendees:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAttendees();
    }
  }, [dispatch, token]);

  const rsvpYesCount = attendees.filter((a) => a.hasRSVPd === true).length;
  const rsvpNoCount = attendees.filter((a) => a.hasRSVPd === false).length;
  const pendingCount = attendees.filter(
    (a) => a.hasRSVPd === null || a.hasRSVPd === undefined,
  ).length;

  // Helper function to get activities voted by a user
  const getVotedActivities = (userId: string) => {
    return activities.filter((activity) => activity.votes.some((vote) => vote.userId === userId));
  };

  if (loading) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom align="center" color="primary">
            Attendees
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
            <Chip
              label={`${rsvpYesCount} RSVP'd Yes`}
              color="success"
              variant="filled"
              size="medium"
              icon={<CheckCircleIcon />}
            />
            <Chip
              label={`${rsvpNoCount} RSVP'd No`}
              color="error"
              variant="filled"
              size="medium"
              icon={<CancelIcon />}
            />
            <Chip
              label={`${pendingCount} Pending`}
              color="warning"
              variant="filled"
              size="medium"
              icon={<PendingIcon />}
            />
          </Box>

          <Divider sx={{ mb: 2 }} />

          {attendees.length === 0 ? (
            <Typography variant="body1" align="center" color="text.secondary" sx={{ py: 4 }}>
              No attendees found.
            </Typography>
          ) : (
            <List>
              {attendees.map((attendee, index) => {
                const votedActivities = getVotedActivities(attendee.id);
                const hasRSVPd = attendee.hasRSVPd;

                return (
                  <div key={attendee.id}>
                    <ListItem alignItems="flex-start" sx={{ py: 2, flexDirection: 'column' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          mb: votedActivities.length > 0 ? 1 : 0,
                        }}
                      >
                        <Avatar
                          src={attendee.picture}
                          alt={attendee.fullName}
                          sx={{ mr: 2, width: 40, height: 40 }}
                        >
                          {attendee.fullName.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" component="div">
                            {attendee.fullName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {attendee.email}
                          </Typography>
                        </Box>
                        {hasRSVPd === true ? (
                          <Chip
                            label="RSVP'd Yes"
                            color="success"
                            variant="outlined"
                            size="small"
                            icon={<CheckCircleIcon />}
                          />
                        ) : hasRSVPd === false ? (
                          <Chip
                            label="RSVP'd No"
                            color="error"
                            variant="outlined"
                            size="small"
                            icon={<CancelIcon />}
                          />
                        ) : (
                          <Chip
                            label="No RSVP"
                            color="warning"
                            variant="outlined"
                            size="small"
                            icon={<PendingIcon />}
                          />
                        )}
                      </Box>

                      {votedActivities.length > 0 && (
                        <Box sx={{ width: '100%', mt: 1, pl: 7 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                            Voted for:
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {votedActivities.map((activity) => (
                              <Chip
                                key={activity.id}
                                label={activity.name}
                                size="small"
                                variant="outlined"
                                color="primary"
                              />
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </ListItem>
                    {index < attendees.length - 1 && <Divider />}
                  </div>
                );
              })}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default AttendeeList;
