// configureStore API
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import counterReducer from '../counter/counter.slice';
import programsReducer from '../programs/programs.slice';

// Create redux store
  // automatically configures redux devtools extension
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    programs: programsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()