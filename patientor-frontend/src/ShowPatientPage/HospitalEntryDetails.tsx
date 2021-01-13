import React from 'react';
import { Icon } from 'semantic-ui-react';
import { HospitalEntry } from '../types';

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <>
      <h3 style={{ margin: 0 }}>{entry.date} <Icon name='hospital outline' /></h3>
      <div style={{ color: 'gray', marginBottom: 5 }}>{entry.description}</div>

      <div>
        {entry.discharge.date} &nbsp; {entry.discharge.criteria}
      </div>
    </>
  )
}

export default HospitalEntryDetails;