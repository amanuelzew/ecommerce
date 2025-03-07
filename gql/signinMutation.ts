import { gql } from 'urql'

export const SigninMutation = gql`
  mutation Mutation($input: signinUserInput!) {
    signin(input: $input) {
      token
    }
  }
`