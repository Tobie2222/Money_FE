import { View ,Image,Text } from 'react-native'
import ButtonCom from '../components/ButtonCom'
import AbstractShape from '../components/AbstractShape'
import { useNavigation } from '@react-navigation/native'
import { readData } from '../utils/storage'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateToken } from '../redux/authSlice'



export default function StartScreens() {
    const [tokenS,setTokenS]=useState("")
    const navigation = useNavigation()
    const dispatch=useDispatch()


    useEffect(()=>{
        const upDateToken = async () => {
            try {
                const tmp_token = await readData("token")
                setTokenS(tmp_token)
                console.log(tmp_token)
            } catch (err) {
                console.log("Error reading token:", err)
            }
        }
        upDateToken()
    },[])
    useEffect(()=>{
        if (tokenS) {
            dispatch(updateToken(tokenS))
            navigation.navigate("bottomTabScreen")
        }
    },[tokenS])

    return (
        <View className="flex-1">
            <AbstractShape/>
            <Image
                source={require("../assets/pig.png")}
                className="w-[200px] h-[240px] mt-[200px] mx-auto object-cover "
            />
            <Text className="mx-auto text-center font-[700] leading-[39px] text-[26px] text-primaryColor w-[300px]">Chào mừng đến với <Text className="text-[#FBBE4A]">M</Text>.app</Text>
            <ButtonCom
                text="Bắt đầu"
                styleButton="px-[96px] py-[13px] mt-[218px] mx-auto bg-primaryColor rounded-[40px] " 
                styleText="text-white text-[16px] leading-[24px] font-[600]" 
                onPress={() =>  navigation.navigate('selectLanguageScreen')}
            />
        </View>
    )
}

