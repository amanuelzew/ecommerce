import { gql } from 'urql'

export const ProductsQuery = gql`
  query{
    products {
      id
      name
      description
      category
      price
    }
  }
`