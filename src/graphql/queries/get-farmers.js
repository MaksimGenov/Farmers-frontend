import gql from 'graphql-tag'

export default gql`
query GetFarmers {
  farmers {
    _id
    name
    town
    phoneNumbers
  }
}`
