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
  dischargeDate: string;
  dischargeCriteria: string;
}

const AddEntryHospitalFormik: React.FC<{ handleNewEntry: (newEntryData: NewEntryData) => void }> = ({ handleNewEntry }) => {
  const [{ diagnoses },] = useStateValue();

  const initialValues: ValueTypes = {
    specialist: '',
    date: '',
    description: '',
    code: 'M24.2',
    codes: [],
    dischargeDate: '',
    dischargeCriteria: ''
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
          if (!values.dischargeDate) {
            errors.dischargeDate = 'Discharge date required'
          }
          if (!values.dischargeCriteria) {
            errors.dischargeCriteria = 'Discharge criteria required'
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          handleNewEntry({
            type: 'Hospital',
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            diagnosisCodes: values.codes,
            discharge: {
              date: values.dischargeDate,
              criteria: values.dischargeCriteria
            }
          } as NewEntryData)

          resetForm()
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
                <label htmlFor='dischargeDateInputFormik'>health check rating: </label>
                <Field
                  id='dischargeDateInputFormik'
                  type='date'
                  name='dischargeDate'
                />
                <div style={{ color: 'red' }}>
                  <ErrorMessage name='dischargeDate' />
                </div>
              </div>

              <div>
                <label htmlFor='dischargeCriteriaInputFormik'>health check rating: </label>
                <Field
                  id='dischargeCriteriaInputFormik'
                  name='dischargeCriteria'
                />
                <div style={{ color: 'red' }}>
                  <ErrorMessage name='dischargeCriteria' />
                </div>
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

export default AddEntryHospitalFormik;