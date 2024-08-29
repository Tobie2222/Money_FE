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
//resetPassword Email
export const resetPassword=(payload)=>HTTP.post(`/auth/reset-password`,payload)

//user
export const getAllUser=(config)=>HTTP.get(`user/getAllUser`,config)

//transaction

//income

//saving

//account



//getAll accountType
export const getAllAccountType=(payload)=>HTTP.post(`/accountType/getAllTypeAccount`,payload)

