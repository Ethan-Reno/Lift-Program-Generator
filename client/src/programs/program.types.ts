export interface Lift {
  name: string;
  label: string;
  unit: string;
  default: string;
};

export interface LiftsFormState {
  [liftName: string]: {
    checked: boolean;
    oneRepMax: number;
  };
};

export interface ProgramInputs {
  uuid: string,
  title: string,
  cycles: number,
  lifts: LiftsFormState,
  smallestInc: number,
}