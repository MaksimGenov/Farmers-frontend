import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import { Mutation } from 'react-apollo'
import GET_FARMERS from '../../../graphql/queries/get-farmers'
import CREATE_FARMER from '../../../graphql/mutations/create-farmer'
import LayoutItem from '../../../components/LayoutItem'

const INPUTS = {
  fields: [
    {
      name: 'name',
      placeholder: "farmer's name",
      type: 'text',
      initialValue: '',
      required: true
    },
    {
      name: 'town',
      placeholder: "farmer's town",
      type: 'text',
      initialValue: '',
      required: true
    }
  ],
  fieldArrays: [
    {
      name: 'phoneNumbers',
      type: 'text',
      placeholder: 'phone number',
      initialValue: [''],
      required: true
    }
  ]
}

function CreateFarmer (props) {
  const validateForm = (values) => {
    let errors = {}
    INPUTS.fields.forEach((field, index) => {
      if (!values[field.name] && field.required) {
        errors[field.name] = `${field.name} is required.`
      }
    })
    // INPUTS.fieldArrays.forEach((array) => {
    //   values[array.name].forEach((value, index) => {
    //     if (!value && array.required) {
    //       errors[`${array.name}.${index}`] = `${array.name} are required.`
    //     }
    //   })
    // })
    return errors
  }

  const setInitialValues = () => {
    let initialValues = {}
    INPUTS.fields.forEach(input => { initialValues[input.name] = input.initialValue })
    INPUTS.fieldArrays.forEach(array => { initialValues[array.name] = array.initialValue })
    return initialValues
  }

  const onSubmit = ({ createFarmer, loading }) => {
    return ({ name, town, phoneNumbers }, { setSubmitting }) => {
      createFarmer({ variables: { data: { name, town, phoneNumbers } } })
      setSubmitting(loading)
    }
  }

  const updateCache = (cache, { data: { createFarmer: newFarmer } }) => {
    const { farmers } = cache.readQuery({ query: GET_FARMERS })
    cache.writeQuery({
      query: GET_FARMERS,
      data: { farmers: [...farmers, newFarmer] }
    })
  }

  const renderFields = () => INPUTS.fields.map(({ name, placeholder, type }, index) => (
    <LayoutItem key={index} className='u-3/12@desktop u-1/1@mobile'>
      <Field type={type} name={name} placeholder={placeholder} className='c-input' />
      <ErrorMessage name={name} component='div' />
    </LayoutItem>
  ))

  const renderFieldArray = (values) => {
    return <FieldArray
      name='phoneNumbers'
      render={arrayHelpers => (
        <LayoutItem className='u-3/12@desktop'>
          {values.phoneNumbers.map((n, index) => (
            <div key={index} className='o-layout--flush'>
              <LayoutItem className='u-9/12'>
                <Field name={`phoneNumbers.${index}`} type='text' placeholder='phone number...' className='c-input' />
              </LayoutItem>
              {index > 0
                ? <LayoutItem className='u-3/12'>
                  <button
                    className='c-btn'
                    type='button'
                    onClick={() => arrayHelpers.remove(index)}
                  >-</button>
                </LayoutItem>
                : <LayoutItem className='u-3/12'>
                  <button
                    className='c-btn'
                    type='button'
                    onClick={() => arrayHelpers.insert(index, '')}
                  >+</button>
                </LayoutItem>
              }
            </div>
          ))}
        </LayoutItem>
      )}
    />
  }

  // const renderFieldArrays = (formArraysValues) => INPUTS.fieldArrays.map(({ name, type, placeholder }, arrayIndex) => {
  //   return <FieldArray
  //     key={arrayIndex}
  //     name={name}
  //     render={arrayHelpers => (
  //       <div className='o-layout__item u-3/12@desktop'>
  //         {formArraysValues[name].map((n, index) => (
  //           <div key={index} className='o-layout--flush'>
  //             <div className='o-layout__item u-9/12'>
  //               <Field name={`${name}.${index}`} type={type} placeholder={placeholder} className='c-input' />
  //             </div>
  //             {index > 0
  //               ? <div className='o-layout__item u-3/12'>
  //                 <button
  //                   className='c-btn c-btn--small'
  //                   type='button'
  //                   onClick={() => arrayHelpers.remove(index)}
  //                 >-</button>
  //               </div>
  //               : <div className='o-layout__item u-3/12'>
  //                 <button
  //                   className='c-btn c-btn--small'
  //                   type='button'
  //                   onClick={() => arrayHelpers.insert(index, '')}
  //                 >+</button>
  //               </div>
  //             }
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //   />
  // })

  return (
    <Mutation mutation={CREATE_FARMER} update={updateCache}>
      {(createFarmer, { loading, error }) => {
        if (loading) return 'loading...'

        return (
          <Formik
            initialValues={setInitialValues()}
            validate={validateForm}
            onSubmit={onSubmit({ createFarmer, loading })}
          >
            {({ isSubmitting, isValid, values }) => (
              <Form >
                {renderFields()}
                {renderFieldArray(values)}
                <LayoutItem className='u-2/9@desktop u-1/1@mobile'>
                  <button type='submit' disabled={!isValid || isSubmitting} className='c-btn c-btn--primary'>Add</button>
                </LayoutItem>
              </Form>
            )}
          </Formik>
        )
      }}
    </Mutation>
  )
}

export default CreateFarmer
