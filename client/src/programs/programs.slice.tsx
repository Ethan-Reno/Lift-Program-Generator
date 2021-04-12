import { createSlice } from '@reduxjs/toolkit';

// { contacts: { programs: [...] } }
// state itself will be a programs array

const programSlice = createSlice({
  name: "programs",
  initialState: {
    programs: []
  },
  reducers: {
    setPrograms: (state, action ) => {
      state.programs = action.payload
    },
    addProgram: (state, action ) => {
      state.programs.push(action.payload)
    },
    deleteProgram: (state, action ) => {
     state.programs = state.programs.filter((program) => program.id !== action.payload)
    },
  },
})

// Action creates are generated for each case reducer function
export const { setPrograms, addProgram, deleteProgram } = programSlice.actions;

export default programSlice.reducer;
