import diagnoses from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const getAllDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getAllDiagnoses
};