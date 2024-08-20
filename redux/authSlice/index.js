import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from '../action/auth'

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    token: "",
    loading: false,
    success: null,
    error: false,
    isAuthenticated: false,
    user: null,
    message: "",
  },
  reducers: {
    logout(state) {
      state.isAuthenticated=false
      state.token=""
      state.message=""
      state.loading=false
      state.error=false
      state.success=false
    },
    updateTsAuth(state,action){
      state.token=action.payload.token
      state.user=action.payload.user
      state.isAuthenticated=true
    },
    resetAuthState(state) {
      state.message = ''
      state.error = null
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
        state.message = action.payload.message
        state.user = action.payload.user
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload.message
      })
  }
})

export const { logout,updateTsAuth ,resetAuthState} = authSlice.actions

export const selectIsAuthenticated=(state)=>state.auth.isAuthenticated
export const selectToken=(state)=>state.auth.token
export const selectLoading=(state)=>state.auth.loading
export const selectError=(state)=>state.auth.error
export const selectSuccess=(state)=>state.auth.success
export const selectMessage=(state)=>state.auth.message
export const selectUser=(state)=>state.auth.user

export default authSlice.reducer
