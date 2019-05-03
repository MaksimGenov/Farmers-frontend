import React from 'react'
import { Query } from 'react-apollo'
import GET_FARMERS from '../../../graphql/queries/get-farmers'
import Farmer from './Farmer'
import Wrapper from '../../../components/Wrapper'

export default function FarmersList () {
  return (
    <Query query={GET_FARMERS}>
      {({ loading, error, data, refetch }) => {
        if (loading) return <p>loading...</p>
        if (error) return <p>{error.message}</p>
        const { farmers } = data
        return (
          <div className='c-table__body'>
            <Wrapper>
              {farmers.map((f, index) => <Farmer key={index} farmer={f} />)}
            </Wrapper>
          </div>
        )
      }}
    </Query>
  )
}
