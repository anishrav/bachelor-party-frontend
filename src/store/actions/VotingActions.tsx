import { ActivityOption, Attendee } from '../types';

export const VOTING_ACTION_TYPES = {
  VOTE_FOR_ACTIVITY: 'voting/VOTE_FOR_ACTIVITY',
  REMOVE_VOTE: 'voting/REMOVE_VOTE',
  ADD_ACTIVITY_OPTION: 'voting/ADD_ACTIVITY_OPTION',
  UPDATE_ACTIVITY_OPTION: 'voting/UPDATE_ACTIVITY_OPTION',
  DELETE_ACTIVITY_OPTION: 'voting/DELETE_ACTIVITY_OPTION',
  SET_LOADING: 'voting/SET_LOADING',
  SET_ERROR: 'voting/SET_ERROR',
  FETCH_ACTIVITIES_SUCCESS: 'voting/FETCH_ACTIVITIES_SUCCESS',
  FETCH_ATTENDEES_SUCCESS: 'voting/FETCH_ATTENDEES_SUCCESS',
} as const;

interface VoteForActivityAction {
  type: typeof VOTING_ACTION_TYPES.VOTE_FOR_ACTIVITY;
  payload: { activityId: string; userId: string };
}

interface RemoveVoteAction {
  type: typeof VOTING_ACTION_TYPES.REMOVE_VOTE;
  payload: {
    activityId: string;
    userId: string;
  };
}

interface AddActivityOptionAction {
  type: typeof VOTING_ACTION_TYPES.ADD_ACTIVITY_OPTION;
  payload: Omit<ActivityOption, 'id' | 'votes'>;
}

interface UpdateActivityOptionAction {
  type: typeof VOTING_ACTION_TYPES.UPDATE_ACTIVITY_OPTION;
  payload: {
    id: string;
    updates: Partial<ActivityOption>;
  };
}

interface DeleteActivityOptionAction {
  type: typeof VOTING_ACTION_TYPES.DELETE_ACTIVITY_OPTION;
  payload: string;
}

interface SetLoadingAction {
  type: typeof VOTING_ACTION_TYPES.SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof VOTING_ACTION_TYPES.SET_ERROR;
  payload: string | null;
}

interface FetchActivitiesSuccessAction {
  type: typeof VOTING_ACTION_TYPES.FETCH_ACTIVITIES_SUCCESS;
  payload: ActivityOption[];
}

interface FetchAttendeesSuccessAction {
  type: typeof VOTING_ACTION_TYPES.FETCH_ATTENDEES_SUCCESS;
  payload: Attendee[];
}

export type VotingAction =
  | VoteForActivityAction
  | RemoveVoteAction
  | AddActivityOptionAction
  | UpdateActivityOptionAction
  | DeleteActivityOptionAction
  | SetLoadingAction
  | SetErrorAction
  | FetchActivitiesSuccessAction
  | FetchAttendeesSuccessAction;

export const votingActions = {
  voteForActivity: (activityId: string, userId: string): VotingAction => ({
    type: VOTING_ACTION_TYPES.VOTE_FOR_ACTIVITY,
    payload: { activityId, userId },
  }),
  removeVote: (activityId: string, userId: string): VotingAction => ({
    type: VOTING_ACTION_TYPES.REMOVE_VOTE,
    payload: { activityId, userId },
  }),
  addActivityOption: (activity: Omit<ActivityOption, 'id' | 'votes'>): VotingAction => ({
    type: VOTING_ACTION_TYPES.ADD_ACTIVITY_OPTION,
    payload: activity,
  }),
  updateActivityOption: (id: string, updates: Partial<ActivityOption>): VotingAction => ({
    type: VOTING_ACTION_TYPES.UPDATE_ACTIVITY_OPTION,
    payload: { id, updates },
  }),
  deleteActivityOption: (id: string): VotingAction => ({
    type: VOTING_ACTION_TYPES.DELETE_ACTIVITY_OPTION,
    payload: id,
  }),
  setLoading: (isLoading: boolean): VotingAction => ({
    type: VOTING_ACTION_TYPES.SET_LOADING,
    payload: isLoading,
  }),
  setError: (error: string | null): VotingAction => ({
    type: VOTING_ACTION_TYPES.SET_ERROR,
    payload: error,
  }),
  fetchActivitiesSuccess: (activities: ActivityOption[]): VotingAction => ({
    type: VOTING_ACTION_TYPES.FETCH_ACTIVITIES_SUCCESS,
    payload: activities,
  }),
  fetchAttendeesSuccess: (attendees: Attendee[]): VotingAction => ({
    type: VOTING_ACTION_TYPES.FETCH_ATTENDEES_SUCCESS,
    payload: attendees,
  }),
};
