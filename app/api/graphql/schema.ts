const schema=`#graphql
  enum Category {
    ELECTRONICS
    CLOTHING
    BOOKS
    HOME_GOODS
    OTHER
  }
  type User{
    id:ID!
    isAdmin:Boolean!
    email:String!
    firstName:String!
    lastName:String!
    token:String!
    cart:Cart!
  }
  type Product{
    id:ID!
    name:String!
    description:String!
    price:Float!
    quantity:Int!
    category:Category
  }
  type Cart{
    id:ID!
    userId:ID!
    cartItems:[CartItem!]
  }
  type CartItem{
    cartId:ID!
    productId:ID!
    product:Product!
    quantity:Int
  }
  type Order{
    id:ID!
    createdAt:String
    userId:ID!
    user:User!
    total:Float
    orderItems:[OrderItem!]
  }
  type OrderItem{
    orderId:ID!
    productId:ID!
    product:Product!
    quantity:Int
  }
  input createProductInput{
    name:String!
    description:String!
    price:Float!
    category:Category
    quantity:Int!
  }
  input editProductInput{
    name:String
    description:String
    price:Float
    category:Category
    quantity:Int
  }
  input signinUserInput{
    email:String!
    password:String!
  }
  input signupUserInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
  }
  input addToCartInput{
    productID:ID!
    quantity:Int
  }
  input paginationInput{
    limit:Int!
    offset:Int!
  }
  type Query{
    me:User
    products(input:paginationInput):[Product!]
    product(id:ID!):Product!
    cart:Cart!
    order:[Order!]
  }

  type Mutation{
    signin(input:signinUserInput!):User
    signup(input:signupUserInput!):User
    createProduct(input:createProductInput!):Product
    editProduct(id:ID!,input:editProductInput!):Product!
    deleteProduct(id:ID!):Product!
    createCartItem(input:addToCartInput!):Cart!
    editCartItem(input:addToCartInput!):Cart!
    deleteCartItem(id:ID!):Cart!
    clearCart:Cart!
    createOrder:Order!
  }
`
export default schema