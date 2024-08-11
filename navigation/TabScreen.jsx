import { View, Text } from 'react-native'
import React, { useState } from 'react'
import TabButton from './TabButton'


const buttons=[
    {
        title: 'tab1'
    },
    {
        title: 'tab2'
    }
]

export default function TabScreen() {
    const [selectTab,setSelectTab]=useState(null)
    return (
        <View>
            <TabButton
                buttons={buttons}
                selectTab={selectTab}
                setSelectTab={setSelectTab}
            />
        </View>
    )
}