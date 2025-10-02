import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { votingReducer } from './reducers/votingReducers';
import { authReducer } from './reducers/authReducer';

const rootReducer = combineReducers({
  voting: votingReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create a typed dispatch hook
export const useAppDispatch = () => store.dispatch;
