import { View, Text ,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'


const tabs=[
    {id:0,title: "Tháng"},
    {id:1,title: "Tuần"},
]

export default function TabViews() {
    const [currentTab,setCurrentTab]=useState(0)

    return (
        <View className="w-full h-[30px] bg-[#f0eef1] mt-[10px] rounded-[8px] flex-row items-center px-[4px]">
            {
                tabs.map((tab)=>{
                    return (
                        <TouchableOpacity key={tab.id} onPress={()=>setCurrentTab(tab.id)} activeOpacity={0.8} className={`w-[50%] ${tab.id===currentTab?"bg-white ":""}  h-[24px] flex-row items-center justify-center rounded-[6px]`}>
                            <Text className="text-[14px] font-[500] text-textColor ">{tab.title}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}