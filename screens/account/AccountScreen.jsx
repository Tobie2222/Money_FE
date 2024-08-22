import { useTranslation } from 'react-i18next'
import {  View ,StyleSheet,Image,Text, StatusBar, ScrollView,TouchableOpacity,Modal } from 'react-native'


export default function AccountScreen() {
    const {t}=useTranslation()
    return (
        <View className="flex-1 ">
            <StatusBar
                barStyle="light"
            />
            <View className="">
                <View className="bg-primaryColor py-[70px]">
                    <Text className=" text-[20px] font-[700] text-white text-center">Ví của bạn </Text>
                </View>
            <View className="bg-green-500 w-full h-[30px] rounded-t-[8px]">

            </View>

            </View>
        </View>
    )
}

