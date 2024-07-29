import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const ButtonCom = ({ className="", text="", onPress, styleText="" }) => {
    const onPressCom=(()=>{}) || onPress
    return (
        <View
            className={`${className}`}
            onPress={onPressCom}
        >
            <Text className={`${styleText}`}>{text}</Text>
        </View>
    )
}
export default ButtonCom
