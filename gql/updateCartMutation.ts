import { gql } from 'urql'

export const updateCartMutation = gql` 
 mutation Mutation($input: addToCartInput!) {
  editCartItem(input: $input) {
      userId
  }
  }
`