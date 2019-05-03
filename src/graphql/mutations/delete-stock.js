import gql from 'graphql-tag'

export default gql`
mutation DeleteStock($id: ID!) {
  deleteStock(id: $id) {
    _id
    totalQuantity
    currentQuantity
    culture {
      _id
      name
    }
  }
}`
