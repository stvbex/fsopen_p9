import React, { SyntheticEvent } from 'react';
import { useStateValue } from '../state';
import { NewEntryData } from '../types';

interface ComponentTypes {
  handleNewEntry: (newEntryData: NewEntryData) => void
}

const AddEntryForm: React.FC<ComponentTypes> = ({ handleNewEntry }) => {
  const [{ diagnoses },] = useStateValue();

  const [type, setType] = React.useState<string>('HealthCheck');
  const [description, setDescritpion] = React.useState<string>('');
  const [date, setDate] = React.useState<string>('');
  const [specialist, setSpecialist] = React.useState<string>('');
  const [code, setCode] = React.useState<string>('M24.2');
  const [codes, setCodes] = React.useState<string[]>([]);

  // HealthCheck specific
  const [ratingInv, setRatingInv] = React.useState<string>('0');

  // OccupationalHealthcare specific
  const [employerName, setEmployerName] = React.useState<string>('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = React.useState<string>('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = React.useState<string>('');

  // Hospital specific
  const [dischargeDate, setDischargeDate] = React.useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = React.useState<string>('');

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()

    // create new entry
    switch (type) {
      case 'HealthCheck':
        const newEntryData = {
          type,
          description,
          date,
          specialist,
          diagnosisCodes: codes,
          healthCheckRating: 3 - Number(ratingInv)
        }
        handleNewEntry(newEntryData)
    }

    // reset form 
    setDescritpion('')
    setDate('')
    setSpecialist('')
    setCode('M24.2')
    setCodes([])
    setRatingInv('0')
    setEmployerName('')
    setSickLeaveStartDate('')
    setSickLeaveEndDate('')
    setDischargeDate('')
    setDischargeCriteria('')
  }

  const handleNewCode = (event: SyntheticEvent) => {
    event.preventDefault()

    if (!codes.includes(code)) {
      setCodes(codes.concat(code))
    }
  }

  const specializedInputs = () => {
    switch (type) {
      case 'HealthCheck':
        return (
          <div>
            <label htmlFor='healthRatingInput'>health check rating: </label>
            <input
              id='healthRatingInput'
              type='range'
              min={0} max={3} step={1}
              value={ratingInv}
              onChange={event => setRatingInv(event.target.value)}
            />
          </div>
        );
      case 'OccupationalHealthcare':
        return (
          <div>
            <div>
              <label htmlFor='empNameInput'>employer name</label>
              <input
                id='empNameInput'
                value={employerName}
                onChange={event => setEmployerName(event.target.value)}
              />
            </div>
            <div>
              sick leave
              <div>
                <label htmlFor='sickLeaveStartDate'>start date: </label>
                <input
                  id='sickLeaveStartDate'
                  type='date'
                  value={sickLeaveStartDate}
                  onChange={event => setSickLeaveStartDate(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor='sickLeaveEndDate'>end date: </label>
                <input
                  id='sickLeaveEndDate'
                  type='date'
                  value={sickLeaveEndDate}
                  onChange={event => setSickLeaveEndDate(event.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case 'Hospital':
        return (
          <div>
            discharge
            <div>
              <label htmlFor='dischargeDate'>date: </label>
              <input
                id='dischargeDate'
                type='date'
                value={dischargeDate}
                onChange={event => setDischargeDate(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor='dischargeCriteria'>criteria: </label>
              <input
                id='dischargeCriteria'
                value={dischargeCriteria}
                onChange={event => setDischargeCriteria(event.target.value)}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  }


  return (
    <div>

      <form onSubmit={handleSubmit} style={{ marginTop: 10, marginBottom: 10 }}>
        <fieldset>
          <legend>Add New Entry - HTML Form</legend>
          <div>
            <label htmlFor='typeInput'>type: </label>
            <select id='typeInput' value={type} onChange={event => setType(event.target.value)}>
              <option value='HealthCheck'>HealthCheck</option>
              <option value='OccupationalHealthcare'>OccupationalHealthcare</option>
              <option value='Hospital'>Hospital</option>
            </select>
          </div>

          <div>
            <label htmlFor='descInput'>description: </label>
            <textarea
              id='descInput'
              rows={3} cols={90}
              value={description}
              onChange={event => setDescritpion(event.target.value)}
              style={{ resize: 'none' }}
            />
          </div>

          <div>
            <label htmlFor='dateInput'>date: </label>
            <input
              id='dateInput'
              type='date'
              value={date}
              onChange={event => setDate(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor='specialistInput'>specialist: </label>
            <input id='specialistInput' value={specialist} onChange={event => setSpecialist(event.target.value)} />
          </div>

          <div>
            <label htmlFor='codeInput'>diagnosis codes: </label>
            <select id='codeInput' value={code} onChange={event => setCode(event.target.value)}>
              {diagnoses?.map(d =>
                <option key={d.code} value={d.code}>{d.code} - {d.name}</option>
              )}
            </select>
            <button onClick={handleNewCode}>
              add code
          </button>
            <div>
              <ul>
                {codes.map((code, i) => <li key={i}>{code} - {diagnoses.find(d => d.code === code)?.name}</li>)}
              </ul>
            </div>
          </div>

          {specializedInputs()}

          <button type='submit'>add entry</button>
        </fieldset>
      </form>
    </div>
  )
}

export default AddEntryForm;