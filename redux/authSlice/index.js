import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from '../action/auth'

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    token: "",
    loading: false,
    success: null,
    error: false,
    isAuthenticated: false
  },
  reducers: {
    logout(state) {
      state.isAuthenticated=false
      state.token=""
      state.loading=false
      state.error=false
      state.success=false
    },
    updateToken(state,action){
      state.token=action.payload.token
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.success=true
        state.isAuthenticated = true
        state.loading = false
        state.token = action.payload.token
        console.log(action.payload)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { logout,updateToken } = authSlice.actions

export const selectIsAuthenticated=(state)=>state.auth.isAuthenticated
export const selectToken=(state)=>state.auth.token
export const selectLoading=(state)=>state.auth.loading
export const selectError=(state)=>state.auth.error
export const selectSuccess=(state)=>state.auth.success

export default authSlice.reducer
