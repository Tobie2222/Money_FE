import { View ,StatusBar,TouchableOpacity,StyleSheet,Text, Keyboard} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AbstractShape from '../components/AbstractShape'
import { useState } from 'react'
import ButtonCom from '../components/ButtonCom'
import {OtpInput} from "react-native-otp-entry"


export default function VerifyCodeScreen() {
    const navigation = useNavigation()
    const [otp,setOtp]=useState('')
    const handleOTPChange=(values)=>{
        setOtp(values)
        if (values.length===4) {
            Keyboard.dismiss()
        }
    }
    console.log(otp)
    return (
        <View className="flex-1 bg-white">
            <StatusBar
                barStyle="black"
            />
            <AbstractShape/>
            <View className="mt-[70px] mx-[25px] flex-row items-center ">
                <TouchableOpacity onPress={()=>navigation.navigate("forgotPassword")} className="w-[4%]  h-[28px] flex items-center justify-center">
                    <Icon name='chevron-left'  color={"#438883"} style={styles.icon}/>
                </TouchableOpacity>
                <View className=" w-[95%]">
                    <Text className=" text-center text-[24px] font-[600] text-textColor ">Nhập mã xác thực</Text>
                </View>
            </View>
            <Text className="text-center mt-[90px] text-[16px] leading-[20px] text-textColor font-[400]">
                Một mã gồm 4 chữ số đã được gửi về email <Text className="text-[#000000] font-[600]">example@gmail.com</Text>  của bạn
            </Text>
            <View className="mx-[44px] my-[90px] ">
                <OtpInput
                    numberOfDigits={4}
                    onTextChange={handleOTPChange}
                    disabled={false}
                    theme={{
                        pinCodeContainerStyle: {
                            backgroundColor: "white",
                            width: 75,
                            height: 75,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "transparent",
                            shadowColor: "#000000", 
                            shadowOffset: { width: 4, height: 4 }, 
                            shadowOpacity: 0.15, 
                            shadowRadius: 6, 
                            elevation: 5,
                        }
                    }}
                    focusColor={"#438883"}
                />
            </View>
            <View className="mx-auto flex-row items-center mt-[10px] bg-[#f5f4f8] px-[18px] py-[14px] rounded-[100px] ">
                <Icon name='clock-o'  color={"#666666"} style={styles.icon1}/>
                <Text className="text-textColor ml-[8px] text-[14px] font-[400]">00.21s</Text>
            </View>
            <Text className="text-center mt-[20px] text-[14px] leading-[18px] text-textColor font-[400]">
                Không nhận được mã OTP? <Text className="text-primaryColor text-[16px] font-[600]"> Gửi lại</Text>
            </Text>
            <ButtonCom
                text="Tiếp tục"
                styleButton="px-[96px] py-[13px] mt-[100px] mx-auto bg-primaryColor rounded-[40px] " 
                styleText="text-white text-[16px] leading-[24px] font-[600]" 
                onPress={() =>  navigation.navigate('resetPasswordScreen')}
            />
            
        </View>
    )
}
const styles = StyleSheet.create({
    icon: {
        fontSize: 22, 
        fontWeight: 400
    },
    icon1: {
        fontSize: 22,
    }
})
