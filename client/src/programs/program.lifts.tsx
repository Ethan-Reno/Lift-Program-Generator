import { LiftType } from './program.types';

export const lifts: LiftType[] = [
  {
    name: "Squat",
    label: "Squat",
    unit: "lbs",
    default: "100",
  },
  {
    name: "Bench Press",
    label: "Bench Press",
    unit: "lbs",
    default: "100",
  },
  {
    name: "Deadlift",
    label: "Deadlift",
    unit: "lbs",
    default: "100",
  },
  {
    name: "Overhead Press",
    label: "Overhead Press",
    unit: "lbs",
    default: "100",
  },
  {
    name: "Pendlay Row",
    label: "Pendlay Row",
    unit: "lbs",
    default: "100",
  }
];

export const sessions = [
  {
    setValues: {
      one: .4,
      two: .47,
      three: .55,
      four: .65,
      five: .75,
      six: .85
    },
    repValues: {
      one: 5,
      two: 5,
      three: 5,
      four: 5,
      five: 5,
      six: 'i'
    }
  },

  {
    setValues: {
      one: .4,
      two: .5,
      three: .6,
      four: .7,
      five: .8,
      six: .9
    },
    repValues: {
      one: 5,
      two: 5,
      three: 5,
      four: 5,
      five: 3,
      six: 'i'
    }
  },

  {
    setValues: {
      one: .4,
      two: .5,
      three: .6,
      four: .75,
      five: .85,
      six: .95
    },
    repValues: {
      one: 5,
      two: 5,
      three: 5,
      four: 3,
      five: 3,
      six: 'i'
    }
  },

  {
    setValues: {
      one: .4,
      two: .45,
      three: .5,
      four: .55,
      five: .6,
      six: .6
    },
    repValues: {
      one: 5,
      two: 5,
      three: 5,
      four: 5,
      five: 5,
      six: 'i'
    }
  }
]
