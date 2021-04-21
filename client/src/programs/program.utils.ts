export const setWeight = (oneRepMax, setValue, roundNumber) => {
  let weight = oneRepMax * setValue;
  weight = Math.round(weight/roundNumber) * roundNumber;
  return weight;
};

export const createProgram = (programInputs) => {
  // for each program, create cycles
  let program = {
    uuid: programInputs.uuid,
    title: programInputs.title,
    roundNumber: programInputs.roundNumber,
    cycles: createCycles(programInputs)
  }
  return program;
};

export const createCycles = (programInputs) => {
  let cycles = [];
  for (let i = 0; i < programInputs.cycles; i ++) {
    cycles = [
      ...cycles,
      {lifts: createLift(programInputs, i)}
    ]
  }
  return cycles;
};

export const createLift = (programInputs, cycleNumber) => {
  let lifts = [];
  Object.entries(programInputs.lifts).forEach((lift: any) => {
    if (lift[1].checked === true) {
      let cycleIncrement = cycleNumber * lift[1].cycleIncrement;
      let oneRepMax = lift[1].oneRepMax + cycleIncrement
      lifts = [
        ...lifts,
        {
          name: lift[0],
          sessions: (createSession(oneRepMax, programInputs))
        }
      ]
    }
  })
  return lifts;
};
 
export const createSession = (oneRepMax, programInputs) => {
  let sessionCount = 4;
  let setValues = [
    [ [5, 5, 5, 5, 5, 0], [.40, .45, .55, .65, .75, .85] ],
    [ [5, 5, 5, 5, 3, 0], [.40, .50, .60, .70, .80, .90] ],
    [ [5, 5, 5, 3, 3, 0], [.40, .50, .60, .75, .85, .95] ],
    [ [5, 5, 5, 5, 5, 5], [.40, .45, .50, .55, .65, .65] ]
  ]
  let sessions = []
  for (let i=0; i < sessionCount; i ++) {
    sessions = [
      ...sessions,
      {
        sets: (createSet(oneRepMax, setValues[i], programInputs))
      }
    ]
  }
  return sessions;
};

export const createSet = (oneRepMax, setValues, programInputs) => {
  let setCount = 6;

  let sets = [];
  for (let i=0; i < setCount; i ++) {
    sets = [
      ...sets,
      {
        reps: setValues[0][i],
        weight: setWeight(oneRepMax, setValues[1][i], programInputs.smallestInc)
      }
    ]
  }
  return sets;
}
