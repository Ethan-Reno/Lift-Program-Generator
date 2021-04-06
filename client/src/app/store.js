// configureStore API
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';

// Create redux store
  // automatically configures redux devtools extension
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    //user: userReducer,
    //program: programReducer,
  },
});