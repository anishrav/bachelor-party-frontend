import { ActivityOption } from '../types';
import {
  getVoteCount,
  hasUserVoted,
  getUserVotedActivities,
  getActivityVoters,
  getVotingStats,
  sortActivitiesByVotes,
} from '../utils/votingUtils';

// Example usage of the simplified voting system
export const exampleUsage = () => {
  // Sample activities with votes
  const activities: ActivityOption[] = [
    {
      id: '1',
      name: 'Go Kart Racing',
      description: 'High-speed racing at K1 Speed',
      estimatedCost: 50,
      category: 'entertainment',
      votes: [
        { id: 'v1', activityId: '1', userId: 'user1', timestamp: Date.now() },
        { id: 'v2', activityId: '1', userId: 'user2', timestamp: Date.now() },
      ],
      isActive: true,
    },
    {
      id: '2',
      name: 'BBQ Dinner',
      description: 'Authentic Texas BBQ',
      estimatedCost: 30,
      category: 'food',
      votes: [{ id: 'v3', activityId: '2', userId: 'user1', timestamp: Date.now() }],
      isActive: true,
    },
  ];

  // Get vote count for an activity
  const kartVotes = getVoteCount(activities[0]); // Returns 2

  // Check if user voted for an activity
  const user1VotedForKart = hasUserVoted(activities[0], 'user1'); // Returns true

  // Get all activities user voted for
  const user1VotedActivities = getUserVotedActivities(activities, 'user1');
  // Returns both activities since user1 voted for both

  // Get all voters for an activity
  const kartVoters = getActivityVoters(activities[0]); // Returns ['user1', 'user2']

  // Get overall voting statistics
  const stats = getVotingStats(activities);
  // Returns: { totalVotes: 3, totalActivities: 2, averageVotesPerActivity: 1.5, mostVotedActivity: ... }

  // Sort activities by popularity
  const sortedByVotes = sortActivitiesByVotes(activities);
  // Go Kart Racing will be first since it has 2 votes vs BBQ's 1 vote

  return {
    kartVotes,
    user1VotedForKart,
    user1VotedActivities,
    kartVoters,
    stats,
    sortedByVotes,
  };
};
