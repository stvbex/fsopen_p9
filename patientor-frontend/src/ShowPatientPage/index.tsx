import React from 'react';
import axios from 'axios';
import { Patient } from '../types';

import { apiBaseUrl } from "../constants";
import { useStateValue } from '../state';
import { Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

const ShowPatientPage: React.FC= () => {
  const [{ currentPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch({ type: "SET_CURRENT_PATIENT", payload: res.data });
      }
      catch (error) {
        console.error(error);
      }
      
    }

    if (!currentPatient || currentPatient.id !== id){
      fetchPatient();
    }
  }, [id, currentPatient, dispatch])

  if (!currentPatient) {
    return null;
  }

  return (
    <div>
      <h2>{currentPatient.name} {currentPatient.gender === 'male' ? <Icon name='mars'/> : <Icon name='venus'/>}</h2>
      <p>ssn: {currentPatient.ssn}</p>
      <p>occupation: {currentPatient.occupation}</p>
    </div>
  )
}

export default ShowPatientPage;