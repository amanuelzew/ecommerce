import { signin, signup } from "@/utils/auth"
import { GraphQLError } from "graphql"
import db from "@/utils/db"
import { GQLContext, signinUserInput, signupUserInput, createProductInput, editProductInput, addToCartInput } from '@/types'

const resolvers = {
    User:{
        cart:async (_: any, __: any,ctx:GQLContext) => {
            return db.cart.findUnique({
                where: {id:ctx.user!.cart.id},
                include:{cartItems:true}
            })
        },
    },
    Cart:{
        cartItems:async (_: any, __: any,ctx:GQLContext) => {
            return db.cartItem.findMany({
                where: {cartId:ctx.user!.cart.id},
                include:{product:true}
            })
        },
    },
    Query: {
        me: async (_: any, __: any, ctx: GQLContext) => {
            return ctx.user
        },
        products: async (_: any, __: any, ctx: GQLContext) => {
            if (!ctx.user)
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })

            const products = await db.product.findMany()
            return products
        },
        product: async (_: any, { id }: { id: string }, ctx: GQLContext) => {
            if (!ctx.user)
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })

            const product = await db.product.findMany({ where: { id: id } })
            return product[0]
        },
        cart: async (_: any, { id }: { id: string }, ctx: GQLContext) => {
            if (!ctx.user)
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })

            const cart = await db.cart.findMany({ where: { id: ctx.user.cart.id } })
            return cart[0]
        },

    },
    Mutation: {
        signin: async (_: any, { input }: { input: signinUserInput }) => {
            const data = await signin(input)
            if (!data || !data.user || !data.token) {
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })
            }
            return { ...data.user, token: data.token }
        },
        signup: async (_: any, { input }: { input: signupUserInput }) => {
            const data = await signup(input)
            if (!data || !data.user || !data.token) {
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })
            }
            return { ...data.user, token: data.token }
        },
        createProduct: async (_: any, { input }: { input: createProductInput }, ctx: GQLContext) => {
            if (!ctx.user) {
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })
            }else if(ctx.user.isAdmin==false){
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })
            }
            return await db.product.create({ data: { ...input } })
        },
        editProduct: async ( _: any, { id, input }: { id: string; input: editProductInput },ctx: GQLContext) => {
            if (!ctx.user) {
                throw new GraphQLError('Unauthorized', { extensions: { code: '401' } });
            }else if(ctx.user.isAdmin==false){
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })
            }
            const product = await db.product.update({
                where: { id: id },
                data: {...input}
            });
            return product;
        },
        deleteProduct: async ( _: any, { id }: { id: string; },ctx: GQLContext) => {
            if (!ctx.user) {
                throw new GraphQLError('Unauthorized', { extensions: { code: '401' } });
            }else if(ctx.user.isAdmin==false){
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })
            }
            const product = await db.product.delete({where: { id: id }});
            return product;
        },
        addToCart: async (_: any, { input }: { input: addToCartInput }, ctx: GQLContext) => {
            if (!ctx.user) {
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })
            }
            const existingCartItem = await db.cartItem.findUnique({
                where: {cartId_productId:{cartId:ctx.user.cart.id,productId:input.productID}},
            });
            if(existingCartItem){
                await db.cartItem.update({
                    where:{cartId_productId:{cartId:ctx.user.cart.id,productId:input.productID}},
                    data:{quantity:{increment:input.quantity}},
                })
            }else{
                await db.cartItem.create({
                    data:{cartId:ctx.user.cart.id,
                        productId:input.productID,quantity:input.quantity}
                })
            }
           
            
            return ctx.user.cart
        },
    }       
}

export default resolvers