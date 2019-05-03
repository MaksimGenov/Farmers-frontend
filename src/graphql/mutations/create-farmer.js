import gql from 'graphql-tag'

export default gql`
mutation CreateFarmer($data: FarmerInput!) {
  createFarmer(farmerInput: $data) {
    _id
    name
    town
    phoneNumbers
  }
}`
