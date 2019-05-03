import React from 'react'
import { Mutation } from 'react-apollo'
import DELETE_STOCK from '../../graphql/mutations/delete-stock'
import GET_FARMER from '../../graphql/queries/get-farmer'
import { withRouter } from 'react-router-dom'
import TableData from '../../components/TableData'
import ProgressBar from '../../components/ProgressBar'
import Layout from '../../components/Layout'
import LayoutItem from '../../components/LayoutItem'

function Stock ({ stock, match: pathMatch }) {
  const farmerId = pathMatch.params.id

  const updateCache = (cache, { data: { deleteStock: removedStock } }) => {
    const { farmer } = cache.readQuery({ query: GET_FARMER, variables: { farmerId } })
    farmer.stocks = farmer.stocks.filter(s => s._id.toString() !== removedStock._id.toString())
    cache.writeQuery({
      query: GET_FARMER,
      data: { farmer }
    })
  }

  return (
    <Layout className='o-layout--center margin-bottom'>
      <LayoutItem className='u-2/8@desktop u-1/3@mobile'>
        <TableData>
          {stock.culture.name}
        </TableData>
      </LayoutItem>
      <LayoutItem className='u-4/8@desktop u-2/3@mobile'>
        <ProgressBar current={stock.currentQuantity} total={stock.totalQuantity} />
      </LayoutItem>
      <LayoutItem className='u-1/8@desktop u-1/2@mobile'>
        <button className='c-btn c-btn--warning'>update</button>
      </LayoutItem>
      <LayoutItem className='u-1/8@desktop u-1/2@mobile'>
        <Mutation mutation={DELETE_STOCK} update={updateCache}>
          {(deleteStock, { loading, error }) => {
            if (error) return <p>{console.log(error)}</p>

            return (
              <button
                type='button'
                className='c-btn c-btn--danger'
                disabled={loading}
                onClick={() => deleteStock({ variables: { id: stock._id } })}
              >
                delete
              </button>
            )
          }}
        </Mutation>
      </LayoutItem>
    </Layout>
  )
}

export default withRouter(Stock)
