import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Image, Text, StatusBar, TouchableOpacity, Modal, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import TabViews from '../../components/TabViews'
import { useEffect, useState } from 'react'
import { selectToken, selectUser } from '../../redux/authSlice'
import { useSelector } from 'react-redux'
import { getAllAccount, getAllSaving } from '../../data/Api'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CutomToast'
import { showToastU } from '../../utils/toast'
import { selectBalance, selectRefresh } from '../../redux/accountSlice'
import WidthCurrentSavingAmount from '../../components/WidthCurrentSavingAmount'





export default function AccountScreen() {
    const [currentTab, setCurrentTab] = useState("Tài khoản")
    const refresh=useSelector(selectRefresh)
    const balance = useSelector(selectBalance)
    const [accounts, setAccounts] = useState([])
    const [savings, setSavings] = useState([])
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const [loading, setLoading] = useState(false)
    const route = useRoute()
    const navigation = useNavigation()
    const { t } = useTranslation()
    const handleTabs = (childData) => {
        setCurrentTab(childData)
    }
    console.log(savings)
    //fetching data
    useEffect(() => {
        const fetchData = async () => {
            if (!token) return
            setLoading(true)
            try {
                if (currentTab === "Tài khoản") {
                    const accountsResponse = await getAllAccount(user?.id, {
                        headers: {
                            token: `bearer ${token}`
                        }
                    })
                    if (accountsResponse.status === 200) {
                        setAccounts(accountsResponse.data.allAccountByUser)
                    }
                }
                if (currentTab === "Tích lũy") {
                    const savingsResponse = await getAllSaving(user?.id, {
                        headers: {
                            token: `bearer ${token}`
                        }
                    })
                    if (savingsResponse.status === 200) {
                        setSavings(savingsResponse.data.allSaving)
                    }
                }
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [token, refresh, currentTab])

    return (
        <View className="flex-1 ">
            <StatusBar
                barStyle="light"
            />

            <View className="z-20">
                <Toast
                    config={{
                        custom_toast: (internalState) => <CustomToast {...internalState} />
                    }}
                />
            </View>
            <View className="">
                <View className="bg-primaryColor py-[70px]">
                    <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center">Ví của bạn </Text>
                </View>
                <View className="w-full h-full bg-white rounded-t-[36px] mt-[-45px] px-[20px]">
                    <Text className="text-center text-textColor mt-[60px] text-[16px] font-[400]">Tổng số tiền</Text>
                    <Text className="text-center text-textColor mt-[15px] text-[30px] font-[700] leading-[45px] ">{balance.toLocaleString('vi-VN')} vnđ</Text>
                    <View className="mx-auto mt-[35px] flex flex-row">
                        <View className="flex-col items-center gap-[10px] mr-[20px] ">
                            <TouchableOpacity onPress={() => { navigation.navigate("createAccountScreen") }} activeOpacity={0.8} className="w-[60px] h-[60px] border border-primaryColor rounded-[100px] flex flex-row items-center justify-center">
                                <Icon name="plus" size={25} color="#438883" />
                            </TouchableOpacity>
                            <Text className="text-center text-textColor text-[16px] font-[400]">Tài khoản</Text>
                        </View>
                        <View className="flex-col items-center gap-[10px]">
                            <TouchableOpacity onPress={() => { navigation.navigate("createSavingScreen") }} activeOpacity={0.8} className="w-[60px] h-[60px] border border-primaryColor rounded-[100px] flex flex-row items-center justify-center">
                                <Icon name="money" size={25} color="#438883" />
                            </TouchableOpacity>
                            <Text className="text-center text-textColor text-[16px] font-[400]">Tích lũy</Text>
                        </View>
                    </View>
                    <View className="mt-[35px] ">
                        <TabViews
                            tabs={[{ id: 0, title: "Tài khoản" }, { id: 1, title: "Tích lũy" }]}
                            styleTab="rounded-[40px] py-[10px] "
                            styleTabs="h-[48px] bg-[#f0eef1] mt-[10px] rounded-[40px] flex flex-row items-center px-[6px]"
                            styleTextTab="text-[14px] font-[500] text-textColor"
                            setCurrentTabs={handleTabs}
                        />
                    </View>
                    <View className="mt-[20px] mb-[640px]" >
                        <FlatList
                            data={currentTab === "Tài khoản" ? accounts : savings}
                            renderItem={({ item }) => {
                                return (
                                    <View className="flex flex-row justify-between items-center mt-[10px]" >
                                        {
                                            currentTab === "Tài khoản" ? (<TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate("accountDetailScreen", { accountId: item?._id }) }} className="flex flex-row items-center">
                                                <View style={styles.shadowS} className="w-[50px] h-[50px] border border-[#b2b2b2] rounded-[100px] ">
                                                    <Image
                                                        source={{ uri: `${item?.accountType?.account_type_image}` }}
                                                        className="object-cover w-full h-full rounded-[100px]"
                                                    />
                                                </View>
                                                <View className="ml-[10px] flex flex-col items-start">
                                                    <Text className="text-center text-textColor text-[16px] font-[600]">{item?.account_name}</Text>
                                                    <Text className="text-center mt-[5px] text-clickButton text-[12px] font-[500]">{item?.balance.toLocaleString('vi-VN')} vnđ</Text>
                                                </View>
                                            </TouchableOpacity>) : (
                                                <TouchableOpacity className="w-[90%]  flex flex-row items-center" activeOpacity={0.8} onPress={() => { navigation.navigate("savingDetailScreen", { savingId: item?._id }) }}>
                                                    <View style={styles.shadowS} className="w-[50px] h-[50px] border border-[#b2b2b2] rounded-[100px] ">
                                                        <Image
                                                            source={{ uri: `${item?.saving_image}` }}
                                                            className="object-cover w-full h-full rounded-[100px]"
                                                        />
                                                    </View>
                                                    <View className="ml-[10px] flex flex-col items-start w-[100%] ">
                                                        <Text className="text-center text-textColor text-[16px] font-[600]">{item?.saving_name}</Text>
                                                        <Text className="text-center mt-[2px] text-primaryColor text-[12px] font-[500]">{item?.current_amount.toLocaleString('vi-VN')} vnđ</Text>
                                                        <WidthCurrentSavingAmount
                                                            styleChildren="h-[4px] "
                                                            styleParent="w-[85%] h-[4px] mt-[2px]"
                                                            goal_amount={item?.goal_amount}
                                                            current_amount={item?.current_amount}
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }
                                        <View className="">
                                            <Icon name="ellipsis-v" size={25} color="#AAAAAA" />
                                        </View>
                                    </View>
                                )
                            }}
                            keyExtractor={item => item?._id.toString()}
                        />
                    </View>

                </View>
            </View>
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