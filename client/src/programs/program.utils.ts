import { Lift } from './program.types';
import { lifts, sessions } from './program.lifts';

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

export const createProgram = (cycles) => {
  //for each program, create cycles
};

export const createCycle = (lifts) => {
  //for each cycle, create lifts
};

export const createLift = (sessions) => {
  //for each lift, create sessions
};

export const createSession = (sets) => {
  //for each session, create sets
};
