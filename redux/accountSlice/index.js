import { createSlice } from '@reduxjs/toolkit'


const accountSlice = createSlice({
    name: 'account',
    initialState: {
        balance: 0,
        refresh: true,
        accounts: []
    },
    reducers: {
        getBalances (state,action) {
            state.balance=action.payload.balance
        },
        toggleRefresh(state) {
            state.refresh = !state.refresh 
        },
        getAccounts(state,action) {
            state.accounts=action.payload.accounts
        }
    }
})

export const { getBalances,toggleRefresh,getAccounts} = accountSlice.actions

//selector

export const selectBalance = (state) => state.account.balance
export const selectRefresh = (state) => state.account.refresh
export const selectAccounts = (state) => state.account.accounts

export default accountSlice.reducer
