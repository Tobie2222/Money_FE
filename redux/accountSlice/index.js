import { createSlice } from '@reduxjs/toolkit'


const accountSlice = createSlice({
    name: 'account',
    initialState: {
        refresh: true,
        accounts: [],
        tranThisMonth: {
            tranExpense:0,
            tranIncome:0,
        }
    },
    reducers: {
        toggleRefresh(state) {
            state.refresh = !state.refresh 
        },
        getAccounts(state,action) {
            state.accounts=action.payload.accounts
        },
        getTranThisMount(state,action) {
            state.tranThisMonth=action.payload.tranThisMonth
        }
    }
})

export const { toggleRefresh,getAccounts,getTranThisMount} = accountSlice.actions

//selector
export const selectRefresh = (state) => state.account.refresh
export const selectAccounts = (state) => state.account.accounts
export const selectTranThisMonth = (state) => state.account.tranThisMonth

export default accountSlice.reducer
