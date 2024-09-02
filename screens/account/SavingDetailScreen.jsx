import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Text, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import TabViews from '../../components/TabViews'
import { useEffect, useState } from 'react'
import { selectToken, selectUser } from '../../redux/authSlice'
import { useSelector } from 'react-redux'
import AbstractCircle from '../../components/AbstractCircle'
import ButtonCom from '../../components/ButtonCom'
import { getSaving } from '../../data/Api'
import WidthCurrentSavingAmount from '../../components/WidthCurrentSavingAmount'
import { format, parseISO } from 'date-fns'





export default function SavingDetailScreen() {
    const token = useSelector(selectToken)
    const user=useSelector(selectUser)
    const route = useRoute()
    const navigation = useNavigation()
    const [savingD,setSavingD]=useState({})
    const { t } = useTranslation()
    const { savingId } = route.params || {}
    //fetching saving detail
    useEffect(()=>{
        const getDetailSaving=async()=>{
            try {
                const response=await getSaving(savingId,user?.id,{
                    headers: {
                        token: `Bearer ${token}`
                    }
                })
                if (response.status===200) {
                    setSavingD(response.data.saving)
                }
            } catch (err) {
                console.log(err)
            }
        }
        if (token){
        getDetailSaving()}
    },[token])
    console.log(savingD)
    const goalAmount = savingD?.goal_amount || 0
    const currentAmount = savingD?.current_amount || 0
    const remainingAmount = savingD?.remainingAmount || 0
    const savingDate = savingD?.saving_date ? format(parseISO(savingD.saving_date), 'dd/MM/yyyy') : ''
    const deadlineDate = savingD?.deadline ? format(parseISO(savingD.deadline), 'dd/MM/yyyy') : ''
    return (
        <View className="flex-1 bg-backGroundColor">
            <StatusBar
                barStyle="dark"
            />
            <AbstractCircle />
            <View className="flex-row items-center mt-[80px] mb-[40px] w-full px-[25px] ">
                <TouchableOpacity onPress={() => navigation.navigate("accountScreen")} className=" w-[28px] h-[28px]  flex items-center justify-center mr-[70px]">
                    <Icon name='chevron-left' color={"#fff"} size={22} />
                </TouchableOpacity>
                <View className=" flex flex-row items-center gap-[10px]">
                    <View className="w-[30px] h-[30px] border border-[#b2b2b2] rounded-[100px] ">
                        <Image
                            source={{ uri: `${savingD?.saving_image}` }}
                            className="object-cover w-full h-full rounded-[100px]"
                        />
                    </View>
                    <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ">{savingD?.saving_name}</Text>
                </View>
            </View>
            <View className="w-full mt-[60px] px-[20px]">
                <View className="w-full flex flex-col  bg-white rounded-[16px] shadow-sm p-[20px]">
                    <View className="flex flex-row gap-[15px] ">
                        <Icon name='calendar' color={"#666666"} size={22} />
                        <Text className="text-[16px] text-textColor font-[500]">{savingDate} - {deadlineDate}</Text>
                    </View>
                    <Text className="text-[14px] mt-[5px] text-iconColor ">(Con khoảng {savingD?.remainingDate} ngày)</Text>
                    <View className="flex flex-col items-end mt-[20px]">
                        <Text className="text-[18px] font-[700] text-primaryColor">{goalAmount.toLocaleString('vi-VN')} vnđ</Text>
                        <WidthCurrentSavingAmount
                            goal_amount={goalAmount}
                            current_amount={currentAmount}
                            styleParent='w-[100%] h-[6px] my-[5px]'
                            styleChildren="h-[6px]"
                        />
                        <View className="w-full flex flex-row justify-between">
                            <Text className="text-[12px] font-[500] text-primaryColor">
                            {currentAmount.toLocaleString('vi-VN')} vnđ</Text>
                            <Text className="text-[12px] font-[500] text-textColor">
                            {remainingAmount.toLocaleString('vi-VN')}  vnđ</Text>
                        </View>
                    </View>
                </View>
                <ButtonCom
                    text="Gửi vào"
                    styleButton="w-full flex py-[13px] mt-[130px] border border-primaryColor mb-[30px] rounded-[40px] "
                    styleText="text-white text-center text-[16px] leading-[24px] font-[600] text-primaryColor"
                    onPress={() => navigation.navigate("depositMoneySavingScreen",{nameSaving: savingD?.saving_name,imageSaving: savingD?.saving_image})}
                />
            </View>
        </View>
    )
}