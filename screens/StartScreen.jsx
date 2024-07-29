import React from 'react';
import { View ,StyleSheet,Image,Text } from 'react-native'
import ButtonCom from '../components/ButtonCom'

export default function StartScreens() {
    return (
        <View className="flex-1">
            <View className="relative z-[-1]">
                <View className="absolute w-full h-[400px] bg-[#D6EEEB]"></View>
                <View className="h-[500px] w-full bg-[#D6EEEB] absolute top-[400px] border-t-[200px] border-l-[550px] border-t-[#D6EEEB] border-l-white" ></View>
            </View>
            <Image
                source={require("../assets/pig.png")}
                className="w-[200px] h-[240px] mt-[200px] mx-auto object-cover "
            />
            <Text className="mx-auto text-center font-[700] leading-[39px] text-[26px] text-primaryColor w-[300px]">Chào mừng bạn đến với <Text className="text-[#FBBE4A]">M</Text>.app</Text>
            <ButtonCom
                text="Bắt đầu"
                className="w-[250px] h-[50px] " 
                styleText="text-primaryColor" 
                onPress={() => alert('Button Pressed')}
            />
        </View>
    )
}

