import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: []
    },
    reducers: {
        getNotification(state,action) {
            state.notifications=action.payload.notifications
        }
    }
})

export const { getNotification} = notificationSlice.actions

//selector
export const selectNotification = (state) => state.notification.notifications

export default notificationSlice.reducer
