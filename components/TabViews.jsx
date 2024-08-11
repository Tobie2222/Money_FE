import { View, Text } from 'react-native'
import React from 'react'


const tabs=[
    {title: "Tháng"},
    {title: "Tuần"},
]

export default function TabViews() {
    return (
        <View className="w-full h-[30px] bg-[#f0eef1] mt-[10px] rounded-[8px] flex-row items-center px-[4px]">
            <View className="w-[50%] bg-white h-[24px] flex-row items-center justify-center rounded-[6px]">
                <Text className="text-[14px] font-[500] text-textColor ">Tháng</Text>
            </View>
            <View className="w-[50%] flex-row items-center justify-center">
                <Text className="text-[14px] font-[500] text-textColor ">Tuần</Text>
            </View>
        </View>
    )
}