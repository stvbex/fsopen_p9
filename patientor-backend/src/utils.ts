import { Entry, Gender, HealthCheckRating, NewPatientData } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (text: any): text is Gender => {
  return Object.values(Gender).includes(text);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
}

export const idParser = (id: any): string => {
  if (!id || !isString(id)) {
    throw new Error(`Incorrect type or missing id ${id as string}`);
  }
  return id;
}

const nameParser = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect type or missing name ${name as string}`);
  }
  return name;
};

const dateParser = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect type or missing ${date as string}`);
  }
  return date;
};

const ssnParser = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect type or missing ssn ${ssn as string}`);
  }
  return ssn;
};

const genderParser = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect type or missing gender ${gender as string}`);
  }
  return gender;
};

const occupationParser = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect type or missing occupation ${occupation as string}`);
  }
  return occupation;
};

const descriptionParser = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect type or missing description ${description as string}`);
  }
  return description;
}

const typeParser = (type: any): string => {
  if (!type || !isString(type)) {
    throw new Error(`Incorrect type or missing type ${type as string}`);
  }
  return type;
}

const specialistParser = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect type or missing specialist ${specialist as string}`);
  }
  return specialist;
}

const stringParser = (str: any): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect type or missing ${str as string}`);
  }
  return str;
}

const healthCheckRatingParser = (rating: any): HealthCheckRating => {
  if (!(rating || rating === 0) || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect type or missing healthCheckRating ${rating as string}`);
  }
  return rating;
}

export const toNewPatientData = (body: any): NewPatientData => {

  return {
    name: nameParser(body.name),
    dateOfBirth: dateParser(body.dateOfBirth),
    ssn: ssnParser(body.ssn),
    gender: genderParser(body.gender),
    occupation: occupationParser(body.occupation),
    entries: []
  };
};

export const toNewEntryData = (body: any): Omit<Entry, 'id'> => {
  const baseEntry = {
    description: descriptionParser(body.description),
    type: typeParser(body.type),
    date: dateParser(body.date),
    specialist: specialistParser(body.specialist),
    diagnosisCodes: body.diagnosisCodes? body.diagnosisCodes.map((code: any) => stringParser(code)) : []
  };

  switch (baseEntry.type) {
    case "Hospital":
      if (!body.discharge) {
        throw new Error('Missing discharge');
      }
      return {
        discharge: {
          date: dateParser(body.discharge.date),
          criteria: stringParser(body.discharge.criteria)
        },
        ...baseEntry
      } as Omit<Entry, 'id'>;

    case "HealthCheck":
      return {
        healthCheckRating: healthCheckRatingParser(body.healthCheckRating),
        ...baseEntry
      } as Omit<Entry, 'id'>;

    case "OccupationalHealthcare":
      if (body.sickLeave) {        
        return {
          employerName: stringParser(body.employerName),
          sickLeave: {
            startDate: dateParser(body.sickLeave.startDate),
            endDate: dateParser(body.sickLeave.endDate)
          },
          ...baseEntry
        } as Omit<Entry, 'id'>;
      }
      else {
        return {
          employerName: stringParser(body.employerName),
          ...baseEntry
        } as Omit<Entry, 'id'>;
      }

    default:
      throw new Error('Invalid entry type');
  }
}