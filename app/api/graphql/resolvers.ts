import { signin, signup } from "@/utils/auth"
import { GraphQLError } from "graphql"
import db from "@/utils/db"
import { GQLContext, signinUserInput, signupUserInput, createProductInput, editProductInput, addToCartInput, paginationInput } from '@/types'

const resolvers = {
    Cart: {
        cartItems: async (cart: any, __: any, ctx: GQLContext) => {
            return db.cartItem.findMany({
                where: { cartId: cart.id },
                include: { product: true }
            })
        },
    },
    Order:{
        orderItems: async (order: any, __: any, ctx: GQLContext) => {
            return db.orderItem.findMany({
                where: { orderId: order.id },
                include: { product: true }
            })
        },
    },
    Query: {
        me: async (_: any, __: any, ctx: GQLContext) => {
            return ctx.user
        },
        products: async (_: any, { input }: { input: paginationInput }, ctx: GQLContext) => {
            if (input && input.limit && input.offset>=0)
                return await db.product.findMany({
                    skip: input.offset,
                    take: input.limit,
                })
            else
                return db.product.findMany()
        },
        product: async (_: any, { id }: { id: string }, ctx: GQLContext) => {
            return await db.product.findUnique({ where: { id: id } }) 
        },
        cart: async (_: any, { id }: { id: string }, ctx: GQLContext) => {
            if (!ctx.user)
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })

            const cart = await db.cart.findMany({ where: { id: ctx.user.cart.id } })
            return cart[0]
        },
        order: async (_: any, __: any, ctx: GQLContext) => {
            if(ctx.user?.isAdmin==true)
                return db.order.findMany({include:{user:{select:{firstName:true,lastName:true}}}})
            
            return await db.order.findMany(
                {where:{userId:ctx.user?.id},
                include:{user:{select:{firstName:true,lastName:true}}}
            })
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
            if (!data || !data.userWithCart || !data.token) {
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })
            }
            return { ...data.userWithCart, token: data.token }
        },
        createProduct: async (_: any, { input }: { input: createProductInput }, ctx: GQLContext) => {
            if (!ctx.user) {
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })
            } else if (ctx.user.isAdmin == false) {
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })
            }
            return await db.product.create({ data: { ...input } })
        },
        editProduct: async (_: any, { id, input }: { id: string; input: editProductInput }, ctx: GQLContext) => {
            if (!ctx.user) {
                throw new GraphQLError('Unauthorized', { extensions: { code: '401' } });
            } else if (ctx.user.isAdmin == false) {
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })
            }
            const product = await db.product.update({
                where: { id: id },
                data: { ...input }
            });
            return product;
        },
        deleteProduct: async (_: any, { id }: { id: string; }, ctx: GQLContext) => {
            if (!ctx.user) {
                throw new GraphQLError('Unauthorized', { extensions: { code: '401' } });
            } else if (ctx.user.isAdmin == false) {
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })
            }
            const product = await db.product.delete({ where: { id: id } });
            return product;
        },
        createCartItem: async (_: any, { input }: { input: addToCartInput }, ctx: GQLContext) => {
            if (!ctx.user) {
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })
            }
            const existingCartItem = await db.cartItem.findUnique({
                where: { cartId_productId: { cartId: ctx.user.cart.id, productId: input.productID } },
            });
            if (existingCartItem) {
                await db.cartItem.update({
                    where: { cartId_productId: { cartId: ctx.user.cart.id, productId: input.productID } },
                    data: { quantity: { increment: input.quantity } },
                })
            } else {
                await db.cartItem.create({
                    data: {
                        cartId: ctx.user.cart.id,
                        productId: input.productID, quantity: input.quantity
                    }
                })
            }
            return ctx.user.cart
        },
        editCartItem: async (_: any, { input }: { input: addToCartInput }, ctx: GQLContext) => {
            if (!ctx.user) {
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })
            }
            await db.cartItem.update({
                where: { cartId_productId: { cartId: ctx.user.cart.id, productId: input.productID } },
                data: { quantity: input.quantity },
            })
            return ctx.user.cart
        },
        deleteCartItem: async (_: any, { id }: { id: string; }, ctx: GQLContext) => {
            if (!ctx.user) {
                throw new GraphQLError('Unauthorized', { extensions: { code: '401' } });
            }
            const cart = await db.cartItem.delete({ where: { cartId_productId: { cartId: ctx.user.cart.id, productId: id } } });
            return cart;
        },
        clearCart: async (_: any, __: any, ctx: GQLContext) => {
            if (!ctx.user) {
                throw new GraphQLError('Unauthorized', { extensions: { code: '401' } });
            }
            const cart = await db.cartItem.deleteMany({where:{cartId:ctx.user.cart.id}});
            return cart;
        },
        createOrder: async (_: any, __:any, ctx: GQLContext) => {
            if (!ctx.user) {
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })
            } 
            const cartItems= await db.cartItem.findMany({ where:{cartId:ctx.user.cart.id},include:{product:true}});
            const order=await db.order.create({
                data:{
                    userId:ctx.user.id,
                    total:cartItems.reduce((acc,item)=>acc+ item.product.price*item.quantity,0),
                    orderItems:{
                        create:cartItems.map(item=>({
                            productId:item.productId,
                            quantity:item.quantity
                        }))
                    }
                }
            })
           
            //update quanity in products
            for (const item of cartItems) {
                await db.product.update({
                    where: { id: item.productId },
                    data: { quantity: { decrement: item.quantity } },
                });
            }
            //empty cart
            await db.cartItem.deleteMany({where:{cartId:ctx.user.cart.id}});
            return order
        },

    }
}

export default resolvers