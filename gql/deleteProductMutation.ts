import { gql } from 'urql'

export const deleteProductMutation = gql`
  mutation DeleteProduct($deleteProductId: ID!) {
  deleteProduct(id: $deleteProductId) {
    id
    name
    description
    category
    price
  }
}
`

