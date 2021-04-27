import { createSlice, current } from '@reduxjs/toolkit';
import { AmrapState, AmrapDataPoint } from './program.types';
import { original } from 'immer';

// const initialState: AmrapState = { lifts: {} }

const amrapDataSlice = createSlice({
  name: "amrapData",
  initialState: {
    lifts: []
  },
  reducers: {
    storeData: ( state, action ) => {
      state.lifts.push(action.payload);
    }
  }
})

// Type EVERYTHING actions, state, 

// Action creates are generated for each case reducer function
export const { storeData } = amrapDataSlice.actions;

export default amrapDataSlice.reducer;
