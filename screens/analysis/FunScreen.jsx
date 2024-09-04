import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

export default function FunScreen() {
    const navigation = useNavigation()
    return (
        <View className="flex-1 bg-backGroundColor">
            <View className="w-full flex flex-row items-center justify-center bg-primaryColor h-[130px]">
                <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ">Thống kê</Text>
            </View>
            <View className="w-full mt-[30px] px-[30px] flex flex-row justify-between items-center">
                <TouchableOpacity onPress={()=>navigation.navigate("analysisScreen")} activeOpacity={0.7} className="w-[46%] h-[120px] border border-borderColor rounded-[14px] bg-[#E9EAEC] flex flex-row justify-center items-center">
                    <Text className="text-[16px] text-textColor font-[500]">Thống kê</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("tranIncome")} activeOpacity={0.7} className="w-[46%] h-[120px] px-[12px] border border-borderColor rounded-[14px] bg-[#E9EAEC] flex flex-row justify-center items-center">
                    <Text className="text-[16px] text-textColor font-[500] text-center">Danh sách khoản thu</Text>
                </TouchableOpacity>
            </View>
            <View className="w-full mt-[30px] px-[30px] flex flex-row justify-between items-center">
                <TouchableOpacity onPress={()=>navigation.navigate("tranExpenseScreen")} activeOpacity={0.7} className="w-[46%] h-[120px] px-[12px] border border-borderColor rounded-[14px] bg-[#E9EAEC] flex flex-row justify-center items-center">
                    <Text className="text-[16px] text-textColor font-[500] text-center">Danh sách khoản chi</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("tranDepositScreen")} activeOpacity={0.7} className="w-[46%] h-[120px] px-[12px] border border-borderColor rounded-[14px] bg-[#E9EAEC] flex flex-row justify-center items-center">
                    <Text className="text-[16px] text-textColor font-[500] text-center">Các khoản nạp tích lũy</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}