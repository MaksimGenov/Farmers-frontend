import gql from 'graphql-tag'

export default gql`
mutation AddStock($data: StockInput!) {
  createStock(stockInput: $data) {
    _id
    totalQuantity
    currentQuantity
    culture {
      _id
      name
    }
  }
}`
