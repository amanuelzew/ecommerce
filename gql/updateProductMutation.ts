import { gql } from 'urql'

export const updateProductMutation = gql`
  mutation EditProduct($editProductId: ID!, $input: editProductInput!) {
    editProduct(id: $editProductId, input: $input) {
        id
        name
        description
        category
        price
    }
  }
`

