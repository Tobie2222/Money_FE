import { HTTP } from "./Http"

//[auth]

//login
export const login=(payload)=>HTTP.post(`/auth/login`,payload)
//register
export const register=(payload)=>HTTP.post(`/auth/register`,payload)
//send Email
export const forgotPassword=(payload)=>HTTP.post(`/auth/send-mail`,payload)
//verifyCode Email
export const verifyCode=(payload)=>HTTP.post(`/auth/verify-code`,payload)