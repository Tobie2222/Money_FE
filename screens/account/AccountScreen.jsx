import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Image, Text, StatusBar, ScrollView, TouchableOpacity, Modal, FlatList, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import TabViews from '../../components/TabViews'
import { useEffect, useState } from 'react'
import { selectToken, selectUser } from '../../redux/authSlice'
import { useSelector } from 'react-redux'
import { getAllAccount, getBalance } from '../../data/Api'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CutomToast'
import { showToastU } from '../../utils/toast'


const savings = [
    { id: 0, name: "mua nhà 1", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 1, name: "mua nhà 2", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 2, name: "mua nhà 3", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 3, name: "mua nhà 4", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 4, name: "mua nhà 5", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 5, name: "mua nhà 6", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 6, name: "mua nhà 7", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 7, name: "mua nhà 8", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 8, name: "mua nhà 9", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 9, name: "mua nhà 10", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 10, name: "mua nhà 11", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 12, name: "mua nhà 12", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 13, name: "mua nhà 13", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 14, name: "mua nhà 14", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },

]

export default function AccountScreen() {
    const [currentTab, setCurrentTab] = useState("Tài khoản")
    const [accounts,setAccounts]=useState([])
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const [loading, setLoading] = useState(false)
    const [totalBalance,setTotalBalance]=useState(0)
    const route=useRoute()
    const navigation = useNavigation()
    const {message ,refresh}=route.params || {}
    console.log("Tổng số dư ",totalBalance)
    const { t } = useTranslation()
    const handleTabs = (childData) => {
        setCurrentTab(childData)
    }
    console.log(accounts)
    useEffect(()=>{
        //fetching all Account
        const getAllAccounts = async () => {
            setLoading(true)
            try {
                const response = await getAllAccount(user?.id, {
                    headers: {
                        token: `bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setLoading(false)
                    setAccounts(response.data.allAccountByUser)
                }
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
        }
        const getTotalBalance= async () => {
            try {
                const response = await getBalance(user?.id, {
                    headers: {
                        token: `bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setTotalBalance(response.data.totalBalance)
                }
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
        }
        if (token || refresh) {
            getTotalBalance()
            getAllAccounts()
        }
        if (refresh) {
            showToastU(message, "#0866ff", "check", 3000)
        }
    },[token,refresh])



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
                    <Text className="text-center text-textColor mt-[15px] text-[30px] font-[700] leading-[45px] ">{totalBalance.toLocaleString('vi-VN')} vnđ</Text>
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
                                            currentTab === "Tài khoản" ? (<TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate("accountDetailScreen", { id: item?._id }) }} className="flex flex-row items-center">
                                                <View style={styles.shadowS} className="w-[50px] h-[50px] border border-[#b2b2b2] rounded-[100px] ">
                                                    <Image
                                                        source={{ uri: `${item?.accountType?.account_type_image}` }}
                                                        className="object-cover w-full h-full rounded-[100px]"
                                                    />
                                                </View>
                                                <View className="ml-[10px] flex flex-col items-start">
                                                    <Text className="text-center text-textColor text-[16px] font-[600]">{item?.account_name}</Text>
                                                    <Text className="text-center mt-[5px] text-clickButton text-[12px] font-[500]">{item?.balance} vnđ</Text>
                                                </View>
                                            </TouchableOpacity>) : (
                                                <TouchableOpacity className="w-[90%]  flex flex-row items-center" activeOpacity={0.8} onPress={() => { navigation.navigate("savingDetailScreen", { id: item?.id }) }}>
                                                    <View style={styles.shadowS} className="w-[50px] h-[50px] border border-[#b2b2b2] rounded-[100px] ">
                                                        <Image
                                                            source={{ uri: `${item?.image}` }}
                                                            className="object-cover w-full h-full rounded-[100px]"
                                                        />
                                                    </View>
                                                    <View className="ml-[10px] flex flex-col items-start w-[100%]">
                                                        <Text className="text-center text-textColor text-[16px] font-[600]">{item?.name}</Text>
                                                        <Text className="text-center mt-[2px] text-primaryColor text-[12px] font-[500]">{item?.balance} {item?.currency}</Text>
                                                        <View className="w-[80%] h-[4px] mt-[2px] bg-borderColor rounded-[6px]">
                                                            <View className="w-[20%] h-[4px]  bg-clickButton rounded-[6px]"></View>
                                                        </View>
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