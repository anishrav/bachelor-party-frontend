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
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function AttendeeList() {
  const attendees = useSelector((state: RootState) => state.voting.attendees);
  const activities = useSelector((state: RootState) => state.voting.activities);

  const confirmedCount = attendees.filter((a) => a.status === 'confirmed').length;
  const pendingCount = attendees.filter((a) => a.status === 'pending').length;

  // Helper function to get activities voted by a user
  const getVotedActivities = (userId: string) => {
    return activities.filter((activity) => activity.votes.some((vote) => vote.userId === userId));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom align="center" color="primary">
            Attendees
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
            <Chip
              label={`${confirmedCount} Confirmed`}
              color="success"
              variant="filled"
              size="medium"
            />
            <Chip
              label={`${pendingCount} Pending`}
              color="warning"
              variant="filled"
              size="medium"
            />
          </Box>

          <Divider sx={{ mb: 2 }} />

          <List>
            {attendees.map((attendee, index) => {
              const votedActivities = getVotedActivities(attendee.id);

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
                      {attendee.status === 'confirmed' ? (
                        <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                      ) : (
                        <PendingIcon color="warning" sx={{ mr: 1 }} />
                      )}
                      <Typography variant="h6" component="div" sx={{ flex: 1 }}>
                        {attendee.name}
                      </Typography>
                      <Chip
                        label={attendee.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        color={attendee.status === 'confirmed' ? 'success' : 'warning'}
                        variant="outlined"
                        size="small"
                      />
                    </Box>

                    {votedActivities.length > 0 && (
                      <Box sx={{ width: '100%', mt: 1, pl: 4 }}>
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
        </CardContent>
      </Card>
    </Box>
  );
}

export default AttendeeList;
