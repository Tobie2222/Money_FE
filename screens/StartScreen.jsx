import { View ,Image,Text } from 'react-native'
import ButtonCom from '../components/ButtonCom'
import AbstractShape from '../components/AbstractShape'
import { useNavigation } from '@react-navigation/native'
import { readData } from '../utils/storage'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken, updateTsAuth } from '../redux/authSlice'
import { useTranslation } from 'react-i18next'



export default function StartScreens() {
    const {t}=useTranslation()
    const [dataS,setDataS]=useState({})
    const token=useSelector(selectToken)
    const navigation = useNavigation()
    const dispatch=useDispatch()

    useEffect(()=>{
        const updateData=async()=>{
            try {
                const data=await readData("dataSave")
                if (data["user"]) {
                    data["user"]=JSON.parse(data["user"])
                }
                setDataS(data)
            } catch (err) {
                console.log(err)
            }
        }
        updateData()
    },[])
    console.log("data save",dataS)
    // useEffect(()=>{
    //     dispatch(updateTsAuth({token: dataS?.token,user: dataS?.user}))
    //     if (token) {
    //         console.log("token",token)
    //         //navigation.navigate("bottomTabScreen")
    //     }
    // },[dataS,token])

    return (
        <View className="flex-1">
            <AbstractShape/>
            <Image
                source={require("../assets/pig.png")}
                className="w-[200px] h-[240px] mt-[200px] mx-auto object-cover "
            />
            <Text className="mx-auto text-center font-[700] leading-[39px] text-[26px] text-primaryColor w-[300px]">{t("Welcome")}<Text className="text-[#FBBE4A]">M</Text>.app</Text>
            <ButtonCom
                text={t("Start")}
                styleButton="px-[96px] py-[13px] mt-[218px] mx-auto bg-primaryColor rounded-[40px] " 
                styleText="text-white text-[16px] leading-[24px] font-[600]" 
                onPress={() =>  navigation.navigate('selectLanguageScreen')}
            />
        </View>
    )
}

