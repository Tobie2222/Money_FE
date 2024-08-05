import React from 'react'
import {  Text, TouchableOpacity, View } from 'react-native'

const ButtonCom = ({ styleButton="", text="", onPress, styleText="" }) => {
    const onPressCom= onPress || (()=>{})
    return (
        <TouchableOpacity
            className={styleButton}
            onPress={onPressCom}
            activeOpacity={0.8}
        >
            <Text className={styleText}>{text}</Text>
        </TouchableOpacity>
    )
}
export default ButtonCom
