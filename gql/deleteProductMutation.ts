import { gql } from 'urql'

export const deleteMutation = gql`
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

