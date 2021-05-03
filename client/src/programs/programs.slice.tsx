import { createSlice } from '@reduxjs/toolkit';
import { createProgram } from './program.utils'

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
    markSessionComplete: ( state, action ) => {
      let uuid = action.payload.uuid
      let cycle = action.payload.cycle
      let liftName = action.payload.lift
      let session = action.payload.session
      let program;

      for (let i = 0; i < state.programs.length; i ++) {
        if (state.programs[i].uuid === uuid) {
          program = state.programs[i].cycles[cycle];
          for (let i = 0; i < program.lifts.length; i ++) {
            if (program.lifts[i].name === liftName) {
              if (program.lifts[i].sessions[session].complete === false) {
                program.lifts[i].sessions[session].complete = true;
              }
            }
          }
        }
      }
    },
  },
})

export const { addProgram, deleteProgram, markSessionComplete } = programSlice.actions;

export default programSlice.reducer;
