import { createSlice } from '@reduxjs/toolkit';

// { programs: [...] }
// state itself will be a programs array

const programSlice = createSlice({
  name: "programs",
  initialState: null,
  reducers: {
    setPrograms: (state, action ) => {
      state = action.payload
    },
    deleteProgram: (state, action ) => {
     state = state.filter(program => program.id !== action.payload)
    },
  },
})

// Action creates are generated for each case reducer function
export const { setPrograms, deleteProgram } = programSlice.actions;

export default programSlice.reducer;
