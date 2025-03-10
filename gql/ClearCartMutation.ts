import { gql } from 'urql'

export const clearCartMutation = gql`
mutation Mutation {
  clearCart {
    id
  }
}
`
