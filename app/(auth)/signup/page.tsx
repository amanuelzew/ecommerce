'use client'

import { useMutation } from 'urql'
import { SignupMutation } from '@/gql/signupMutation'
import { setToken } from '@/utils/token'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useUserStore } from '@/context/userContext'
import { useCartStore } from '@/context/cartContext'
import Link from 'next/link'

const SignupPage = () => {
    const { createUser } = useUserStore();
    const { setCart } = useCartStore();
    const [_, signup] = useMutation(SignupMutation)
    const router = useRouter()
    const [state, setState] = useState({ firstName: '', lastName: '', email: '', password: '', })
    const [loading, setLoading] = useState(false)

    const handleSignup = async (e: FormEvent) => {

        e.preventDefault()
        setLoading(true)
        const result = await signup({ input: state })
        if (result.data.signup) {
            setToken(result.data.signup.token)
            setState({ firstName: '', lastName: '', email: '', password: '' })
            console.log(result.data.firstName,"fro")
            createUser({
                firstName: result.data.signup.firstName,
                lastName: result.data.signup.lastName,
                email: result.data.signup.email,
                isAdmin: result.data.signup.isAdmin,
                cartId: result.data.signup.cart.id,
            })
            console.log(result.data.firstName,"las")
            router.push('/')
        }
    }

    return (
        <div className="bg-white rounded-md border p-4 w-full shadow-sm">
            <div className="text-2xl text-black/70">Sign up</div>

            <form onSubmit={handleSignup} className="flex flex-col gap-4 mt-4">
                <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                    </label>
                    <input
                        id="firstName"
                        placeholder="Abebe"
                        value={state.firstName}
                        onChange={(e) => setState({ ...state, firstName: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        placeholder="Addis"
                        value={state.lastName}
                        onChange={(e) => setState({ ...state, lastName: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="abebe@gmail.com"
                        value={state.email}
                        onChange={(e) => setState({ ...state, email: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={state.password}
                        onChange={(e) => setState({ ...state, password: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="text-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md text-white font-medium ${loading
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            }`}
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </div>

                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-blue-600 hover:underline">
                    sign in
                    </Link>
                </div>

            </form>
        </div>
    )
}

export default SignupPage