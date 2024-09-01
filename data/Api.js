import { HTTP } from "./Http"

//[auth]
//login
export const login=(payload)=>HTTP.post(`/auth/login`,payload)
//register
export const register=(payload)=>HTTP.post(`/auth/register`,payload)
//send Email
export const forgotPassword=(payload)=>HTTP.post(`/auth/send-mail`,payload)
//verifyCode Email
export const verifyCode=(payload)=>HTTP.post(`/auth/verify-code`,payload)
//resetPassword Email
export const resetPassword=(payload)=>HTTP.post(`/auth/reset-password`,payload)

//change password
export const changePassword=(payload)=>HTTP.post(`/auth/changePassword`,payload)

//[user]
//getAll user
export const getAllUser=(page,limit,config)=>HTTP.get(`user/getAllUser?page=${page}&limit=${limit}`,config)
//update user
export const updateUser = (userId, payload, config) => HTTP.put(`user/updateUser/${userId}`, payload, config)
//create user
export const createUser = ( payload, config) => HTTP.post(`user/createUser`, payload, config)
//delete user
export const deleteUser = ( userId, config) => HTTP.delete(`user/deleteUser/${userId}`, config)

//categories expense 
//getAll Expense
export const getAllCatExpense=(userId,config)=>HTTP.get(`categories/getAllCat/${userId}`,config)
//create expense
export const createCatExpense=(userId,payload,config)=>HTTP.post(`categories/createCatByUser/${userId}`,payload,config)
//delete expense
export const deleteCatExpense=(catId,userId,config)=>HTTP.delete(`categories/deleteCat/${catId}/${userId}`,config)
//update expense
export const updateCatExpense=(userId,config)=>HTTP.put(`categories/getAllCat/${userId}`,config)

//categories income
//getAll income
export const getAllCatIncome=(userId,config)=>HTTP.get(`incomeType/getAllIncomeType/${userId}`,config)
//create income
export const createCatIncome=(userId,payload,config)=>HTTP.post(`incomeType/createIncomeType/${userId}`,payload,config)
//delete income
export const deleteCatIncome=(inComeId,userId,config)=>HTTP.delete(`incomeType/deleteIncomeType/${inComeId}/${userId}`,config)
//update income
export const updateCatIncome=(userId,config)=>HTTP.put(`incomeType/getAllCat/${userId}`,config)

//transaction Expense
//getAll TranExpense 
export const getAllCatTranExpense=(userId,config)=>HTTP.get(`categories/getAllCat/${userId}`,config)
//create TranExpense
export const createCatTranExpense=(userId,config)=>HTTP.post(`categories/getAllCat/${userId}`,config)
//delete TranExpense
export const deleteCatTranExpense=(inComeTypeId,userId,config)=>HTTP.delete(`categories/getAllCat/${inComeTypeId}/${userId}`,config)
//update TranExpense
export const updateCatTranExpense=(userId,config)=>HTTP.put(`categories/getAllCat/${userId}`,config)



//transaction income
//getAll TranIncome 
export const getAllCatTranIncome=(userId,config)=>HTTP.get(`categories/getAllCat/${userId}`,config)
//create TranIncome
export const createCatTranIncome=(userId,config)=>HTTP.post(`categories/getAllCat/${userId}`,config)
//delete TranIncome
export const deleteCatTranIncome=(userId,config)=>HTTP.delete(`categories/getAllCat/${userId}`,config)
//update TranIncome
export const updateCatTranIncome=(userId,config)=>HTTP.put(`categories/getAllCat/${userId}`,config)



//saving
//getAll Saving 
export const getAllSaving=(userId,config)=>HTTP.get(`categories/getAllCat/${userId}`,config)
//create Saving
export const createSaving=(userId,config)=>HTTP.post(`categories/getAllCat/${userId}`,config)
//delete Saving
export const deleteSaving=(userId,config)=>HTTP.delete(`categories/getAllCat/${userId}`,config)
//update Saving
export const updateSaving=(userId,config)=>HTTP.put(`categories/getAllCat/${userId}`,config)

//account
//getAll Account 
export const getAllAccount=(userId,config)=>HTTP.get(`account/getAllAccount/${userId}`,config)
//create Account
export const createAccount=(id_accountType,userId,payload,config)=>HTTP.post(`account/createAccount/${id_accountType}/${userId}`,payload,config)
//delete Account
export const deleteAccount=(userId,config)=>HTTP.delete(`account/getAllCat/${userId}`,config)
//update Account
export const updateAccount=(userId,config)=>HTTP.put(`account/getAllCat/${userId}`,config)

export const getBalance=(userId,config)=>HTTP.get(`account/getBalance/${userId}`,config)

//getAll accountType
export const getAllAccountType=(userId,payload)=>HTTP.get(`/accountType/getAllTypeAccount/${userId}`,payload)

//analysis