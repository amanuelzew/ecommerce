import { gql } from 'urql'

export const orderMutation = gql`
mutation CreateOrder {
  createOrder {
    total
  }
}
`
