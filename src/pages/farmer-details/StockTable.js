import React, { Fragment } from 'react'
import Stock from './Stock'
import Layout from '../../components/Layout'
import Wrapper from '../../components/Wrapper'

function StockTable ({ stocks }) {
  return (
    <Fragment>
      {/* table header */}
      <Layout>
        <h3 className='o-layout__item u-2/8@desktop u-1/3@mobile u-text--center'>Culture</h3>
        <h3 className='o-layout__item u-4/8@desktop u-2/3@mobile u-text--center'>Current/Total Tons</h3>
      </Layout>
      <div className='c-table__body'>
        <Wrapper>
          {stocks.sort((s1, s2) => s1.culture.name.localeCompare(s2.culture.name))
            .map(stock => <Stock key={stock._id} stock={stock} />)
          }
        </Wrapper>
      </div>
    </Fragment>
  )
}

export default StockTable
