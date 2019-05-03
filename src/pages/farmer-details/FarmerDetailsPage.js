import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import StockTable from './StockTable'
import AddStock from './AddStock'
import GET_FARMER from '../../graphql/queries/get-farmer'
import Layout from '../../components/Layout'
import LayoutItem from '../../components/LayoutItem'

function FarmerDetailsPage (props) {
  return (
    <Query query={GET_FARMER} variables={{ farmerId: props.match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) return 'loading...'
        if (error) console.log(error)
        return (
          <Fragment>
            <h1>Farmer: {data.farmer.name}</h1>
            <Layout className='o-layout--center'>
              <LayoutItem className='u-4/5@desktop'>
                <StockTable stocks={data.farmer.stocks} />
              </LayoutItem>
              <LayoutItem className='u-4/5@desktop'>
                <AddStock farmerId={data.farmer._id} />
              </LayoutItem>
            </Layout>
          </Fragment>
        )
      }}
    </Query>
  )
}

export default FarmerDetailsPage
