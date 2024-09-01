import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Text, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import TabViews from '../../components/TabViews'
import { useEffect, useState } from 'react'
import { selectToken, selectUser } from '../../redux/authSlice'
import { useSelector } from 'react-redux'
import AbstractCircle from '../../components/AbstractCircle'
import ButtonCom from '../../components/ButtonCom'






export default function SavingDetailScreen() {
    const token = useSelector(selectToken)
    const route = useRoute()
    const navigation = useNavigation()
    const [activeTab, setActiveTab] = useState("Khoản chi")
    const { t } = useTranslation()
    const { id } = route.params || {}
    return (
        <View className="flex-1 bg-backGroundColor">
            <StatusBar
                barStyle="dark"
            />
            <AbstractCircle />
            <View className="flex-row items-center mt-[80px] mb-[40px] w-full px-[25px] ">
                <TouchableOpacity onPress={() => navigation.navigate("accountScreen")} className=" w-[28px] h-[28px]  flex items-center justify-center mr-[80px]">
                    <Icon name='chevron-left' color={"#fff"} size={22} />
                </TouchableOpacity>
                <View className=" flex flex-row items-center gap-[10px]">
                    <View className="w-[30px] h-[30px] border border-[#b2b2b2] rounded-[100px] ">
                        <Image
                            source={{ uri: `https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg` }}
                            className="object-cover w-full h-full rounded-[100px]"
                        />
                    </View>
                    <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ">Tích lũy 1</Text>
                </View>
            </View>
            <View className="w-full mt-[60px] px-[20px]">
                <View className="w-full flex flex-col  bg-white rounded-[16px] shadow-sm p-[20px]">
                    <View className="flex flex-row gap-[15px] ">
                        <Icon name='calendar' color={"#666666"} size={22} />
                        <Text className="text-[16px] text-textColor font-[500]">15/04/2022 - 11/10/2024</Text>
                    </View>
                    <Text className="text-[14px] mt-[5px] text-iconColor ">(Con khoảng 2 năm 16 tháng)</Text>
                    <View className="flex flex-col items-end mt-[20px]">
                        <Text className="text-[18px] font-[700] text-primaryColor">20.000.000đ</Text>
                        <View className="w-full h-[6px] my-[8px] bg-borderColor rounded-[8px]">
                            <View className="w-[20%] h-[6px]  bg-clickButton rounded-[6px]"></View>
                        </View>
                        <View className="w-full flex flex-row justify-between">
                            <Text className="text-[12px] font-[500] text-primaryColor">20.000.000đ</Text>
                            <Text className="text-[12px] font-[500] text-textColor">5.000.000đ</Text>
                        </View>
                    </View>
                </View>
                <ButtonCom
                    text="Gửi vào"
                    styleButton="w-full flex py-[13px] mt-[130px] border border-primaryColor mb-[30px] rounded-[40px] "
                    styleText="text-white text-center text-[16px] leading-[24px] font-[600] text-primaryColor"
                    onPress={() => navigation.navigate("depositMoneySavingScreen")}
                />
            </View>

        </View>
    )
}