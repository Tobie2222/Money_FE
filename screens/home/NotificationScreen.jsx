import { View, Text, StatusBar, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AbstractCircle from '../../components/AbstractCircle'
import TabViews from '../../components/TabViews'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { showToastU } from '../../utils/toast'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CutomToast'
import { useDispatch, useSelector } from 'react-redux'
import { selectMessage, selectSuccess, selectToken, selectUser } from '../../redux/authSlice'
import { getAllAccount, getAllTranRecent, getAvgTranMonth } from '../../data/Api'
import { getAccounts, getTranThisMount, selectAccounts, selectRefresh, selectTranThisMonth } from '../../redux/accountSlice'
import { getBalance } from '../../redux/accountSelector'

export default function NotificationScreen() {
    const token=useSelector(selectToken)
    const user = useSelector(selectUser)
    const refresh = useSelector(selectRefresh)
    const navigation = useNavigation()
    const { t } = useTranslation()

    //fetching data
    useEffect(() => {
        //get all account
        // const getAllAccounts = async () => {
        //     try {
        //         const response = await getAllAccount(user?.id, {
        //             headers: {
        //                 token: `bearer ${token}`
        //             }
        //         })
        //         if (response.status === 200) {
        //             dispatch(getAccounts({
        //                 accounts: response.data.allAccountByUser
        //             }))
        //         }
        //     } catch (err) {
        //         console.log(err)
        //     }
        // }
    }, [token, refresh])

    return (
        <View className="flex-1" >
            <StatusBar
                barStyle="dark"
            />
            <AbstractCircle />
            <View className="flex-row items-center mt-[80px] mb-[40px] w-full px-[25px] ">
                <TouchableOpacity onPress={() => navigation.navigate("homeScreen")} className=" w-[28px] h-[28px]  flex items-center justify-center">
                    <Icon name='chevron-left' color={"#fff"} style={styles.icon} />
                </TouchableOpacity>
                <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ml-[100px] ">Thông báo</Text>
            </View>
            <ScrollView className="w-full h-full bg-[#F5F4FB] p-[20px]">
                <View className="w-full p-[20px] bg-white rounded-[6px] shadow-2xl border border-borderColor ">
                    <View className="flex flex-row justify-between items-center">
                        <Text className="text-[14px] text-textColor font-[500] ">Thông báo số 1 <Text className="text-[15px] font-[600] text-warningColor">(Quan trọng)</Text> </Text>
                        <Icon name="ellipsis-v" size={22} color="#AAAAAA" />
                    </View>
                    <Text className="text-[12px] font-[400] text-iconColor mb-[8px]">(11/10/2024) </Text>
                    <Text className="text-[16px] font-[400] text-textColor ">Nội dung của thông báo số 1, phần mềm sắp update </Text>
                </View>
                
            </ScrollView>
            {/* <ScrollView className="w-full h-full bg-white rounded-t-[36px] px-[20px] py-[25px]">
                <View className="">
                    <Text className="text-[20px] text-center text-textColor font-[600] mt-[100px] ">Không có thông báo nào</Text>
                    <Image
                        className="w-[200px] h-[200px] mx-auto mt-[40px] object-cover"
                        source={{uri: "https://s3-alpha-sig.figma.com/img/e224/311e/ad4282c1095acb9f0a249e6846fc58a6?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=o79vKFqjKxvscW6fpTzuJcgXi2YXmJks38nJJxlwwE-msUQqaZEPXSjjiF3NZqCcDG1KbbF8yXtBb9dAho4LYMi53Qy07pgbY3t25SFu0qgKAAIocjbOafGTxe5LSkGGbvzHD~4Zz2yWnPc2cSoaJ6S1yTJ-bC7OC7UDVEpw19nJp6eylQ0rJtn5jBDidlPTFeJ0xm-k7C0925NYFHFV5y2df-4Ej3jYPVxY7M9N~885~uOCdD1yrATnueLdQZ8c2emEqPtptDeV-kwtzzG~g90m3cYjL3yH28MSbPfrkHik7ddqKfEl2C4RXtem5OiJa5w1ZxQwk1wsuxjrKZe6VA__"}}
                    />
                </View>
            </ScrollView> */}
        </View>
    )
}
const styles = StyleSheet.create({
    icon: {
        fontSize: 22,
        fontWeight: 400
    },
    inputSelect: {
        shadowColor: "#000",
        shadowOffset: {
            width: 8,
            height: 8,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 2,
    }
})