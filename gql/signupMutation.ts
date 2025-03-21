import { gql } from 'urql'

export const SignupMutation = gql`
  mutation Mutation($input: signupUserInput!) {
    signup(input: $input) {
      token
      email
      firstName
      lastName
      isAdmin
      cart {
        id
      }
    }
  }
`