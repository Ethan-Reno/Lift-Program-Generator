// configureStore API
import { configureStore } from '@reduxjs/toolkit';
import { save, load } from "redux-localstorage-simple"
import { useDispatch } from 'react-redux'
import programsReducer from '../programs/programs.slice';
import amrapReducer from '../programs/amrap-data.slice';

// Create redux store
  // automatically configures redux devtools extension
export const store = configureStore({
  reducer: {
    programs: programsReducer,
    amrapData: amrapReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save()),
  preloadedState: load()
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
