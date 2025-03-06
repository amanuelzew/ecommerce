const schema=`#graphql
  type User{
    id:ID!
    email:String!
    firstName:String!
    lastName:String!
  }
  input signinUserInput{
    email:String!
    password:String!
  }
  input signupUserInput{
    email:String!
    password:String!
    firstName:String!
    lastName:String!
  }
  type Query{
    me:User
  }
  type Mutation{
    signin(input:signinUserInput!):User
    signup(input:signupUserInput!):User
  }
`
export default schema