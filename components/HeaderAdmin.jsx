import { View, Text,TouchableOpacity,Image } from 'react-native'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/authSlice'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function HeaderAdmin({ toggleSheet ,children,title=""}) {
    const toggleSheetCom = toggleSheet || (() => { })
    const textInputRef = useRef()
    const user = useSelector(selectUser)

    return (
        <View className="px-[20px] w-full bg-white">
            <View className="mt-[80px] mb-[35px] flex-row items-center justify-between ">
                <TouchableOpacity activeOpacity={0.8} onPress={toggleSheetCom}>
                    <Icon name={`list`} size={24} color="#343C6A" />
                </TouchableOpacity>
                <Text className="text-[20px] font-[700] text-textColorAdmin">{title}</Text>
                <View>
                    <Image
                        source={{ uri: `${user?.avatar}` }}
                        className="w-[30px] h-[30px] rounded-[200px] border border-borderColor mx-auto object-cover"
                    />
                </View>
            </View>
            {children}
        </View>
    )
}