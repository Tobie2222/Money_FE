import { View, Text } from 'react-native'
import React from 'react'

export default function AbstractCircle({shadowS}) {
    return (
        <View className="relative z-[-1]">
            <View style={shadowS} className="absolute h-[115px] w-[115px] top-[220px] left-[150px] bg-primaryColor rounded-[50px] scale-x-[4]"></View>
            <View className={`absolute  w-full h-[250px] bg-primaryColor`}></View>
        </View>
    )
}