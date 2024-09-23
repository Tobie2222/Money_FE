import { View, Text, StatusBar, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import AbstractCircle from "../../components/AbstractCircle";
import Icon from 'react-native-vector-icons/FontAwesome'
import TabViews from '../../components/TabViews';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { showToastU } from '../../utils/toast'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CustomToast';
import { useDispatch, useSelector } from 'react-redux'
import { selectMessage, selectSuccess, selectToken, selectUser } from '../../redux/authSlice'
import { getAccounts, getTranThisMount, selectAccounts, selectRefresh, selectTranThisMonth } from '../../redux/accountSlice'
import { getBalance } from '../../redux/accountSelector'
import { getNotification, selectNotification } from '../../redux/notificationSlice'




export default function HomeScreen() {
    const [tab, setTab] = useState("Tháng này")
    const balance = useSelector(getBalance)
    const tranThisMonth = useSelector(selectTranThisMonth)
    const accounts = useSelector(selectAccounts)
    const notifications = useSelector(selectNotification)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const navigation = useNavigation()
    const message = useSelector(selectMessage)
    const success = useSelector(selectSuccess)
    const refresh = useSelector(selectRefresh)
    const [tranIncomeRecent, setTranIncomeRecent] = useState([])
    const [tranExpenseRecent, setTranExpenseRecent] = useState([])
    const [sumTranPrevInMonth, setSumTranPrevInMonth] = useState({
        tranExpense: {
            type: "expense",
            amount: 0
        },
        tranIncome: {
            type: "income",
            amount: 0
        },
    })
    const CompareTran = () => {
        if (tab === "Tháng này") {
            return tranThisMonth?.tranExpense?.amount > tranThisMonth?.tranIncome?.amount ? "expense" : "income"
        } else {
            return sumTranPrevInMonth?.tranExpense?.amount > sumTranPrevInMonth?.tranIncome?.amount ? "expense" : "income"
        }

    }
    console.log(CompareTran())
    const maxValue = Math.max(sumTranPrevInMonth.tranExpense.amount, sumTranPrevInMonth.tranIncome.amount)
    const minValue = Math.min(sumTranPrevInMonth.tranExpense.amount, sumTranPrevInMonth.tranIncome.amount)
    const maxValueThisMount = Math.max(tranThisMonth.tranExpense.amount, tranThisMonth.tranIncome.amount)
    // tinh cac moc chi tieu
    const getEvenlySpacedLabels = (max, numLabels) => {
        const interval = max / (numLabels - 1)
        return Array.from({ length: numLabels }, (_, index) => index * interval)
    }
    // tinh chieu cao cua cot
    const calculatePreMonthHeightCol = (minValue, maxValue) => {
        if (minValue === 0 || maxValue == 0) return 0
        return minValue / maxValue * 100
    }
    const heightCol = calculatePreMonthHeightCol(minValue, maxValue) * 100
    console.log(heightCol)
    const setCurrentTab = (childTab) => {
        setTab(childTab)
    }
    useEffect(() => {
        if (success) {
            showToastU(message, "#0866ff", "check", 3000)
        }
    }, [success])
    const countNotification = notifications.filter((notification) => notification.status === "unread").length
    // gia lap du lieu
    const mockAccounts = [
        { _id: '1', account_name: 'Tài khoản chính', balance: 1000000, accountType: { account_type_image: 'url_to_image' } },
        { _id: '2', account_name: 'Tài khoản tiết kiệm', balance: 5000000, accountType: { account_type_image: 'url_to_image' } },
    ];
    
    const mockTranRecent = {
        tranIncome: [{ _id: '1', transaction_name: 'Lương', amount: 500000 }],
        tranExpense: [{ _id: '1', transaction_name: 'Mua sắm', amount: 200000 }],
    };
    
    const mockTranThisMonth = {
        tranExpense: { type: "expense", amount: 800000 },
        tranIncome: { type: "income", amount: 1500000 },
    };
    
    const mockSumTranPrevInMonth = {
        tranExpense: { type: "expense", amount: 600000 },
        tranIncome: { type: "income", amount: 1200000 },
    };
    
    const mockNotifications = [{ _id: '1', message: 'Thông báo 1', status: 'unread' }];
    useEffect(() => {
        // Giả lập lấy tất cả tài khoản
        const getAllAccounts = () => {
            dispatch(getAccounts({ accounts: mockAccounts }));
        };

        // Giả lập lấy giao dịch gần đây
        const getTranRecent = () => {
            setTranIncomeRecent(mockTranRecent.tranIncome);
            setTranExpenseRecent(mockTranRecent.tranExpense);
        };

        // Giả lập lấy giao dịch trong tháng
        const getTranInMonths = () => {
            dispatch(getTranThisMount({
                tranThisMonth: mockTranThisMonth
            }));
            setSumTranPrevInMonth(mockSumTranPrevInMonth);
        };

        // Giả lập lấy thông báo
        const getAllNotifications = () => {
            dispatch(getNotification({ notifications: mockNotifications }));
        };

        getAllAccounts();
        getTranRecent();
        getTranInMonths();
        getAllNotifications();
    }, [refresh]);
    return (
        <View className="flex-1">
            <AbstractCircle/>
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
                    <TouchableOpacity className="relative" activeOpacity={0.8} onPress={() => navigation.navigate("notificationScreen")}>
                        <View className="absolute w-[20px] h-[20px] bg-warningColor z-20 flex flex-row justify-center items-center rounded-[20px] top-[-10px] right-[-10px]">
                            <Text className="text-[12px] text-[#fff] font-[600]">{countNotification}</Text>
                        </View>
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
                    <Text className="text-textColor mt-[5px] ml-[5px] text-[14px] leading-[21px] font-[500]">{t('totalSpendingThisMonth')}
                    </Text>
                    <TabViews
                        tabs={[{ id: 0, title: "Tháng này" }, { id: 1, title: "Tháng trước" }]}
                        styleTabs="h-[30px] bg-[#f0eef1] mt-[10px] rounded-[8px] flex-row items-center px-[4px]"
                        styleTextTab="text-[14px] font-[500] text-textColor"
                        styleTab="rounded-[6px] h-[24px]"
                        setCurrentTabs={setCurrentTab}
                    />
                    <View className="flex-row justify-between overflow-hidden ">
                        <View className="flex-row gap-[25px] items-end overflow-hidden  ">
                        <View className="flex-col items-end">
                                {
                                    tab === "Tháng này" ? (
                                        getEvenlySpacedLabels(maxValueThisMount, 6).reverse().map((item, index) => (
                                            <Text key={index} className="text-[#B8BFCC] mt-[15px] font-[700] text-[14px]">
                                                {(item / 1000).toLocaleString('vi-VN')}k
                                            </Text>
                                        ))
                                    ) : (
                                        getEvenlySpacedLabels(maxValue, 6).reverse().map((item, index) => (
                                            <Text key={index} className="text-[#B8BFCC] mt-[15px] font-[700] text-[14px]">
                                                {(item / 1000).toLocaleString('vi-VN')}k
                                            </Text>
                                        ))
                                    )
                                }
                                {/* column */}
                            </View>
                            <View className="flex flex-row items-end h-[210px] pt-[15px]">
                                <View style={{ height: `${CompareTran() === "income" ? "100" : `${heightCol}`}%` }} className={`w-[10px]  bg-[#22C55E] rounded-[30px] `}></View>
                                <View style={{ height: `${CompareTran() === "expense" ? "100" : `${heightCol}`}%` }} className={`w-[10px]  bg-[#A855F7] rounded-[30px] ml-[15px] `}></View>
                            </View>
                        </View>
                        <View className="mt-[40px] ">
                        <View className="flex-col gap-[10px] ">
                            <View className="flex-row items-center ">
                                    <View className="flex-row items-center gap-[5px]">
                                        <View className={`w-[15px] h-[15px] bg-[#22C55E] rounded-[100px]`}></View>
                                        <Text className={`text-[15px] font-[700] text-[#606C80]`}>Tiền thu</Text>
                                    </View>
                                    <Text className="ml-[16px] leading-[24px] text-[#B8BFCC]  font-[700] text-[14px] ">{tab === "Tháng trước" ? ((sumTranPrevInMonth?.tranIncome?.amount) / 1000).toLocaleString('vi-VN') : ((tranThisMonth.tranIncome.amount) / 1000).toLocaleString('vi-VN')}k</Text>
                                </View>
                                <View className="flex-row items-center ">
                                    <View className="flex-row items-center gap-[5px] ">
                                        <View className="w-[15px] h-[15px] bg-[#A855F7] rounded-[100px]"></View>
                                        <Text className="text-[15px] font-[700] text-[#606C80]">Tiền chi</Text>
                                    </View>
                                    <Text className="ml-[16px] leading-[24px] text-[#B8BFCC]  font-[700] text-[14px] ">{tab === "Tháng trước" ? ((sumTranPrevInMonth?.tranExpense?.amount) / 1000).toLocaleString('vi-VN') : ((tranThisMonth.tranExpense.amount) / 1000).toLocaleString('vi-VN')}k</Text>
                                </View>
                            </View>
                            <View className="w-full h-[1px] bg-borderColor my-[15px]"></View>
                            <Text className="ml-auto leading-[24px] text-[#B8BFCC]  font-[700] text-[14px] ">
                                {tab === "Tháng trước" ? ((Number(tranThisMonth.tranIncome.amount) / 1000) + Number((tranThisMonth.tranIncome.amount) / 1000)).toLocaleString('vi-VN') : ((Number(sumTranPrevInMonth?.tranIncome?.amount) / 1000) + Number((sumTranPrevInMonth?.tranIncome?.amount) / 1000)).toLocaleString('vi-VN')}k
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
                    ) : (<View className="w-[91%]  bg-white mx-auto rounded-[12px] pb-[15px] px-[20px] " style={styles.shadowS}>
                        {
                            tranExpenseRecent.map((tran) => {
                                return (
                                    <View key={tran?._id} className="flex-row justify-between items-center  mt-[15px]">
                                        <View className="flex-row items-center gap-[10px]">
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
