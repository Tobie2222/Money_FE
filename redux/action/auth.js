import { createAsyncThunk } from "@reduxjs/toolkit"
import { login } from "../../data/Api"


export const loginUser=createAsyncThunk("auth/login",async(payload,{rejectWithValue})=>{
    try {
        const response=await login(payload)
        if (response.status===200) {
            return response.data
        } else {
            return rejectWithValue(response.data)
        }
    } catch (err) {
        console.log(err)
    }
})