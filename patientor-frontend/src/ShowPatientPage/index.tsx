import React from 'react';
import axios from 'axios';
import { NewEntryData, Patient } from '../types';

import { apiBaseUrl } from "../constants";
import { addEntry, setCurrentPatient, useStateValue } from '../state';
import { Card, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import EntryDetails from './EntryDetails';
import AddEntryForm from './AddEntryForm';
import AddEntryFormikSep from './AddEntryFormikSep';

const ShowPatientPage: React.FC = () => {
  const [{ currentPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(setCurrentPatient(res.data));
      }
      catch (error) {
        console.error(error);
      }
    }

    if (!currentPatient || currentPatient.id !== id) {
      fetchPatient();
    }
  }, [id, currentPatient, dispatch])

  const handleNewEntry = async (newEntryData: NewEntryData) => {

    if (!currentPatient) {
      throw new Error('No patient selected');
    }

    try {
      // backend request
      const res = await axios.post(`${apiBaseUrl}/patients/${currentPatient.id}/entries`, newEntryData);

      // update state
      dispatch(addEntry(res.data));
    }
    catch (error) {
      console.error(error);
    }
  }

  let formShow = 'formikSep';

  if (!currentPatient) {
    return null;
  }

  return (
    <div>
      <h2>{currentPatient.name} {currentPatient.gender === 'male' ? <Icon name='mars' /> : <Icon name='venus' />}</h2>
      <div>ssn: {currentPatient.ssn}</div>
      <div>occupation: {currentPatient.occupation}</div>

      {formShow === 'html' && <AddEntryForm handleNewEntry={handleNewEntry} />}
      {formShow === 'formikSep' && <AddEntryFormikSep handleNewEntry={handleNewEntry} />}

      <h3>Entries</h3>

      <Card.Group>
        {currentPatient.entries.map(entry => <EntryDetails key={entry.id} entry={entry} />)}
      </Card.Group>
    </div>
  )
}

export default ShowPatientPage;