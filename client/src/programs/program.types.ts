export interface LiftType {
  name: string;
  label: string;
  unit: string;
  default: string;
};

export interface LiftsFormState {
  [liftName: string]: {
    checked: boolean;
    oneRepMax: number;
    cycleIncrement: number;
  };
};

export interface ProgramInputs {
  uuid: string;
  title: string;
  cycles: number;
  lifts: LiftsFormState;
  roundNumber: number;
};

export interface Program {
  uuid: string;
  title: string;
  cycles: Cycle[];
  roundNumber: number;
} 

export interface Cycle {
  lifts: Lift[];
}

export interface Lift {
  name: string;
  sessions: Session[];
}

export interface Session {
  number: number;
  sets: Set[];
}

export interface Set {
  reps: number;
  weight: number;
}

// interface AmprapData {
//   lifts: { [liftName: string]: AmprapLift };
// }

// interface AmprapLift {
//   data: AmrapLiftDataPoint[];  
// }

// interface AmrapLiftDataPoint {
//   timestamp: Date;
//   reps: number;
//   weight: number;
//   c1RM: number;
//   programUuid: string;
//   programTitle: string;
//   cycle: number;
//   session: number;
// }

export interface AmrapData {
  liftName: string,
  timestamp: number,
  weight: number,
  reps: number,
  c1RM: number,
  programUuid: number,
  programTitle: string,
  cycle: number,
  session: number,
}