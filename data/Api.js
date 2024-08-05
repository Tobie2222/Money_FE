import { HTTP } from "./Http";


//login
export const login=(payload)=>HTTP.post(`/auth/login`,payload)
//login
export const register=(payload)=>HTTP.post(`/auth/register`,payload)