import { signin, signup } from "@/utils/auth"
import { GraphQLError } from "graphql"
import { GQLContext,signinUserInput,signupUserInput } from '@/types'

const resolvers = {
    Query: {
        me: async (_: any, __: any, ctx: GQLContext) => {
            return ctx.user
        }
    },
    Mutation: {
        signin: async (_: any, { input }: {input:signinUserInput}) => {
            const data = await signin(input)
            if (!data || !data.user || !data.token) {
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })
            }
            return { ...data.user, token: data.token }
        },
        signup: async (_: any, { input }: { input: signupUserInput}) => {
            const data = await signup(input)
            if (!data || !data.user || !data.token) {
                throw new GraphQLError("unauthorized", { extensions: { code: "401" } })
            }
            return { ...data.user, token: data.token }
        },
    }
}

export default resolvers