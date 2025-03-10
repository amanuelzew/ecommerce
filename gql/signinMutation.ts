import { gql } from 'urql'

export const SigninMutation = gql`
 mutation Mutation($input: signinUserInput!) {
  signin(input: $input) {
    firstName
    lastName
    email
    isAdmin
    token
    cart {
      id
      cartItems {
        product {
          id
          name
          price
          description
          category
        }
        quantity
      }
    }
  }
}
`
