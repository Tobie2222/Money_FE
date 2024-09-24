import React from 'react'
import {  Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const ButtonCom = ({ styleButton="", text="", onPress, styleText="",nameIcon="",sizeIcon=20 ,colorIcon="#fff",styleWrapperIcon="hidden"}) => {
    const onPressCom= onPress || (()=>{})
    return (
        <TouchableOpacity
            className={ styleButton }
            onPress={onPressCom}
            activeOpacity={0.8}
        >
            <View className={`${styleWrapperIcon}`}>
                <Icon name={`${nameIcon}`} size={sizeIcon} color={colorIcon} />
            </View>
            <Text className={styleText}>{text}</Text>
        </TouchableOpacity>
    )
}
export default ButtonCom
