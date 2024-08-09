import {ActivityIndicator, View} from 'react-native'
import React from 'react'

export default function Loading({color=""}) {
    return (
        <View className="flex-1 justify-center">
            <ActivityIndicator size="large" color={`${color}`}/>
        </View>
    )
}