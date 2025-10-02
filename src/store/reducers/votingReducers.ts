import { Vote, VotingState, ActivityOption } from '../types';
import { VotingAction } from '../actions/VotingActions';
import { VOTING_ACTION_TYPES } from '../actions/VotingActions';

const initialState: VotingState = {
  attendees: [
    { id: 'user-1', name: 'Mike', status: 'confirmed' },
    { id: 'user-2', name: 'Dave', status: 'confirmed' },
    { id: 'user-3', name: 'Tom', status: 'pending' },
    { id: 'user-4', name: 'Jake', status: 'confirmed' },
  ],
  activities: [
    {
      id: crypto.randomUUID(),
      name: 'Go Kart Racing',
      description: 'K1 Speed, Austin - 2025-10-15 at 14:00',
      estimatedCost: 50,
      category: 'entertainment',
      votes: [
        {
          id: crypto.randomUUID(),
          activityId: '',
          userId: 'user-1',
          timestamp: Date.now(),
        },
        {
          id: crypto.randomUUID(),
          activityId: '',
          userId: 'user-3',
          timestamp: Date.now(),
        },
        {
          id: crypto.randomUUID(),
          activityId: '',
          userId: 'user-4',
          timestamp: Date.now(),
        },
      ],
      isActive: true,
    },
    {
      id: crypto.randomUUID(),
      name: 'BBQ Dinner',
      description: 'Franklin Barbecue, Austin - 2025-10-15 at 18:30',
      estimatedCost: 75,
      category: 'food',
      votes: [
        {
          id: crypto.randomUUID(),
          activityId: '',
          userId: 'user-1',
          timestamp: Date.now(),
        },
        {
          id: crypto.randomUUID(),
          activityId: '',
          userId: 'user-2',
          timestamp: Date.now(),
        },
        {
          id: crypto.randomUUID(),
          activityId: '',
          userId: 'user-4',
          timestamp: Date.now(),
        },
      ],
      isActive: true,
    },
    {
      id: crypto.randomUUID(),
      name: 'Brewery Tour',
      description: 'Jester King Brewery, Austin - 2025-10-16 at 15:00',
      estimatedCost: 40,
      category: 'entertainment',
      votes: [
        {
          id: crypto.randomUUID(),
          activityId: '',
          userId: 'user-2',
          timestamp: Date.now(),
        },
        {
          id: crypto.randomUUID(),
          activityId: '',
          userId: 'user-3',
          timestamp: Date.now(),
        },
      ],
      isActive: true,
    },
    {
      id: crypto.randomUUID(),
      name: 'Hotel Downtown',
      description: 'Hilton Austin, Downtown - Check-in 2025-10-15',
      estimatedCost: 200,
      category: 'accommodation',
      votes: [
        {
          id: crypto.randomUUID(),
          activityId: '',
          userId: 'user-1',
          timestamp: Date.now(),
        },
        {
          id: crypto.randomUUID(),
          activityId: '',
          userId: 'user-2',
          timestamp: Date.now(),
        },
        {
          id: crypto.randomUUID(),
          activityId: '',
          userId: 'user-3',
          timestamp: Date.now(),
        },
        {
          id: crypto.randomUUID(),
          activityId: '',
          userId: 'user-4',
          timestamp: Date.now(),
        },
      ],
      isActive: true,
    },
  ].map((activity) => ({
    ...activity,
    votes: activity.votes.map((vote) => ({ ...vote, activityId: activity.id })),
  })),
  isLoading: false,
  error: null,
  lastUpdated: null,
};

export const votingReducer = (state = initialState, action: VotingAction) => {
  switch (action.type) {
    case VOTING_ACTION_TYPES.VOTE_FOR_ACTIVITY: {
      const { userId, activityId } = action.payload;

      // Check if user already voted for this activity
      const activity = state.activities.find((a) => a.id === activityId);
      if (activity && activity.votes.some((vote) => vote.userId === userId)) {
        return state; // User already voted, don't add duplicate
      }

      const newVote: Vote = {
        id: crypto.randomUUID(),
        activityId,
        userId,
        timestamp: Date.now(),
      };

      const updatedActivities = state.activities.map((activity) =>
        activity.id === activityId
          ? { ...activity, votes: [...activity.votes, newVote] }
          : activity,
      );

      return {
        ...state,
        activities: updatedActivities,
        lastUpdated: Date.now(),
      };
    }

    case VOTING_ACTION_TYPES.REMOVE_VOTE: {
      const { userId, activityId } = action.payload;

      const updatedActivities = state.activities.map((activity) =>
        activity.id === activityId
          ? {
              ...activity,
              votes: activity.votes.filter((vote) => vote.userId !== userId),
            }
          : activity,
      );

      return {
        ...state,
        activities: updatedActivities,
        lastUpdated: Date.now(),
      };
    }

    case VOTING_ACTION_TYPES.ADD_ACTIVITY_OPTION: {
      const newActivity: ActivityOption = {
        ...action.payload,
        id: crypto.randomUUID(),
        votes: [],
        isActive: true,
      };

      return {
        ...state,
        activities: [...state.activities, newActivity],
        lastUpdated: Date.now(),
      };
    }

    case VOTING_ACTION_TYPES.UPDATE_ACTIVITY_OPTION: {
      const { id, updates } = action.payload;

      const updatedActivities = state.activities.map((activity) =>
        activity.id === id ? { ...activity, ...updates } : activity,
      );

      return {
        ...state,
        activities: updatedActivities,
        lastUpdated: Date.now(),
      };
    }

    case VOTING_ACTION_TYPES.DELETE_ACTIVITY_OPTION: {
      return {
        ...state,
        activities: state.activities.filter((activity) => activity.id !== action.payload),
        lastUpdated: Date.now(),
      };
    }

    case VOTING_ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case VOTING_ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case VOTING_ACTION_TYPES.FETCH_ACTIVITIES_SUCCESS:
      return {
        ...state,
        activities: action.payload,
        isLoading: false,
        error: null,
        lastUpdated: Date.now(),
      };

    default:
      return state;
  }
};
