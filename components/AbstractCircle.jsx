import { View, Text } from 'react-native'
import React from 'react'

export default function AbstractCircle() {
    return (
        <View className="relative z-[-1]">
            <View className="absolute w-full h-[300px] bg-primaryColor"></View>
            <View className="absolute h-[115px] w-[115px] top-[250px] left-[150px] bg-primaryColor rounded-[50px] scale-x-[4]"></View>
        </View>
    )
}