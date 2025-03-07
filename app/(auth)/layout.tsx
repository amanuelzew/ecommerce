import { ReactNode } from "react"


const AuthLayout = ({ children }:{children:ReactNode}) => {
    return (
        <div className="bg-slate-50 w-screen h-screen flex items-center justify-center">
            <div className="w-full max-w-screen-sm flex items-center justify-center">
                <div className="w-full">
                    <div className="mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-md text-white font-semibold bg-black rounded-sm px-2">{`E`}</span>
                            <span className="text-lg text-black/70">Ecommerce.</span>
                        </div>
                    </div>
                    <div className="text-black">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout