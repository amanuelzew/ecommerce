import { gql } from 'urql'

export const CartMutation = gql`
 mutation Mutation($input: addToCartInput!) {
  createCartItem(input: $input) {
      id
      userId
    }
  }
`

