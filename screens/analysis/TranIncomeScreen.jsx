import { View, Text, StatusBar, Modal, Image, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken, selectUser } from '../../redux/authSlice'
import { deleteTran, getAllTranIncome } from '../../data/Api'
import { selectRefresh } from '../../redux/accountSlice'
import { format, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CutomToast'
import { showToastU } from '../../utils/toast'
import ButtonCom from '../../components/ButtonCom'
import Loading from '../../components/Loading'




export default function TranIncome() {
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    const [selectId, setSelectId] = useState("")
    const [loading, setLoading] = useState(false)
    const token = useSelector(selectToken)
    const user = useSelector(selectUser)
    const [tranIncome, setTranIncome] = useState([])
    const refresh=useSelector(selectRefresh)
    const { t } = useTranslation()
    //fetching all tran income
    useEffect(() => {
        const getAllTranIncomes = async () => {
            try {
                const response = await getAllTranIncome(user?.id, {
                    headers: {
                        token: `bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setTranIncome(response.data.findTran)
                }
            } catch (err) {
                console.log(err)
            }
        }
        if (token || refresh) {
            getAllTranIncomes()
        }
    }, [token, refresh])

    const handleDelete = async () => {
        setModalVisible(false)
        setLoading(true)
        try {
            const response = await deleteTran(selectId, user?.id, {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            if (response.status === 200) {

                showToastU(response.data.message, "#0866ff", "check", 3000)
                setLoading(false)
                dispatch(toggleRefresh())
                
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View className="flex-1">
                    <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View className="flex-1 justify-center items-center">
                    {/* black overlay */}
                    <View className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"></View>
                    <View className="w-[300px] p-[20px] bg-white rounded-[18px] z-10">
                        <Text className="text-center font-[600] text-[16px] text-textColor ">Bạn có muốn xóa khoản chi này</Text>
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
            <View className="z-20">
                <Toast
                    config={{
                        custom_toast: (internalState) => <CustomToast {...internalState} />
                    }}
                />
            </View>
            <ScrollView className="flex-1 bg-white">
                <View className="w-full flex flex-row items-center justify-center bg-primaryColor h-[170px]">
                    <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ">Danh sách khoản thu</Text>
                </View>
                <View className="w-full h-full bg-white rounded-t-[36px] mt-[-30px] p-[25px]">
                <View className="w-full flex flex-col  gap-[10px]">
                {
                        tranIncome.length === 0 ? (<View className="">
                            <Text className="text-[20px] text-center text-textColor font-[600] mt-[100px] ">Không có dữ liệu!</Text>
                            <Image
                                className="w-[200px] h-[200px] mx-auto mt-[40px] object-cover"
                                source={{ uri: "https://s3-alpha-sig.figma.com/img/e224/311e/ad4282c1095acb9f0a249e6846fc58a6?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=o79vKFqjKxvscW6fpTzuJcgXi2YXmJks38nJJxlwwE-msUQqaZEPXSjjiF3NZqCcDG1KbbF8yXtBb9dAho4LYMi53Qy07pgbY3t25SFu0qgKAAIocjbOafGTxe5LSkGGbvzHD~4Zz2yWnPc2cSoaJ6S1yTJ-bC7OC7UDVEpw19nJp6eylQ0rJtn5jBDidlPTFeJ0xm-k7C0925NYFHFV5y2df-4Ej3jYPVxY7M9N~885~uOCdD1yrATnueLdQZ8c2emEqPtptDeV-kwtzzG~g90m3cYjL3yH28MSbPfrkHik7ddqKfEl2C4RXtem5OiJa5w1ZxQwk1wsuxjrKZe6VA__" }}
                            />
                        </View>) : (
                            <View>
                                {
                                    loading ? (<View className="mt-[200px]">
                                        <Loading />
                                    </View>) : (<View className="w-full flex flex-col  gap-[10px]">
                                        {tranIncome.map((tran, index) => {
                                            return (
                                                <View key={index} className="w-full flex flex-row items-center justify-between">
                                                    <View className="flex flex-row ">
                                                        <View className="w-[50px] h-[50px] border-[2px] border-borderColor flex flex-row justify-center items-center rounded-[100px] overflow-hidden">
                                                            <Image
                                                                className="w-full h-full object-cover"
                                                                source={{ uri: `${tran?.incomeType?.income_type_image}` }}
                                                            />
                                                        </View>
                                                        <View className="flex flex-col justify-center gap-[5px] ml-[10px]">
                                                            <View className="flex flex-row items-center">
                                                                <Text className=" text-[17px]  font-[500] text-textColor  ">{tran?.transaction_name}</Text>
                                                                <Text className="ml-[5px] text-[14px] font-[600] text-iconColor">({format(tran?.transaction_date, "dd MMMM yyyy", { locale: vi })})</Text>
                                                            </View>
                                                            <Text className=" text-[12px]  font-[600] text-clickButton  ">{tran?.amount} vnđ</Text>
                                                        </View>
                                                    </View>
                                                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                                        setModalVisible(true)
                                                        setSelectId(tran?._id)
                                                    }}>
                                                        <View className="">
                                                            <Icon name="ellipsis-v" size={25} color="#AAAAAA" />
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })}
                                    </View>)
                                }
                            </View>
                        )
                    }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}