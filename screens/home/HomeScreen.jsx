import { View ,Text,StatusBar,StyleSheet,Image, ScrollView, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AbstractCircle from '../../components/AbstractCircle'
import TabViews from '../../components/TabViews'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { showToastU } from '../../utils/toast'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CutomToast'
import {  useDispatch, useSelector } from 'react-redux'
import { selectMessage, selectSuccess, selectToken, selectUser } from '../../redux/authSlice'
import { getBalance } from '../../data/Api'
import { getBalances, selectRefresh } from '../../redux/accountSlice'



const labelCost=[
    "25.000k",
    "20.000k",
    "15.000k",
    "10.000k",
    "5.000k",
    "0",
]

export default function HomeScreen() {
    const token=useSelector(selectToken)
    const user=useSelector(selectUser)
    const refresh=useSelector(selectRefresh)
    const dispatch=useDispatch()
    const {t}=useTranslation()
    const navigation = useNavigation()
    const [hiddenTime,setHiddenTime]=useState(false)
    const [totalBalance,setTotalBalance]=useState(0)
    const message=useSelector(selectMessage)
    const success=useSelector(selectSuccess)
    const [valueTime,setValueTime]=useState("Tháng này")
    console.log(message)

    useEffect(()=>{
        if(success) {
            showToastU(message,"#0866ff","check",3000)
        }
    },[success])

    //fetching total balance
    useEffect(()=>{
        const getTotalBalance= async () => {
            try {
                const response = await getBalance(user?.id, {
                    headers: {
                        token: `bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    dispatch(getBalances({
                        balance: response.data.totalBalance
                    }))
                    console.log(response.data)
                    setTotalBalance(response.data.totalBalance)
                }
            } catch (err) {
                console.log(err)
            }
        }
        if (token || refresh) {
            getTotalBalance()
        }
    },[token,refresh])


    return (
        <View className="flex-1 ">
            <AbstractCircle/>
            <StatusBar
                barStyle="light-content"
            />
            <View className="z-20">
                <Toast 
                    config={{
                        custom_toast: (internalState) => <CustomToast {...internalState} />
                    }} 
                />
            </View>
            <ScrollView>
                <View className="flex-row items-center w-full justify-between mt-[70px] px-[20px]">
                    <Text className="text-white text-[24px] leading-[33px] font-[700] ">{totalBalance.toLocaleString('vi-VN')} đ</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate("notificationScreen")}>
                        <Icon name={"bell"} size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text className="text-white text-[14px] leading-[21px] font-[600] ml-[20px] ">{t('Balance')}</Text>
                {/* my account */}
                <View className="w-[91%]  mt-[20px] bg-white mx-auto rounded-[12px] py-[15px] px-[20px] " style={styles.shadowS}>
                        <View className="flex-row justify-between ">
                            <Text className="text-[#000000] text-[15px] leading-[22px] font-[500]">{t('myAccount')}</Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate("accountScreen")} >
                                <Text className="text-clickButton text-[14px] leading-[18px] font-[500]">{t('viewAll')}</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View className="flex-row justify-between items-center mt-[10px] ">
                            <View className="flex-row items-center gap-[10px] ">
                                <Image
                                    source={require("../../assets/pig.png")}
                                    className="w-[35px] h-[35px] rounded-[100px] object-cover border border-borderColor "
                                />
                                <Text className="text-textColor text-[14px] leading-[18px] font-[500]">{t('cash')}</Text>
                            </View>
                            <Text className="text-textColor text-[16px] leading-[24px] font-[500]">1.500.000 đ</Text>
                        </View>
                    </View>
                <Text className="text-white text-[14px] leading-[21px] font-[600] ml-[20px] my-[20px] ">{t('expenseReport')}</Text>
                {/* report */}
                <View className="w-[91%] bg-white mx-auto rounded-[12px] py-[15px] px-[20px] " style={styles.shadowS}>
                    <Text className="text-[#000000] text-[18px] leading-[27px] font-[500]">12.000.000.000 đ</Text>
                    <Text className="text-textColor mt-[5px] ml-[5px] text-[14px] leading-[21px] font-[500]">{t('totalSpendingThisMonth')}<Text className="text-clickButton font-[600]">Tăng 20%</Text></Text>
                    <TabViews
                        tabs={[{id:0,title: "Tháng"},{id:1,title: "Tuần"},]}
                        styleTabs="h-[30px] bg-[#f0eef1] mt-[10px] rounded-[8px] flex-row items-center px-[4px]"
                        styleTextTab="text-[14px] font-[500] text-textColor"
                        styleTab="rounded-[6px] h-[24px]"
                    />
                    <View className="flex-row justify-between ">
                        <View className="flex-row gap-[25px] items-end">
                            <View className="flex-col items-end">
                                {
                                    labelCost.map((item)=>{
                                        return (
                                            <Text key={item} className="text-[#B8BFCC] mt-[15px] font-[700] text-[14px] ">{item}</Text>
                                        )
                                    })
                                }
                            </View>
                            {/* column char */}
                            <View className="w-[10px] h-[160px] bg-[#22C55E] rounded-[30px] "></View>
                            <View className="w-[10px] h-[108px] bg-[#A855F7] rounded-[30px] "></View>
                        </View>
                        <View className="mt-[15px] ">
                            <TouchableOpacity activeOpacity={0.9} onPress={()=>setHiddenTime(!hiddenTime)} className=" flex-row items-center gap-[5px] relative mb-[60px] ml-auto">
                                <Text className="text-[#4B7BE5] font-[500] text-[15px] ">{valueTime}</Text>
                                <Icon name={"chevron-down"} size={18} color="#4B7BE5" />
                                {
                                    hiddenTime && (
                                        <View  className="absolute w-[100px] bg-[#f0eef1] rounded-[4px] top-[100%] px-[5px] ">
                                            <TouchableOpacity onPress={()=>{setHiddenTime(false); setValueTime("Tháng này")}}><Text  className="text-textColor font-[400] text-[14px] mt-[5px]">Tháng này</Text></TouchableOpacity>
                                            <TouchableOpacity  onPress={()=>{setHiddenTime(false); setValueTime("Tháng trước")}}><Text className="text-textColor font-[400] text-[14px] my-[5px]">Tháng trước</Text></TouchableOpacity>
                                        </View>
                                    )
                                }
                            </TouchableOpacity>
                            <View className="flex-col gap-[10px] ">
                                <View className="flex-row items-center ">
                                    <View className="flex-row items-center gap-[5px]">
                                        <View className="w-[15px] h-[15px] bg-[#22C55E] rounded-[100px]"></View>
                                        <Text className="text-[15px] font-[700] text-[#606C80]">Tiền thu</Text>
                                    </View>
                                    <Text className="ml-[16px] leading-[24px] text-[#B8BFCC]  font-[700] text-[14px] ">25.000k</Text>
                                </View>
                                <View className="flex-row items-center ">
                                    <View className="flex-row items-center gap-[5px] ">
                                        <View className="w-[15px] h-[15px] bg-[#A855F7] rounded-[100px]"></View>
                                        <Text className="text-[15px] font-[700] text-[#606C80]">Tiền chi</Text>
                                    </View>
                                    <Text className="ml-[16px] leading-[24px] text-[#B8BFCC]  font-[700] text-[14px] ">25.000k</Text>
                                </View>
                            </View>
                            <View className="w-full h-[1px] bg-borderColor my-[15px]"></View>
                            <Text className="ml-auto leading-[24px] text-[#B8BFCC]  font-[700] text-[14px] ">25.000k</Text>
                        </View>
                    </View>
                </View>
                {/* recent spending */}
                <View className="flex-row justify-between my-[20px] mx-[20px] ">
                    <Text className="text-textColor text-[14px] leading-[21px] font-[600] ">{t('recentExpenses')}</Text>
                    <TouchableOpacity activeOpacity={0.9}>
                        <Text  className="text-primaryColor text-[14px] leading-[21px] font-[600] ">{t('viewAll')}</Text>
                    </TouchableOpacity>
                </View>
                <View className="w-[91%]  bg-white mx-auto rounded-[12px] py-[15px] px-[20px] " style={styles.shadowS}>
                    <View className="flex-row justify-between items-center ">
                        <View className="flex-row items-center gap-[10px] ">
                            <Image
                                source={require("../../assets/pig.png")}
                                className="w-[35px] h-[35px] rounded-[200px] object-cover border border-borderColor "
                            />
                            <Text className="text-textColor text-[14px] leading-[18px] font-[500]">Ăn uống</Text>
                        </View>
                        <Text className="text-warningColor text-[16px] leading-[24px] font-[500]">-1.500.000 đ</Text>
                    </View>
                    <View className="flex-row justify-between items-center mt-[15px] ">
                        <View className="flex-row items-center gap-[10px] ">
                            <Image
                                source={require("../../assets/pig.png")}
                                className="w-[35px] h-[35px] rounded-[100px] object-cover border border-borderColor "
                            />
                            <Text className="text-textColor text-[14px] leading-[18px] font-[500]">Đổ xăng</Text>
                        </View>
                        <Text className="text-warningColor text-[16px] leading-[24px] font-[500]">-1.500.000 đ</Text>
                    </View>
                </View>
                {/* recent income */}
                <View className="flex-row justify-between my-[20px] mx-[20px] ">
                    <Text className="text-textColor text-[14px] leading-[21px] font-[600] ">{t('recentIncome')}</Text>
                    <TouchableOpacity activeOpacity={0.9}>
                        <Text  className="text-primaryColor text-[14px] leading-[21px] font-[600] ">Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <View className="w-[91%]  bg-white mx-auto rounded-[12px] py-[15px] px-[20px] mb-[30px]" style={styles.shadowS}>
                    <View className="flex-row justify-between items-center ">
                        <View className="flex-row items-center gap-[10px] ">
                            <Image
                                source={require("../../assets/pig.png")}
                                className="w-[35px] h-[35px] rounded-[100px] object-cover border border-borderColor "
                            />
                            <Text className="text-textColor text-[14px] leading-[18px] font-[500]">Ăn uống</Text>
                        </View>
                        <Text className="text-warningColor text-[16px] leading-[24px] font-[500]">-1.500.000 đ</Text>
                    </View>
                    <View className="flex-row justify-between items-center mt-[15px] ">
                        <View className="flex-row items-center gap-[10px] ">
                            <Image
                                source={require("../../assets/pig.png")}
                                className="w-[35px] h-[35px] rounded-[100px] object-cover border border-borderColor "
                            />
                            <Text className="text-textColor text-[14px] leading-[18px] font-[500]">Đổ xăng</Text>
                        </View>
                        <Text className="text-warningColor text-[16px] leading-[24px] font-[500]">-1.500.000 đ</Text>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    icon: {
        fontSize: 22, 
        fontWeight: 400
    },
    shadowS: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2
    },
    shadowX: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.00,

        elevation: 2
    }
})
