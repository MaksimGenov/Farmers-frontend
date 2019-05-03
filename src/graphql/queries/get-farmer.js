import gql from 'graphql-tag'

export default gql`
query GET_FARMER($farmerId: ID!) {
  farmer(id: $farmerId) {
    _id
    name
    town
    phoneNumbers
    stocks {
      _id
      totalQuantity
      currentQuantity
      culture{
        _id
        name
      }
    }
  }
}`
