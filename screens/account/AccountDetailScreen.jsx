import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Text, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome'
import TabViews from '../../components/TabViews'
import { useEffect, useState } from 'react'
import { selectToken, selectUser } from '../../redux/authSlice'
import { useSelector } from 'react-redux'
import { Calendar } from 'react-native-calendars';
import WeekView from 'react-native-week-view';
import ButtonCom from '../../components/ButtonCom'

export default function AccountDetailScreen() {
    const [selectedDate, setSelectedDate] = useState(null)
    const token = useSelector(selectToken)
    const route = useRoute()
    const navigation = useNavigation()
    const [activeTab, setActiveTab] = useState("Khoản chi")
    const { t } = useTranslation()
    const { id } = route.params || {}

    const date = new Date()
    // Lấy năm, tháng, ngày
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, '0'); // Ngày

    // Định dạng ngày
    const formattedDate = `${year}-${month}-${day}`;
    const tabs = [
        { id: 0, name: "Khoản chi" },
        { id: 1, name: "Khoản thu" }
    ]
    console.log(formattedDate)

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
    useEffect(() => { }, [token])
    const tranExpense = [
        { id: 0, name: "mua đồ dùng 1", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 1, name: "mua đồ dùng 2", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 2, name: "mua đồ dùng 3", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 3, name: "mua đồ dùng 4", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 4, name: "mua đồ dùng 5", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 5, name: "mua đồ dùng 1", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 6, name: "mua đồ dùng 2", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 7, name: "mua đồ dùng 3", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 8, name: "mua đồ dùng 4", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 9, name: "mua đồ dùng 5", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 10, name: "mua đồ dùng 1", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 11, name: "mua đồ dùng 2", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 12, name: "mua đồ dùng 3", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 13, name: "mua đồ dùng 4", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 14, name: "mua đồ dùng 14", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    ]
    const tranInCome = [
        { id: 0, name: "Lương 1", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 1, name: "Lương 2", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 2, name: "Lương 3", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 3, name: "Lương 4", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 4, name: "Lương 5", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 5, name: "Lương 1", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 6, name: "Lương 2", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 7, name: "Lương 3", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 8, name: "Lương 4", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 9, name: "Lương 5", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 10, name: "Lương 1", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 11, name: "Lương 2", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 12, name: "Lương 3", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 13, name: "Lương 4", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
        { id: 14, name: "Lương 14", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    ]


    console.log(id)

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
                <View className="w-full  px-[20px] mt-[30px]">
                    <View className="w-full bg-white shadow-md rounded-[20px] overflow-hidden">
                        <Calendar
                            // Định dạng tháng
                            monthFormat={'MMMM - yyyy'}
                            // Khi một ngày được chọn
                            onDayPress={handleDayPress}
                            // Ngày hiện tại và ngày được chọn
                            markedDates={markedDates}
                            // Cài đặt kiểu dáng
                            theme={{
                                selectedDayBackgroundColor: '#fff',
                                todayTextColor: '#00adf5',
                                arrowColor: '#666666',

                            }}
                        />
                    </View>
                </View>
                <Text className="text-center text-textColor mt-[40px] text-[16px] font-[400]">Số dư của ví</Text>
                <Text className="text-center text-primaryColor text-[30px] font-[700] leading-[45px] ">96.000.000 vnđ</Text>
                <View className="w-full bg-white h-full rounded-[40px] mt-[40px] px-[25px] py-[20px]">
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
                    <View className="mt-[20px] h-[500px] mb-[30px]">
                        <ScrollView className="flex-1 h-full">
                            {
                                (activeTab === "Khoản chi" ? tranExpense : tranInCome).map((item) => {
                                    return (
                                        <View key={item.id} className="flex flex-row justify-between items-center mt-[10px]" >
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => { }} className="flex flex-row items-center">
                                                <View className="w-[50px] h-[50px] border border-[#b2b2b2] rounded-[100px] ">
                                                    <Image
                                                        source={{ uri: `${item.image}` }}
                                                        className="object-cover w-full h-full rounded-[100px]"
                                                    />
                                                </View>
                                                <View className="ml-[10px] flex flex-col items-start">
                                                    <Text className="text-center text-textColor text-[16px] font-[600]">{item.name}</Text>
                                                    <Text className={`text-center mt-[5px] ${activeTab === "Khoản chi" ? "text-warningColor" : "text-clickButton"}  text-[12px] font-[500]`}>{item.balance} {item.currency}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
