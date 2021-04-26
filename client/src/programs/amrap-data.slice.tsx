import { createSlice } from '@reduxjs/toolkit';
//import { createAmrapDataPoint } from './program.utils'

const amrapDataSlice = createSlice({
  name: "amrapData",
  initialState: {
    data: []
  },
  reducers: {
    addData: ( state, action ) => {
      state.data.push(action.payload);
    },
  },
})

// Type EVERYTHING actions, state, 

// Action creates are generated for each case reducer function
export const { addData } = amrapDataSlice.actions;

export default amrapDataSlice.reducer;
