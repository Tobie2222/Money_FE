import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const CustomBarChart = ({ data }) => {
    const [selectedItem, setSelectedItem] = useState(null)
    const onBarPress = (index) => {
        if (selectedItem && selectedItem === data[index]) {
            setSelectedItem(null)
        } else {
            setSelectedItem(data[index])
        }
    }
    return (
        <GestureHandlerRootView>
            <View className="relative bg-white py-[14px] px-[8px] rounded-[8px] shadow-sm z-[-1]">
                <BarChart
                    barWidth={8}
                    noOfSections={5}
                    barBorderRadius={4}
                    spacing={15}
                    frontColor="#666666"
                    data={data.map((item, index) => ({
                        ...item,
                        label: item.label, 
                        onPress: () => onBarPress(index) 
                    }))}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    hideRules={true}
                />
                {selectedItem && (
                    <View className="bg-primaryColor top-[-10px] right-[-20px] flex flex-row justify-center items-center py-[12px] px-[14px] rounded-[6px] absolute">
                        <Text className="text-[14px] text-white font-[500]">Giá trị: {selectedItem.value.toLocaleString('vi-VN')} vnđ</Text>
                    </View>
                )}
            </View>
        </GestureHandlerRootView>
    )
}

export default CustomBarChart
