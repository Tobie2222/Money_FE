import { View, Text ,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'

export default function TabViews({tabs,styleTabs,styleTab,styleTextTab,setCurrentTabs}) {
    const handleTab=(id,nameTab)=>{
        setCurrentTab(id)
        setCurrentTabs(nameTab)
    }

    const [currentTab,setCurrentTab]=useState(0)

    return (
        <View className={`w-full  ${styleTabs}`}>
            {
                tabs.map((tab)=>{
                    return (
                        <TouchableOpacity key={tab.id} onPress={()=>handleTab(tab.id,tab.title)} activeOpacity={0.8} className={`w-[50%] ${tab.id===currentTab?"bg-white ":""}   flex-row items-center justify-center ${styleTab}`}>
                            <Text className={` ${styleTextTab}`}>{tab.title}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}