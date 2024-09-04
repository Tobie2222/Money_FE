import { View, Text, StatusBar, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AbstractCircle from '../../components/AbstractCircle'
import TabViews from '../../components/TabViews'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { showToastU } from '../../utils/toast'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CutomToast'
import { useDispatch, useSelector } from 'react-redux'
import { selectMessage, selectSuccess, selectToken, selectUser } from '../../redux/authSlice'
import { getAllAccount, getAllTranRecent, getAvgTranMonth } from '../../data/Api'
import { getAccounts, getTranThisMount, selectAccounts, selectRefresh, selectTranThisMonth } from '../../redux/accountSlice'
import { getBalance } from '../../redux/accountSelector'



const labelCost = [
    "25.000k",
    "20.000k",
    "15.000k",
    "10.000k",
    "5.000k",
    "0",
]

export default function HomeScreen() {
    const token = useSelector(selectToken)
    const [tab,setTab]=useState("Tháng này")
    const balance = useSelector(getBalance)
    const tranThisMonth=useSelector(selectTranThisMonth)
    const accounts = useSelector(selectAccounts)
    const user = useSelector(selectUser)
    const refresh = useSelector(selectRefresh)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const navigation = useNavigation()
    const [hiddenTime, setHiddenTime] = useState(false)
    const message = useSelector(selectMessage)
    const success = useSelector(selectSuccess)
    const [tranIncomeRecent, setTranIncomeRecent] = useState([])
    const [tranExpenseRecent, setTranExpenseRecent] = useState([])
    const [sumTranPrevInMonth,setSumTranPrevInMonth]=useState({
        tranExpense:0,
        tranIncome:0,
    })
    const setCurrentTab=(childTab)=>{
        setTab(childTab)
    }
    console.log("tab ",tab)
    useEffect(() => {
        if (success) {
            showToastU(message, "#0866ff", "check", 3000)
        }
    }, [success])

    //fetching data
    useEffect(() => {
        //get all account
        const getAllAccounts = async () => {
            try {
                const response = await getAllAccount(user?.id, {
                    headers: {
                        token: `bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    dispatch(getAccounts({
                        accounts: response.data.allAccountByUser
                    }))
                }
            } catch (err) {
                console.log(err)
            }
        }
        //get tran recent  
        const getTranRecent = async () => {
            try {
                const response = await getAllTranRecent(user?.id, {
                    headers: {
                        token: `bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    console.log(response.data)
                    setTranIncomeRecent(response.data.allTranRecent.tranIncome)
                    setTranExpenseRecent(response.data.allTranRecent.tranExpense)
                }
            } catch (err) {
                console.log(err)
            }
        }
        const getTranInMonths=async ()=>{
            try {
                const date=new Date() 
                const year = date.getFullYear().toString()
                const month = (date.getMonth() + 1).toString()
                const response = await getAvgTranMonth(year,month,user?.id, {
                    headers: {
                        token: `bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    dispatch(getTranThisMount({
                        tranThisMonth: {
                            tranExpense:response.data?.data?.thisMonth?.totalTranExpense,
                            tranIncome:response.data?.data?.thisMonth?.totalTranInCome
                        }
                    }))
                    setSumTranPrevInMonth({
                        tranExpense: response.data?.data?.prevMonth?.totalTranExpense,
                        tranIncome: response.data?.data?.prevMonth?.totalTranInCome,
                    })
                }
            } catch (err) {
                console.log(err)
            }
        }
        if (token) {
            getTranInMonths()
            getAllAccounts()
            getTranRecent()
        }
    }, [token, refresh])
    console.log(sumTranPrevInMonth)
    return (
        <View className="flex-1 ">
            <AbstractCircle />
            <StatusBar
                barStyle="light-content"
            />
            <View className="z-20">
                <Toast
                    config={{
                        custom_toast: (internalState) => <CustomToast {...internalState} />
                    }}
                />
            </View>
            <ScrollView>
                <View className="flex-row items-center w-full justify-between mt-[70px] px-[20px]">
                    <Text className="text-white text-[24px] leading-[33px] font-[700] ">{balance.toLocaleString('vi-VN')} đ</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("notificationScreen")}>
                        <Icon name={"bell"} size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text className="text-white text-[14px] leading-[21px] font-[600] ml-[20px] ">{t('Balance')}</Text>
                {/* my account */}
                {
                    (typeof accounts[0]) === "undefined" ? (
                        <View className="w-[91%]  mt-[20px] bg-white mx-auto rounded-[12px] py-[30px] px-[20px] ">
                            <Text className="text-[16px] font-[600] text-iconColor text-center">Không có dữ liệu!</Text>
                        </View>
                    ) : (
                        <View className="w-[91%]  mt-[20px] bg-white mx-auto rounded-[12px] py-[15px] px-[20px] " style={styles.shadowS}>
                            <View className="flex-row justify-between ">
                                <Text className="text-[#000000] text-[15px] leading-[22px] font-[500]">{accounts[0]?.account_name}</Text>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("accountScreen")} >
                                    <Text className="text-clickButton text-[14px] leading-[18px] font-[500]">{t('viewAll')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="flex-row justify-between items-center mt-[10px] ">
                                <View className="flex-row items-center gap-[10px] ">
                                    <Image
                                        source={{ uri: `${accounts[0]?.accountType.account_type_image}` }}
                                        className="w-[35px] h-[35px] rounded-[100px] object-cover border border-borderColor "
                                    />
                                    <Text className="text-textColor text-[14px] leading-[18px] font-[500]">{t('cash')}</Text>
                                </View>
                                <Text className="text-textColor text-[16px] leading-[24px] font-[500]">{accounts[0]?.balance.toLocaleString('vi-VN')} đ</Text>
                            </View>
                        </View>
                    )
                }

                <Text className="text-white text-[14px] leading-[21px] font-[600] ml-[20px] my-[20px] ">{t('expenseReport')}</Text>
                {/* report */}
                <View className="w-[91%] bg-white mx-auto rounded-[12px] py-[15px] px-[20px] " style={styles.shadowS}>
                    <Text className="text-[#000000] text-[18px] leading-[27px] font-[500]">{tranThisMonth.tranExpense.toLocaleString('vi-VN')} đ</Text>
                    <Text className="text-textColor mt-[5px] ml-[5px] text-[14px] leading-[21px] font-[500]">{t('totalSpendingThisMonth')}
                        <Text className={` ${(tranThisMonth.tranExpense/sumTranPrevInMonth.tranExpense)>1?"text-clickButton":"text-warningColor"} font-[600]`}>
                            {(sumTranPrevInMonth.tranExpense===0?"   tăng 100%":((tranThisMonth.tranExpense/sumTranPrevInMonth.tranExpense)>1?(`Tăng `((tranThisMonth.tranExpense/sumTranPrevInMonth.tranExpense)*100-100)` %`):(`Giảm `(tranThisMonth.tranExpense/sumTranPrevInMonth.tranExpense)*100)` %`))}
                        </Text>
                    </Text>
                    <TabViews
                        tabs={[{ id: 0, title: "Tháng này" },{ id: 1, title: "Tháng trước" }]}
                        styleTabs="h-[30px] bg-[#f0eef1] mt-[10px] rounded-[8px] flex-row items-center px-[4px]"
                        styleTextTab="text-[14px] font-[500] text-textColor"
                        styleTab="rounded-[6px] h-[24px]"
                        setCurrentTabs={setCurrentTab}
                    />
                    <View className="flex-row justify-between ">
                        <View className="flex-row gap-[25px] items-end">
                            <View className="flex-col items-end">
                                {
                                    labelCost.map((item) => {
                                        return (
                                            <Text key={item} className="text-[#B8BFCC] mt-[15px] font-[700] text-[14px] ">{item}</Text>
                                        )
                                    })
                                }
                            </View>
                            {/* column char */}
                            <View className="w-[10px] h-[160px] bg-[#22C55E] rounded-[30px] "></View>
                            <View className="w-[10px] h-[108px] bg-[#A855F7] rounded-[30px] "></View>
                        </View>
                        <View className="mt-[40px] ">
                            <View className="flex-col gap-[10px] ">
                                <View className="flex-row items-center ">
                                    <View className="flex-row items-center gap-[5px]">
                                        <View className="w-[15px] h-[15px] bg-[#22C55E] rounded-[100px]"></View>
                                        <Text className="text-[15px] font-[700] text-[#606C80]">Tiền thu</Text>
                                    </View>
                                    <Text className="ml-[16px] leading-[24px] text-[#B8BFCC]  font-[700] text-[14px] ">{tab==="Tháng này"?((sumTranPrevInMonth?.tranIncome)/1000).toLocaleString('vi-VN'):((tranThisMonth.tranIncome)/1000).toLocaleString('vi-VN')}k</Text>
                                </View>
                                <View className="flex-row items-center ">
                                    <View className="flex-row items-center gap-[5px] ">
                                        <View className="w-[15px] h-[15px] bg-[#A855F7] rounded-[100px]"></View>
                                        <Text className="text-[15px] font-[700] text-[#606C80]">Tiền chi</Text>
                                    </View>
                                    <Text className="ml-[16px] leading-[24px] text-[#B8BFCC]  font-[700] text-[14px] ">{tab==="Tháng này"?((sumTranPrevInMonth?.tranExpense)/1000).toLocaleString('vi-VN'):((tranThisMonth.tranExpense)/1000).toLocaleString('vi-VN')}k</Text>
                                </View>
                            </View>
                            <View className="w-full h-[1px] bg-borderColor my-[15px]"></View>
                            <Text className="ml-auto leading-[24px] text-[#B8BFCC]  font-[700] text-[14px] ">
                                {tab==="Tháng này"?((Number(tranThisMonth.tranIncome)/1000)+Number((tranThisMonth.tranIncome)/1000)).toLocaleString('vi-VN'):((Number(sumTranPrevInMonth?.tranIncome)/1000)+Number((sumTranPrevInMonth?.tranIncome)/1000)).toLocaleString('vi-VN')}k
                            </Text>
                        </View>
                    </View>
                </View>
                {/* recent spending */}
                <View className="flex-row justify-between my-[20px] mx-[20px] ">
                    <Text className="text-textColor text-[14px] leading-[21px] font-[600] ">{t('recentExpenses')}</Text>
                    <TouchableOpacity activeOpacity={0.9}>
                        <Text className="text-primaryColor text-[14px] leading-[21px] font-[600] ">{t('viewAll')}</Text>
                    </TouchableOpacity>
                </View>
                {
                    tranExpenseRecent.length === 0 ? (
                        <View className="w-[91%]  bg-white mx-auto rounded-[12px] py-[20px] px-[20px] " style={styles.shadowS}>
                            <Text className="text-[16px] font-[600] text-iconColor text-center">Không có dữ liệu!</Text>
                        </View>
                    ) : (<View className="w-[91%]  bg-white mx-auto rounded-[12px] py-[15px] px-[20px] " style={styles.shadowS}>
                        {
                            tranExpenseRecent.map((tran) => {
                                return (
                                    <View key={tran?._id} className="flex-row justify-between items-center ">
                                        <View className="flex-row items-center gap-[10px] ">
                                            <Image
                                                source={{ uri: `${tran?.category?.categories_image}` }}
                                                className="w-[35px] h-[35px] rounded-[200px] object-cover border border-borderColor "
                                            />
                                            <Text className="text-textColor text-[14px] leading-[18px] font-[500]">{tran?.transaction_name}</Text>
                                        </View>
                                        <Text className="text-warningColor text-[16px] leading-[24px] font-[500]">-{tran?.amount.toLocaleString('vi-VN')} vnđ</Text>
                                    </View>
                                )
                            })
                        }
                    </View>)
                }

                {/* recent income */}
                <View className="flex-row justify-between my-[20px] mx-[20px] ">
                    <Text className="text-textColor text-[14px] leading-[21px] font-[600] ">{t('recentIncome')}</Text>
                    <TouchableOpacity activeOpacity={0.9}>
                        <Text className="text-primaryColor text-[14px] leading-[21px] font-[600] ">Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                {
                    tranIncomeRecent.length === 0 ? (
                        <View className="w-[91%]  bg-white mx-auto rounded-[12px] py-[20px] px-[20px] mb-[40px]" style={styles.shadowS}>
                            <Text className="text-[16px] font-[600] text-iconColor text-center">Không có dữ liệu!</Text>
                        </View>
                    ) : (<View className="w-[91%] flex flex-col  bg-white mx-auto rounded-[12px] pt-[5px] pb-[15px] px-[20px] mb-[40px] " style={styles.shadowS}>
                        {
                            tranIncomeRecent.map((tran) => {
                                return (
                                    <View key={tran?._id} className="flex-row justify-between items-center mt-[10px]">
                                        <View className="flex-row items-center gap-[10px] ">
                                            <Image
                                                source={{ uri: `${tran?.incomeType?.income_type_image}` }}
                                                className="w-[35px] h-[35px] rounded-[200px] object-cover border border-borderColor "
                                            />
                                            <Text className="text-textColor text-[14px] leading-[18px] font-[500]">{tran?.transaction_name}</Text>
                                        </View>
                                        <Text className="text-clickButton text-[16px] leading-[24px] font-[500]">+{tran?.amount.toLocaleString('vi-VN')} vnđ</Text>
                                    </View>
                                )
                            })
                        }
                    </View>)
                }
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    icon: {
        fontSize: 22,
        fontWeight: 400
    },
    shadowS: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2
    },
    shadowX: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.00,

        elevation: 2
    }
})
