import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import accountSlice from './accountSlice'
import notificationSlice from './notificationSlice'



const store = configureStore({
    reducer: {
        auth: authSlice,
        account: accountSlice,
        notification: notificationSlice
    },
})

export default store
