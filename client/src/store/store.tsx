// configureStore API
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../counter/counter.slice';



// Create redux store
  // automatically configures redux devtools extension
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    //user: userReducer,
    //createProgramInput: programReducer,
    //liftSelection: liftReducer,
  },
});

//change directory to store?