import { createSlice } from '@reduxjs/toolkit';
import { createProgram } from './program.utils'

// { contacts: { programs: [...] } }
// state itself will be a programs array

const programSlice = createSlice({
  name: "programs",
  initialState: {
    programs: []
  },
  reducers: {
    addProgram: ( state, action ) => {
      let program = createProgram(action.payload)
      state.programs.push(program)
    },
    deleteProgram: ( state, action ) => {
      state.programs = state.programs.filter((program) => program.uuid !== action.payload)
    },
  },
})

// Type EVERYTHING actions, state, 

// Action creates are generated for each case reducer function
export const { addProgram, deleteProgram } = programSlice.actions;

export default programSlice.reducer;
