import { createSlice } from '@reduxjs/toolkit';
//import { createAmrapDataPoint } from './program.utils'

const amrapSlice = createSlice({
  name: "amrap",
  initialState: {
    lifts: []
  },
  reducers: {
    addData: ( state, action ) => {

    },
  },
})

// Type EVERYTHING actions, state, 

// Action creates are generated for each case reducer function
export const { addData } = amrapSlice.actions;

export default amrapSlice.reducer;
