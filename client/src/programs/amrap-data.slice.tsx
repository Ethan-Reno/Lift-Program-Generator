import { createSlice } from '@reduxjs/toolkit';

const amrapDataSlice = createSlice({
  name: "amrapData",
  initialState: {
    lifts: []
  },
  reducers: {
    storeData: ( state, action ) => {
      let lift = state.lifts.find(l => l.lift === action.payload.lift);
      if (!lift) {
        lift = { lift: action.payload.lift, data: [] };
        state.lifts.push(lift);
      }
      lift.data.push(action.payload);
    }
  }
})

// Action creates are generated for each case reducer function
export const { storeData } = amrapDataSlice.actions;

export default amrapDataSlice.reducer;
