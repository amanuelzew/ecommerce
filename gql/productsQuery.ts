import { gql } from 'urql'

export const ProductsQuery = gql`
  query Query($input: paginationInput) {
    products(input: $input) {
      id
      name
      description
      category
      price
    }
  }
`