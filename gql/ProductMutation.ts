import { gql } from 'urql'

export const ProductMutation = gql`
  mutation CreateProduct($input: createProductInput!) {
    createProduct(input: $input) {
        id
        name
        description
        category
        price
    }
  }
`
