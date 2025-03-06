export type GQLContext = {
    user?: { id: string; email: string; firstName:String; lastName:String } | null
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