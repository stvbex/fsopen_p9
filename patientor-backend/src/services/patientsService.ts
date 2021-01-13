import patients from '../../data/patients';
import { v4 as uuidv4} from 'uuid';
import { DisplayedPatient, Entry, NewPatientData, Patient } from '../types';

const getAllPatients = (): DisplayedPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addNewPatient = (patientData: NewPatientData): Patient => {
  const newPatient: Patient = {
    id: uuidv4(),
    ...patientData
  };

  patients.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  const patient =  patients.find(p => p.id === id);

  if (patient) {
    return patient;
  }
  return undefined;
}

const addNewEntry = (id: string, newEntryData: Omit<Entry, 'id'>): Patient | undefined => {
  const patient =  patients.find(p => p.id === id);

  if (patient) {
    const newEntry: Entry = {
      id: uuidv4(),
      ...newEntryData
    } as Entry
    patient.entries = [newEntry].concat(patient.entries);

    return patient;
  }
  return undefined;
}

export default {
  getAllPatients,
  addNewPatient,
  getPatientById,
  addNewEntry
};