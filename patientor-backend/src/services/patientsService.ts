import patients from '../../data/patients';
import { v4 as uuidv4} from 'uuid';
import { DisplayedPatient, NewPatientData, Patient } from '../types';

const getAllPatients = (): DisplayedPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries: []
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
    return {...patient, entries: []} as Patient;
  }
  return undefined;
}

export default {
  getAllPatients,
  addNewPatient,
  getPatientById
};