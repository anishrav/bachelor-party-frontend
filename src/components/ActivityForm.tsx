import {
  TextField,
  Button,
  Box,
  Typography,
  CardContent,
  Card,
  Paper,
  Chip,
  Divider,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { votingActions, VotingAction, VOTING_ACTION_TYPES } from '../store/actions/VotingActions';

function ActivityForm() {
  const dispatch = useAppDispatch();
  const activities = useSelector((state: RootState) => state.voting.activities);

  // For demo purposes, we'll use a static user ID. In production, this would come from auth
  const [currentUserId] = useState('user-1');

  const [activity, setActivity] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    time: '',
    category: 'entertainment' as 'food' | 'entertainment' | 'transportation' | 'accommodation',
    estimatedCost: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const votingAction: VotingAction = {
      type: VOTING_ACTION_TYPES.ADD_ACTIVITY_OPTION,
      payload: {
        name: activity.name,
        description: `${activity.location} - ${activity.date} at ${activity.time}`,
        estimatedCost: activity.estimatedCost,
        category: activity.category,
        isActive: true,
      },
    };
    dispatch(votingAction);

    setActivity({
      name: '',
      description: '',
      location: '',
      date: '',
      time: '',
      category: 'entertainment',
      estimatedCost: 0,
    });
  };

  const handleVote = (activityId: string) => {
    const activity = activities.find((a) => a.id === activityId);
    const hasVoted = activity?.votes.some((vote) => vote.userId === currentUserId);

    if (hasVoted) {
      dispatch(votingActions.removeVote(activityId, currentUserId));
    } else {
      dispatch(votingActions.voteForActivity(activityId, currentUserId));
    }
  };

  const totalCost = activities.reduce((sum, activity) => sum + activity.estimatedCost, 0);

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Add Activity Form */}
        <Box sx={{ flex: 1 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h4" component="h2" gutterBottom align="center" color="primary">
                Add Activity
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Stack spacing={2}>
                  <TextField
                    id="activity-name"
                    label="Activity Name"
                    name="name"
                    value={activity.name}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter a short, descriptive name for the activity"
                    helperText='e.g., "Go Kart Racing"'
                    variant="outlined"
                    required
                  />

                  <TextField
                    id="activity-location"
                    label="Activity Location"
                    name="location"
                    value={activity.location}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Specify where the activity will take place"
                    helperText='e.g., "K1 Speed, Austin"'
                    variant="outlined"
                    required
                  />

                  <TextField
                    id="activity-date"
                    label="Activity Date"
                    name="date"
                    type="date"
                    value={activity.date}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    helperText="Select the date when the activity is scheduled"
                    variant="outlined"
                    required
                  />

                  <TextField
                    id="activity-time"
                    label="Activity Time"
                    name="time"
                    type="time"
                    value={activity.time}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    helperText='Enter the start time for the activity (e.g., "18:30")'
                    variant="outlined"
                    required
                  />

                  <TextField
                    id="activity-cost-estimate"
                    label="Activity Cost Estimate"
                    name="estimatedCost"
                    type="number"
                    value={activity.estimatedCost}
                    onChange={handleChange}
                    fullWidth
                    placeholder="0"
                    inputProps={{ min: 0, step: 1 }}
                    helperText='Provide an estimated cost per person in USD (e.g., "50")'
                    variant="outlined"
                    required
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Add Activity
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Activities List */}
        <Box sx={{ flex: 1 }}>
          <Card elevation={3}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h4" component="h2" color="primary">
                  Activities
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    label={`${activities.length} Activities`}
                    color="primary"
                    variant="outlined"
                  />
                  <Chip label={`$${totalCost} Total`} color="secondary" variant="filled" />
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {activities.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No activities added yet. Add your first activity using the form on the left!
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                  <Stack spacing={2}>
                    {activities.map((activity) => {
                      const hasVoted = activity.votes.some((vote) => vote.userId === currentUserId);
                      const voteCount = activity.votes.length;

                      return (
                        <Paper key={activity.id} elevation={1} sx={{ p: 2 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                            }}
                          >
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="h6" component="div" gutterBottom color="primary">
                                {activity.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                {activity.description}
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  mt: 1,
                                }}
                              >
                                <Typography variant="body2" color="text.secondary">
                                  💰 ${activity.estimatedCost} per person
                                </Typography>
                                <Chip label={activity.category} size="small" variant="outlined" />
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                ml: 2,
                              }}
                            >
                              <Tooltip
                                title={hasVoted ? 'Remove your vote' : 'Vote for this activity'}
                              >
                                <IconButton
                                  onClick={() => handleVote(activity.id)}
                                  color={hasVoted ? 'primary' : 'default'}
                                  size="large"
                                >
                                  {hasVoted ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                                </IconButton>
                              </Tooltip>
                              <Typography variant="caption" color="text.secondary">
                                {voteCount} {voteCount === 1 ? 'vote' : 'votes'}
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      );
                    })}
                  </Stack>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default ActivityForm;
