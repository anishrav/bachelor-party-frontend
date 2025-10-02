import { ActivityOption, Vote } from '../types';

/**
 * Get the vote count for a specific activity
 */
export const getVoteCount = (activity: ActivityOption): number => {
  return activity.votes.length;
};

/**
 * Check if a user has voted for a specific activity
 */
export const hasUserVoted = (activity: ActivityOption, userId: string): boolean => {
  return activity.votes.some((vote) => vote.userId === userId);
};

/**
 * Get all activities that a user has voted for
 */
export const getUserVotedActivities = (
  activities: ActivityOption[],
  userId: string,
): ActivityOption[] => {
  return activities.filter((activity) => hasUserVoted(activity, userId));
};

/**
 * Get all users who voted for a specific activity
 */
export const getActivityVoters = (activity: ActivityOption): string[] => {
  return activity.votes.map((vote) => vote.userId);
};

/**
 * Get voting statistics for all activities
 */
export const getVotingStats = (activities: ActivityOption[]) => {
  const totalVotes = activities.reduce((sum, activity) => sum + activity.votes.length, 0);
  const mostVotedActivity = activities.reduce(
    (max, activity) => (activity.votes.length > max.votes.length ? activity : max),
    activities[0] || { votes: [] },
  );

  return {
    totalVotes,
    totalActivities: activities.length,
    averageVotesPerActivity: activities.length > 0 ? totalVotes / activities.length : 0,
    mostVotedActivity,
  };
};

/**
 * Sort activities by vote count (descending)
 */
export const sortActivitiesByVotes = (activities: ActivityOption[]): ActivityOption[] => {
  return [...activities].sort((a, b) => b.votes.length - a.votes.length);
};
