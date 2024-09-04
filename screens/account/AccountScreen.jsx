import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Image, Text, StatusBar, TouchableOpacity, Modal, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import TabViews from '../../components/TabViews'
import { useEffect, useState } from 'react'
import { selectToken, selectUser } from '../../redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccount, deleteSaving, getAllSaving } from '../../data/Api'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CutomToast'
import { showToastU } from '../../utils/toast'
import {  selectAccounts, selectRefresh, toggleRefresh } from '../../redux/accountSlice'
import WidthCurrentSavingAmount from '../../components/WidthCurrentSavingAmount'
import { getBalance } from '../../redux/accountSelector'
import Loading from '../../components/Loading'
import ButtonCom from '../../components/ButtonCom'


export default function AccountScreen() {
    const [currentTab, setCurrentTab] = useState("Tài khoản")
    const dispatch=useDispatch()
    const refresh=useSelector(selectRefresh)
    const balance = useSelector(getBalance)
    const accounts=useSelector(selectAccounts)
    const [savings, setSavings] = useState([])
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const [modalVisible, setModalVisible] = useState(false)
    const [selectId,setSelectId]=useState("")
    const [loading, setLoading] = useState(false)
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
    //handle delete
    const handleDelete = async () => {
        
        try {
            if (currentTab === "Tài khoản") {
                const response=await deleteAccount(selectId,user?.id,{
                    headers: {
                        token: `Bearer ${token}`
                    }
                }) 
                if (response.status===200) {
                    showToastU(response.data.message, "#0866ff", "check", 3000)
                }
            } else {
                const response=await deleteSaving(selectId,user?.id,{
                    headers: {
                        token: `Bearer ${token}`
                    }
                })
                if (response.status===200) {
                    showToastU(response.data.message, "#0866ff", "check", 3000)
                }
            }
            setLoading(false)
            setModalVisible(false)
            dispatch(toggleRefresh())
        } catch (err) {
            console.log(err)
        }
    }
    console.log(selectId)
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View className="flex-1 justify-center items-center">
                    {/* black overlay */}
                    <View className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"></View>
                    <View className="w-[300px] p-[20px] bg-white rounded-[18px] z-10">
                        <Text className="text-center font-[600] text-[16px] text-textColor ">{currentTab==="Tài khoản"?"Bạn có muốn xóa tài khoản này ?":"Bạn có muốn xóa tích lũy này ?"}</Text>
                        <View className="flex flex-col mt-[20px] ">
                            <ButtonCom
                                text="xóa"
                                styleButton="w-full py-[13px] mx-auto bg-warningColor rounded-[18px] "
                                styleText="text-white text-[16px] leading-[24px] font-[700] text-center"
                                onPress={() => handleDelete()}
                            />
                            <ButtonCom
                                text="Quay lại"
                                styleButton="w-full py-[13px] mt-[10px]  mx-auto bg-primaryColor rounded-[18px] "
                                styleText="text-white text-[16px] leading-[24px] font-[700] text-center"
                                onPress={() => setModalVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
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
                        {
                            loading ? (
                                <View className="mt-[100px]">
                                    <Loading />
                                </View>
                            ) : currentTab === "Tài khoản" && accounts.length === 0 ? (
                                <View className="w-[100%] h-[200px] flex justify-center items-center">
                                    <Text className="text-[18px] font-[600] text-iconColor text-center">Không có dữ liệu!</Text>
                                </View>
                            ) : currentTab === "Tích lũy" && savings.length === 0 ? (
                                <View className="w-[100%] h-[200px] flex justify-center items-center">
                                    <Text className="text-[18px] font-[600] text-iconColor text-center">Không có dữ liệu!</Text>
                                </View>
                            ) : (
                                <FlatList
                                    data={currentTab === "Tài khoản" ? accounts : savings}
                                    renderItem={({ item }) => {
                                        return (
                                            <View className="flex flex-row justify-between items-center mt-[10px]">
                                                {currentTab === "Tài khoản" ? (
                                                    <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        onPress={() => {
                                                            navigation.navigate("accountDetailScreen", { accountId: item?._id });
                                                        }}
                                                        className="flex flex-row items-center"
                                                    >
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
                                                    </TouchableOpacity>
                                                ) : (
                                                    <TouchableOpacity
                                                        className="w-[90%] flex flex-row items-center"
                                                        activeOpacity={0.8}
                                                        onPress={() => {
                                                            navigation.navigate("savingDetailScreen", { savingId: item?._id });
                                                        }}
                                                    >
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
                                                )}
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    onPress={() => {
                                                        setSelectId(item?._id);
                                                        setModalVisible(true);
                                                    }}
                                                >
                                                    <Icon name="ellipsis-v" size={25} color="#AAAAAA" />
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    }}
                                    keyExtractor={(item) => item?._id ? item._id.toString() : Math.random().toString()}
                                />
                            )
                        }
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