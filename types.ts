import { Cart, Category, Product } from "@prisma/client";

export type GQLContext = {
    user?: { id: string; email: string;isAdmin:boolean; firstName:String; lastName:String,cart:Cart } | null
}
export type signinUserInput = {
    email: string
    password: string
}
export type signupUserInput = {
    email: string
    password: string
    firstName: string
    lastName: string
}
export type createProductInput={
    name:string
    description:string
    price:number
    quantity:number
    category?:Category
}
export type editProductInput={
    name?:string
    description?:string
    price?:number
    quantity?:number
    category?:Category
}

export type addToCartInput={
    productID:string
    quantity:number
}