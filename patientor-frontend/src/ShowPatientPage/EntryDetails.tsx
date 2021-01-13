import React from 'react';
import { Card } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Entry } from '../types';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import HospitalEntryDetails from './HospitalEntryDetails';
import OccupationalHealthcareEntryDetails from './OccupationalHealthcareEntryDetails';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const renderSpecifics = () => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryDetails entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryDetails entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntryDetails entry={entry} />;
      default:
        return assertNever(entry);
    }
  }

  return (
    <Card fluid style={{ padding: 10 }}>

      {renderSpecifics()}

      {entry.diagnosisCodes
        ? <ul>
          {entry.diagnosisCodes.map(code =>
            <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
          )}
        </ul>
        : null
      }
    </Card>
  )
}

export default EntryDetails;