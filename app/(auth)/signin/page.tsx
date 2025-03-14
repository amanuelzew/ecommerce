'use client'

import { useMutation } from 'urql'
import { SigninMutation } from '@/gql/signinMutation'
import { setToken } from '@/utils/token'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useUserStore } from '@/context/userContext'
import { useCartStore } from '@/context/cartContext'
import Link from 'next/link'


const SigninPage = () => {
    const { createUser } = useUserStore();
    const { setCart } = useCartStore();
    const [_, signin] = useMutation(SigninMutation)
    const router = useRouter()
    const [state, setState] = useState({ email: '', password: '', })
    const [loading, setLoading] = useState(false)

    const handleSignup = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const result = await signin({ input: state })
        if (result.data.signin) {
            setToken(result.data.signin.token)
            setState({ email: '', password: '' })
            createUser({
                firstName: result.data.signin.firstName,
                lastName: result.data.signin.lastName,
                email: result.data.signin.email,
                isAdmin: result.data.signin.isAdmin,
                cartId: result.data.signin.cart.id,
            })
            setCart(result.data.signin.cart)
            if (result.data.signin.isAdmin == true)
                router.push('/admin')
            else
                router.push('/')
        }
    }

    return (
        <div className="bg-white rounded-md border p-4 w-full shadow-sm">
            <div className="text-2xl text-black/70">Sign in</div>

            <form onSubmit={handleSignup} className="flex flex-col gap-4 mt-4">


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
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>

                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default SigninPage