import { Gender, NewPatientData } from './types';

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

const dateOfBirthParser = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`Incorrect type or missing dateOfBirth ${dateOfBirth as string}`);
  }
  return dateOfBirth;
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

export const toNewPatientData = (body: any): NewPatientData => {
  
  return {
    name: nameParser(body.name),
    dateOfBirth: dateOfBirthParser(body.dateOfBirth),
    ssn: ssnParser(body.ssn),
    gender: genderParser(body.gender),
    occupation: occupationParser(body.occupation),
    entries: []
  };
};