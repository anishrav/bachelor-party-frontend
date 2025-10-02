export interface Vote {
  id: string;
  activityId: string;
  userId: string;
  timestamp: number;
}

export interface ActivityOption {
  id: string;
  name: string;
  description: string;
  estimatedCost: number;
  category: string;
  votes: Vote[];
  isActive: boolean;
}

export interface Attendee {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  picture?: string;
  hasRSVPd?: boolean | null;
}

export interface VotingState {
  activities: ActivityOption[];
  attendees: Attendee[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  hasRSVPd?: boolean | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AppState {
  voting: VotingState;
  auth: AuthState;
}
