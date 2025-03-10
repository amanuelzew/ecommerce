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
    category:Category
  }
  type CartItem{
    cartId:ID!
    productId:ID!
    product:Product!
    quantity:Int
  }
  type Cart{
    id:ID!
    userId:ID!
    cartItems:[CartItem!]
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
  type Query{
    me:User
    products:[Product!]
    product(id:ID!):Product!
    cart:Cart!
  }

  type Mutation{
    signin(input:signinUserInput!):User
    signup(input:signupUserInput!):User
    createProduct(input:createProductInput!):Product
    editProduct(id:ID!,input:editProductInput!):Product!
    deleteProduct(id:ID!):Product!
    addToCart(input:addToCartInput!):Cart!
  }
`
export default schema