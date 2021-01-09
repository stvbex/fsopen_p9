import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientData, idParser } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getAllPatients());
});

router.post('/', (req, res) => {
  try {
    const patientData = toNewPatientData(req.body);
    const addedPatient = patientsService.addNewPatient(patientData);
    res.json(addedPatient);
  }
  catch (error) {
    res.status(400).send(error as string);
  }
});

router.get('/:id', (req, res) => {
  const id = idParser(req.params.id);
  const patient = patientsService.getPatientById(id);

  if (patient) {
    res.json(patient);
  }
  else {
    res.status(404).end();
  }
})

export default router;