import { gql } from 'urql'

export const ProductQuery = gql`
  query($productId: ID!)  {
  product(id: $productId) {
    id
    name
    description
    price
    category
    quantity
  }
}
`