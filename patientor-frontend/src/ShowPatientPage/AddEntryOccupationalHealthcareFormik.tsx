import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { useStateValue } from '../state';
import { NewEntryData } from '../types';

interface ValueTypes {
  specialist: string;
  date: string;
  description: string;
  code: string;
  codes: string[];
  employerName: string;
  sickLeaveStartDate: string;
  sickLeaveEndDate: string;
}

const AddEntryOccupationalHealthcareFormik: React.FC<{ handleNewEntry: (newEntryData: NewEntryData) => void }> = ({ handleNewEntry }) => {
  const [{ diagnoses },] = useStateValue();

  const initialValues: ValueTypes = {
    specialist: '',
    date: '',
    description: '',
    code: 'M24.2',
    codes: [],
    employerName: '',
    sickLeaveStartDate: '',
    sickLeaveEndDate: ''
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors: { [field: string]: string } = {};
          if (!values.specialist) {
            errors.specialist = 'Specialist required'
          }
          if (!values.date) {
            errors.date = 'Date required'
          }
          if (!values.description) {
            errors.description = 'Description required'
          }
          if (!values.employerName) {
            errors.employerName = 'Employer name required'
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {

          if (values.sickLeaveStartDate && values.sickLeaveEndDate) {
            handleNewEntry({
              type: 'OccupationalHealthcare',
              description: values.description,
              date: values.date,
              specialist: values.specialist,
              diagnosisCodes: values.codes,
              employerName: values.employerName,
              sickLeave: {
                startDate: values.sickLeaveStartDate,
                endDate: values.sickLeaveEndDate
              }
            } as NewEntryData)
          }
          else {
            handleNewEntry({
              type: 'OccupationalHealthcare',
              description: values.description,
              date: values.date,
              specialist: values.specialist,
              diagnosisCodes: values.codes,
              employerName: values.employerName
            } as NewEntryData)
          }

          resetForm();
        }}
      >
        {({ isSubmitting, isValid, dirty, values, handleChange, handleBlur }) => {
          return (
            <Form>
              <div>
                <label htmlFor='descInputFormik'>description: </label>
                <textarea
                  id='descInputFormik'
                  name='description'
                  rows={3} cols={90}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ resize: 'none' }}
                />
                <div style={{ color: 'red' }}>
                  <ErrorMessage name='description' />
                </div>
              </div>

              <div>
                <label htmlFor="dateInputFormik">date: </label>
                <Field id='dateInputFormik' type='date' name='date' />
                <div style={{ color: 'red' }}>
                  <ErrorMessage name='date' />
                </div>
              </div>

              <div>
                <label htmlFor='specialistInputFormik'>specialist: </label>
                <Field id='specialistInputFormik' type='text' name='specialist' />
                <div style={{ color: 'red' }}>
                  <ErrorMessage name='specialist' />
                </div>
              </div>

              <div>
                <label htmlFor='codeInputFormik'>diagnosis codes: </label>
                <select id='codeInputFormik' name='code' value={values.code} onChange={handleChange}>
                  {diagnoses?.map(d =>
                    <option key={d.code} value={d.code}>{d.code} - {d.name}</option>
                  )}
                </select>
                <FieldArray name='codes'>
                  {({ insert, remove, push }) => (
                    <button type='button' onClick={() => values.codes.includes(values.code) ? null : push(values.code)}>
                      add code
                    </button>
                  )}
                </FieldArray>
                <div>
                  <ul>
                    {values.codes.map((code, i) => <li key={i}>{code} - {diagnoses.find(d => d.code === code)?.name}</li>)}
                  </ul>
                </div>
              </div>

              <div>
                <label htmlFor='employerNameInputFormik'>employer name: </label>
                <Field id='employerNameInputFormik' name='employerName' />
                <div style={{ color: 'red' }}>
                  <ErrorMessage name='employerName' />
                </div>
              </div>

              <div>sick leave</div>

              <div>
                <label htmlFor='sickLeaveStartDateInputFormik'>start date: </label>
                <Field id='sickLeaveStartDateInputFormik' name='sickLeaveStartDate' type='date' />
              </div>

              <div>
                <label htmlFor='sickLeaveEndDateInputFormik'>end date: </label>
                <Field id='sickLeaveEndDateInputFormik' name='sickLeaveEndDate' type='date' />
              </div>

              <button type="submit" disabled={isSubmitting || !isValid || !dirty}>
                add entry
              </button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default AddEntryOccupationalHealthcareFormik;