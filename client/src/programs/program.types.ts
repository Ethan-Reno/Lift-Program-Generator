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
  sets: Set[];
}

export interface Set {
  reps: number;
  weight: number;
}
