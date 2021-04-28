
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
  complete: boolean;
  sets: Set[];
}

export interface Set {
  reps: number;
  weight: number;
}

export interface AmrapData {
  lift: string,
  timestamp: number,
  weight: number,
  reps: number,
  c1RM: number,
  programUuid: number,
  programTitle: string,
  cycle: number,
  session: number,
}
