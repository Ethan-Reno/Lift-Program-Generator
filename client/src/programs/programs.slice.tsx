import { createSlice } from '@reduxjs/toolkit';
// import { createProgram, createCycles, createLift, createSession } from './program.utils'

// { contacts: { programs: [...] } } 
// state itself will be a programs array

const programSlice = createSlice({
  name: "programs",
  initialState: {
    programs: [],
    currentProgram: [],
  },
  reducers: {
    // setCurrentProgram: ( state, action ) => {
      
    //   createProgram(action.payload);
    //   createCycle(action.payload);
    //   createLift(action.payload);
    //   createSession(action.payload);
    //   return 
    // },
    addProgramInputs: ( state, action ) => {
      state.programs.push(action.payload)
    },
    deleteProgram: ( state, action ) => {
      state.programs = state.programs.filter((program) => program.id !== action.payload)
    },
  },
})

// Type EVERYTHING actions, state, 

// Action creates are generated for each case reducer function
export const { addProgramInputs, deleteProgram } = programSlice.actions;

export default programSlice.reducer;
