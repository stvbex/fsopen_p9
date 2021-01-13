import React from 'react';
import { NewEntryData } from '../types';
import AddEntryHealthCheckFormik from './AddEntryHealthCheckFormik';
import AddEntryHospitalFormik from './AddEntryHospitalFormik';
import AddEntryOccupationalHealthcareFormik from './AddEntryOccupationalHealthcareFormik';

const AddEntryFormikSep: React.FC<{ handleNewEntry: (newEntryData: NewEntryData) => void }> = ({ handleNewEntry }) => {
  const [type, setType] = React.useState<string>('HealthCheck');

  return (
    <div style={{ marginTop: 10, marginBottom: 10 }}>
      <fieldset>
      <legend>Add New Entry - Formik Form (separate)</legend>

      <div>
          <label htmlFor='typeInputFormik'>type: </label>
          <select id='typeInputFormik' value={type} onChange={event => setType(event.target.value)}>
            <option value='HealthCheck'>HealthCheck</option>
            <option value='OccupationalHealthcare'>OccupationalHealthcare</option>
            <option value='Hospital'>Hospital</option>
          </select>
        </div>

      {type === 'HealthCheck' && <AddEntryHealthCheckFormik handleNewEntry={handleNewEntry} />}
      {type === 'OccupationalHealthcare' && <AddEntryOccupationalHealthcareFormik handleNewEntry={handleNewEntry} />}
      {type === 'Hospital' && <AddEntryHospitalFormik handleNewEntry={handleNewEntry} />}

      </fieldset>
      
    </div>
  )
}

export default AddEntryFormikSep;