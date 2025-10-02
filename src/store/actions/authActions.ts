import { User } from '../types';

export const setUser = (payload: { user: User; token: string }) => ({
  type: 'SET_USER',
  payload,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const setAuthLoading = (isLoading: boolean) => ({
  type: 'SET_AUTH_LOADING',
  payload: isLoading,
});
