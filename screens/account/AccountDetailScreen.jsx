import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { View, Text, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useEffect, useState } from 'react'
import { selectToken, selectUser } from '../../redux/authSlice'
import { useSelector } from 'react-redux'
import { Calendar } from 'react-native-calendars'
import { selectRefresh } from '../../redux/accountSlice'
import { getAccount } from '../../data/Api'


export default function AccountDetailScreen() {
    const refresh = useSelector(selectRefresh)
    const [selectedDate, setSelectedDate] = useState(null)
    const token = useSelector(selectToken)
    const user = useSelector(selectUser)
    const route = useRoute()
    const navigation = useNavigation()
    const [activeTab, setActiveTab] = useState("Khoản chi")
    const [expenses, setExpenses] = useState([])
    const [incomes, setIncomes] = useState([])
    const [balance, setBalance] = useState(0)
    const { t } = useTranslation()
    const { accountId } = route.params || {}

    // Lấy năm, tháng, ngày
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    // Định dạng ngày
    const formattedDate = `${year}-${month}-${day}`
    const tabs = [
        { id: 0, name: "Khoản chi" },
        { id: 1, name: "Khoản thu" }
    ]
    const handleDayPress = (day) => {
        setSelectedDate(day.dateString)
    }
    const markedDates = {
        ...(selectedDate && selectedDate !== formattedDate ? {
            [selectedDate]: {
                selected: true,
                selectedColor: 'blue',
                selectedTextColor: 'white'
            }
        } : {
            [formattedDate]: {
                selected: true,
                selectedColor: 'blue',
                selectedTextColor: 'white'
            }
        })
    }
    useEffect(() => {
        const getDetailAccount = async () => {
            try {
                const response = await getAccount(accountId, user?.id, {
                    headers: {
                        token: `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setBalance(response.data.accountDetails.balance)
                    setExpenses(response.data.accountDetails.expenseTransactions)
                    setIncomes(response.data.accountDetails.incomeTransactions)
                }
            } catch (err) {
                console.log(err)
            }
        }
        if (token) {
            getDetailAccount()
        }
    }, [token, refresh])

    return (
        <View className="flex-1 bg-backGroundColor">

            <StatusBar
                barStyle="dark"
            />
            <ScrollView>
                <View className="w-full h-[130px] px-[25px] bg-primaryColor flex flex-row items-center ">
                    <TouchableOpacity onPress={() => navigation.navigate("accountScreen")} className=" w-[28px] h-[28px]  flex items-center justify-center mr-[110px]">
                        <Icon name='chevron-left' color={"#fff"} size={22} />
                    </TouchableOpacity>
                    <View className=" flex flex-row items-center gap-[10px]">
                        <View className="w-[30px] h-[30px] border border-[#b2b2b2] rounded-[100px] ">
                            <Image
                                source={{ uri: `https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg` }}
                                className="object-cover w-full h-full rounded-[100px]"
                            />
                        </View>
                        <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ">Ví 1</Text>
                    </View>
                </View>
                {/* <View className="w-full  px-[20px] mt-[30px]">
                    <View className="w-full bg-white shadow-md rounded-[20px] overflow-hidden">
                        <Calendar
                            // Định dạng tháng
                            monthFormat={'MMMM - yyyy'}
                            onDayPress={handleDayPress}
                            markedDates={markedDates}
                            theme={{
                                selectedDayBackgroundColor: '#fff',
                                todayTextColor: '#00adf5',
                                arrowColor: '#666666',
                            }}
                        />
                    </View>
                </View> */}
                <Text className="text-center text-textColor mt-[40px] text-[16px] font-[400]">Số dư của ví</Text>
                <Text className="text-center text-primaryColor text-[30px] font-[700] leading-[45px] ">{balance.toLocaleString('vi-VN')} vnđ</Text>
                <ScrollView className="w-full h-[100vh] bg-white rounded-[40px] mt-[40px] px-[25px] py-[20px]">
                    <View className="w-full h-full bg-white ">
                        <View className="w-full border-b border-[#e5e7e9] flex flex-row items-center">
                            {
                                tabs.map((tab) => {
                                    return (
                                        <TouchableOpacity key={tab.id} activeOpacity={0.8} onPress={() => { setActiveTab(tab.name) }} className={`w-[50%] flex flex-row justify-center border-b-[3px] ${activeTab === tab.name ? "border-primaryColor" : "border-transparent"}  py-[10px]`}>
                                            <Text className="text-[18px] text-[#9BA1A8] font-[600] ">{tab.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <View className="w-full h-full bg-white mt-[20px] mb-[30px]">
                            {
                                (activeTab === "Khoản chi" ? expenses : incomes).length === 0 ? <View className="w-full flex flex-col items-center mt-[40px]">
                                    <Text className="text-[16px] text-textColor font-[500]">Không có dữ liệu!</Text>
                                    <Image
                                        className="w-[100px] h-[100px]"
                                        source={{ uri: "https://s3-alpha-sig.figma.com/img/e224/311e/ad4282c1095acb9f0a249e6846fc58a6?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=o79vKFqjKxvscW6fpTzuJcgXi2YXmJks38nJJxlwwE-msUQqaZEPXSjjiF3NZqCcDG1KbbF8yXtBb9dAho4LYMi53Qy07pgbY3t25SFu0qgKAAIocjbOafGTxe5LSkGGbvzHD~4Zz2yWnPc2cSoaJ6S1yTJ-bC7OC7UDVEpw19nJp6eylQ0rJtn5jBDidlPTFeJ0xm-k7C0925NYFHFV5y2df-4Ej3jYPVxY7M9N~885~uOCdD1yrATnueLdQZ8c2emEqPtptDeV-kwtzzG~g90m3cYjL3yH28MSbPfrkHik7ddqKfEl2C4RXtem5OiJa5w1ZxQwk1wsuxjrKZe6VA__" }}
                                    />
                                </View> : (activeTab === "Khoản chi" ? expenses : incomes).map((item) => {
                                    return (
                                        <View key={item._id} className="flex flex-row justify-between items-center mt-[10px]" >
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => { }} className="flex flex-row items-center">
                                                <View className="w-[50px] h-[50px] border border-[#b2b2b2] rounded-[100px] ">
                                                    <Image
                                                        source={{ uri: `${activeTab === "Khoản chi" ? item?.category?.categories_image : item?.incomeType?.income_type_image}` }}
                                                        className="object-cover w-full h-full rounded-[100px]"
                                                    />
                                                </View>
                                                <View className="ml-[10px] flex flex-col items-start">
                                                    <Text className="text-center text-textColor text-[16px] font-[600]">{item?.transaction_name}</Text>
                                                    <Text className={`text-center mt-[5px] ${activeTab === "Khoản chi" ? "text-warningColor" : "text-clickButton"}  text-[12px] font-[500]`}>{item?.amount}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
            </ScrollView>
        </View>
    )
}
