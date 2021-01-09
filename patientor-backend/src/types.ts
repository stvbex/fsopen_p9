export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female'
}

export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NewPatientData = Omit<Patient, 'id'>;
export type DisplayedPatient = Omit<Patient, 'ssn'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>