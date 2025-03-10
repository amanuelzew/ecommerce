import { gql } from 'urql'

export const deleteCartMutation = gql`
 mutation Mutation($deleteCartItemId: ID!) {
  deleteCartItem(id: $deleteCartItemId) {
    userId
  }
  }
`


