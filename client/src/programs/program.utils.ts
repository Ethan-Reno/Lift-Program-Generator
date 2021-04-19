import { LiftType } from './program.types';
import { lifts, sessions } from './program.lifts';
import { useSelector } from 'react-redux';

/**
 * Return a number rounded to the nearest interval.
 * Example:
 * 
 *   roundToNearest(80, 100); // 100
 *   roundToNearest(25, 15);  // 30
 * 
 * @param {number} value    The number to round
 * @param {number} interval The numeric interval to round to
 * @return {number}
 */

export const roundWeight = (value, interval) => {
  return Math.round(value/interval) * interval;
};

// for each program, call function that calcutates the cycles
// for each cycle, call function that calculates the lifts
// for each lift, call function that calculates the sets

// programs made of cycles, cycles made of lifts, lifts made of sessions, sessions made of sets

const programs = useSelector((state: any) => state.programs.programs)
const currentProgram = programs[0];

export const createProgram = (programInputs) => {
  // for each program, create cycles
  let program = {
    uuid: programInputs.uuid,
    title: programInputs.title,
    smallestInc: programInputs.smallestInc,
    cycles: createCycles(programInputs)
  }
  return program;
};

export const createCycles = (programInputs) => {
  let cycles = [];
  for (let i = 0; i <= programInputs.cycles; i ++) {
      cycles = [
        ...cycles,
        {cycles: createLift(programInputs.lifts)}
    ]
  }
  return cycles;
};

export const createLift = (programInputs) => {
  // for each lift, create sessions
  console.log(`createLift has received programInputs`)
};

export const createSession = (sessions) => {
  // for each session, create sets
  // sets are roughly: 
};


createProgram(currentProgram);