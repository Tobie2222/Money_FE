import {createSelector } from "@reduxjs/toolkit"
import { selectAccounts } from "../accountSlice"

export const getBalance=createSelector(selectAccounts,(accounts)=>{
    return accounts.reduce((sum,account)=>sum+account.balance,0)
})