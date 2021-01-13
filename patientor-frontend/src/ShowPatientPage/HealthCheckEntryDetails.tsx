import React from 'react';
import { Icon, Rating } from 'semantic-ui-react';
import { HealthCheckEntry } from '../types';

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <>
      <h3 style={{ margin: 0 }}>{entry.date} <Icon name='user md' /></h3>
      <div style={{ color: 'gray', marginBottom: 5 }}>{entry.description}</div>

      <div>
        <Rating icon='heart' defaultRating={3 - entry.healthCheckRating} maxRating={3} disabled />
      </div>
    </>
  )
}

export default HealthCheckEntryDetails;