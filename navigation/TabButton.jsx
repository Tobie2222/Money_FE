import { View, Text,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function TabButton({buttons,selectTab,setSelectTab}) {
    const [dimension,setDimension]=useState({height: 20,width: 100})
    return (
        <View                 
            accessibilityRole="tabbar" 
            className="bg-[#F0EEF1] rounded-[4px] justify-center"
        >
            <View className="flex-row" >
                {
                    buttons.map((button,index)=>{
                        return (
                            <TouchableOpacity onPress={()=>{}} key={index} className="flex-1 px-[20px]">
                                <Text className="">{button.title}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}