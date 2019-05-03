import React from 'react'
import { Mutation } from 'react-apollo'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import LayoutItem from '../../components/LayoutItem'
import Wrapper from '../../components/Wrapper'
import ADD_STOCK from '../../graphql/mutations/add-stock'
import GET_FARMER from '../../graphql/queries/get-farmer'

export default function AddStock ({ farmerId }) {
  const updateCache = (cache, { data: { createStock: newStock } }) => {
    const { farmer } = cache.readQuery({ query: GET_FARMER, variables: { farmerId } })
    farmer.stocks.push(newStock)
    cache.writeQuery({
      query: GET_FARMER,
      data: { farmer }
    })
  }

  const validateForm = (values) => {
    let errors = {}
    if (!values.culture) errors.culture = 'Culture is required.'
    if (values.currentQuantity > values.totalQuantity) errors.currentQuantity = "Current quantity can't be more than total."
    return errors
  }
  return (
    <Mutation mutation={ADD_STOCK} update={updateCache}>
      {(createStock, { loading, error }) => {
        if (loading) return 'loading...'

        return (
          <Formik
            initialValues={{ farmerId, culture: '', currentQuantity: 0, totalQuantity: 0 }}
            validate={validateForm}
            onSubmit={(values, { setSubmitting }) => {
              createStock({ variables: { data: values } })
              setSubmitting(loading)
            }}
          >
            {({ isSubmitting, isValid, values }) => (
              <Wrapper>
                <Form className='o-layout o-layout--center o-layout--bottom'>
                  <LayoutItem className='u-2/9@desktop u-1/1@mobile'>
                    <label>Name</label>
                    <Field type='text' name='culture' placeholder="enter culture's name" className='c-input' />
                  </LayoutItem>
                  <LayoutItem className='u-2/9@desktop u-1/1@mobile'>
                    <label>Current Quantity</label>
                    <Field type='number' name='currentQuantity' className='c-input' />
                  </LayoutItem>
                  <LayoutItem className='u-2/9@desktop u-1/1@mobile'>
                    <label>Total Quantity</label>
                    <Field type='number' name='totalQuantity' className='c-input' />
                  </LayoutItem>
                  <LayoutItem className='u-1/9@desktop u-1/1@mobile'>
                    <button type='submit' disabled={!isValid || isSubmitting} className='c-btn c-btn--primary'>Add</button>
                  </LayoutItem>
                  <LayoutItem className='u-5/9@desktop u-1/1@mobile margin-top'>
                    <div className='c-notification c-notification--danger'>
                      <span><ErrorMessage name='culture' /> </span>
                      <ErrorMessage name='currentQuantity' />
                    </div>
                  </LayoutItem>
                </Form>
              </Wrapper>
            )}
          </Formik>
        )
      }}
    </Mutation>
  )
}
