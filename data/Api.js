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
//find User 
export const findUser = ( keyword, config) => HTTP.delete(`user/findUser?keyword=${keyword}`, config)

//categories expense 
//getAll Expense
export const getAllCatExpense=(userId,config)=>HTTP.get(`categories/getAllCat/${userId}`,config)
//create expense
export const createCatExpense=(userId,payload,config)=>HTTP.post(`categories/createCatByUser/${userId}`,payload,config)
//delete expense
export const deleteCatExpense=(catId,userId,config)=>HTTP.delete(`categories/deleteCat/${catId}/${userId}`,config)
//update expense
export const updateCatExpense=(catId,userId,payload,config)=>HTTP.put(`categories/updateCat/${catId}/${userId}`,payload,config)

//categories income
//getAll income
export const getAllCatIncome=(userId,config)=>HTTP.get(`incomeType/getAllIncomeType/${userId}`,config)
//create income
export const createCatIncome=(userId,payload,config)=>HTTP.post(`incomeType/createIncomeType/${userId}`,payload,config)
//delete income
export const deleteCatIncome=(inComeId,userId,config)=>HTTP.delete(`incomeType/deleteIncomeType/${inComeId}/${userId}`,config)
//update income
export const updateCatIncome=(catId,userId,payload,config)=>HTTP.put(`incomeType/updateIncomeType/${catId}/${userId}`,payload,config)

//account
//getAll Account 
export const getAllAccount=(userId,config)=>HTTP.get(`account/getAllAccount/${userId}`,config)
//get Account
export const getAccount=(accountId,userId,config)=>HTTP.get(`account/getDetailAccount/${accountId}/${userId}`,config)
//create Account
export const createAccount=(id_accountType,userId,payload,config)=>HTTP.post(`account/createAccount/${id_accountType}/${userId}`,payload,config)
//delete Account
export const deleteAccount=(accountId,userId,config)=>HTTP.delete(`account/deleteAccount/${accountId}/${userId}`,config)
//update Account
export const updateAccount=(accountId,userId,payload,config)=>HTTP.put(`account/updateAccount/${accountId}/${userId}`,payload,config)

export const getBalance=(userId,config)=>HTTP.get(`account/getBalance/${userId}`,config)

//transaction Expense
//getAll TranExpense 
export const getAllTranExpense=(userId,config)=>HTTP.get(`transaction/allTranExpense/${userId}`,config)
//create TranExpense
export const createTranExpense=(accountId,userId,catExpenseId,payload,config)=>HTTP.post(`transaction/createExpenseTrans/${accountId}/${userId}/${catExpenseId}`,payload,config)


//getAll Tran recent
export const getAllTranRecent=(userId,config)=>HTTP.get(`transaction/getAllTranRecent/${userId}`,config)
//delete Tran
export const deleteTran=(tranId,userId,config)=>HTTP.delete(`transaction/deleteTran/${tranId}/${userId}`,config)
//update TranIncome
export const updateTran=(tranId,userId,payload,config)=>HTTP.put(`transaction/updateTransactions/${tranId}/${userId}`,payload,config)

//transaction income
//getAll TranIncome 
export const getAllTranIncome=(userId,config)=>HTTP.get(`transaction/allTranIncome/${userId}`,config)
//create TranIncome
export const createTranIncome=(accountId,userId,catIncomeId,payload,config)=>HTTP.post(`transaction/createIncomeTrans/${accountId}/${userId}/${catIncomeId}`,payload,config)


//saving
//getAll Saving 
export const getAllSaving=(userId,config)=>HTTP.get(`saving/getAllSaving/${userId}`,config)
//get Saving 
export const getSaving=(savingId,userId,config)=>HTTP.get(`saving/getDetailSaving/${savingId}/${userId}`,config)
//create Saving
export const createSaving=(userId,payload,config)=>HTTP.post(`saving/createSaving/${userId}`,payload,config)
//delete Saving
export const deleteSaving=(savingId,userId,config)=>HTTP.delete(`saving/deleteSaving/${savingId}/${userId}`,config)
//update Saving
export const updateSaving=(savingId,userId,config)=>HTTP.put(`saving/updateSaving/${savingId}/${userId}`,config)

//deposits Saving
export const depositsSaving=(savingId,accountId,userId,payload,config)=>HTTP.post(`saving/depositMoney/${savingId}/${accountId}/${userId}`,payload,config)

//getAll deposits Saving
export const getAllDepositsSaving=(userId,config)=>HTTP.get(`saving/getAllDeposits/${userId}`,config)

//getAll accountType
export const getAllAccountType=(userId,payload)=>HTTP.get(`/accountType/getAllTypeAccount/${userId}`,payload)

// //analysis

//get sum In this Month and prev month
export const getAvgTranMonth=(slug_user,year,month,userId,config)=>HTTP.get(`/transaction/getAvgTranInMonth/${userId}/${slug_user}?year=${year}&month=${month}`,config)

// /spread All sum transactions by month by year
export const getSumTranInYear=(slug_user,year,userId,config)=>HTTP.get(`/transaction/getSumTranByMonth/${userId}/${slug_user}?year=${year}`,config)

//spread All avg transactions by month by year
export const getAvgTranInYear=(slug_user,year,userId,config)=>HTTP.get(`/transaction/getAvgTranByMonth/${userId}/${slug_user}?year=${year}`,config)


//notification

export const createNotification=(userId,payload,config)=>HTTP.post(`/notification/createNotification/${userId}`,payload,config)

export const getAllNotification=(userId,config)=>HTTP.get(`/notification/getNotification/${userId}`,config)

export const deleteNotification=(notificationId,userId,config)=>HTTP.delete(`/notification/deleteNotification/${notificationId}/${userId}`,config)

export const tickNotification=(notificationId,userId,config)=>HTTP.put(`/notification/tick/${notificationId}/${userId}`,config)