import React from 'react';
import { Icon } from 'semantic-ui-react';
import { OccupationalHealthCareEntry } from '../types';

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthCareEntry }> = ({ entry }) => {
  return (
    <>
      <h3 style={{ margin: 0 }}>{entry.date} <Icon name='stethoscope' /></h3>
      <div style={{ color: 'gray', marginBottom: 5 }}>{entry.description}</div>

      <div>
        {entry.employerName}
        {entry.sickLeave
          ? <>&nbsp;-&nbsp;Start: &nbsp; {entry.sickLeave.startDate} &nbsp; End: &nbsp; {entry.sickLeave.endDate}</>
          : null
        }
      </div>
    </>
  )
}

export default OccupationalHealthcareEntryDetails;