const TOKENKEY = "ecommerce"
export const getToken=()=>{
    if(typeof window !=="undefined") return localStorage.getItem(TOKENKEY)
}
export const setToken=(token:string)=>{
    if(typeof window !=="undefined") return localStorage.setItem(TOKENKEY,token)
}
export const removeToken=()=>{
    if(typeof window !=="undefined") return localStorage.removeItem(TOKENKEY)
}

export const isAuth=()=>Boolean(getToken())