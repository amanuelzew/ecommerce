import { gql } from 'urql'

export const orderQuery = gql`
  query Query {
  order {
    id
    total
    createdAt
    orderItems {
      orderId
      quantity
      product {
        id
        name
        price
      }
    }
    user {
      firstName
      lastName
    }
  }
}
`
