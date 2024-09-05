import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: []
    },
    reducers: {
        getNotification(state) {
            
        }
    }
})

export const { getNotification} = notificationSlice.actions

//selector


export default notificationSlice.reducer
