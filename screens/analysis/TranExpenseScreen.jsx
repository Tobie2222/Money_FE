import { View, Text, StatusBar, Modal, Image, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken, selectUser } from '../../redux/authSlice'
import { selectRefresh, toggleRefresh } from '../../redux/accountSlice'
import { deleteTran, getAllTranExpense, updateTran } from '../../data/Api'
import { format, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CutomToast'
import { showToastU } from '../../utils/toast'
import ButtonCom from '../../components/ButtonCom'
import Loading from '../../components/Loading'
import { TextInput } from 'react-native-gesture-handler'

export default function TranExpenseScreen() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const token = useSelector(selectToken)
    const refresh = useSelector(selectRefresh)
    const [updateNameTran, setUpdateNameTran] = useState("")
    const [updateDescTran, setUpdateDescTran] = useState("")
    const user = useSelector(selectUser)
    const [tranExpenses, setTranExpenses] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisibleEdit, setModalVisibleEdit] = useState(false)
    const { t } = useTranslation()
    const [selectId, setSelectId] = useState("")
    //fetching all tran expense
    useEffect(() => {
        const getAllTranExpenses = async () => {
            setLoading(true)
            try {
                const response = await getAllTranExpense(user?.id, {
                    headers: {
                        token: `bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setTranExpenses(response.data.findTran)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        if (token || refresh) {
            getAllTranExpenses()
        }
    }, [token, refresh])
    console.log(tranExpenses)
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
                dispatch(toggleRefresh())

            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    const handleUpdateTran = async () => {
        setLoading(true)
        setModalVisibleEdit(false)
        setModalVisible(false)
        try {
            const payload = {
                transaction_name: updateNameTran,
                desc_transaction: updateDescTran
            }
            const response = await updateTran(selectId, user?.id, payload, {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                showToastU(response.data.message, "#0866ff", "check", 3000)
                setUpdateNameTran("")
                setUpdateDescTran("")
                dispatch(toggleRefresh())
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    console.log(selectId)
    return (
        <View className="flex-1">
            {/* modal edit */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleEdit}
            >
                <View className="flex-1 justify-center items-center">
                    {/* black overlay */}
                    <View className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"></View>
                    <View className="w-[300px] p-[20px] bg-white rounded-[18px] z-10">
                        <Text className="text-center font-[600] text-[16px] text-textColor ">Bạn có muốn sửa khoản chi này</Text>
                        <View className="flex flex-col mt-[20px] ">
                            <TextInput
                                placeholder='Tên danh khoản chi tiêu'
                                className="border border-borderColor rounded-[6px] px-[12px] py-[8px] mt-[20px] text-textColor text-[14px]"
                                value={updateNameTran}
                                onChangeText={(text) => setUpdateNameTran(text)}
                            />
                            <TextInput
                                placeholder='Tên danh mô tả chi tiêu'
                                className="border border-borderColor rounded-[6px] px-[12px] py-[8px] my-[20px] text-textColor text-[14px]"
                                value={updateDescTran}
                                onChangeText={(text) => setUpdateDescTran(text)}
                            />
                            <ButtonCom
                                text="Lưu"
                                styleButton="w-full py-[13px] mx-auto bg-[#0084ff] rounded-[18px] "
                                styleText="text-white text-[16px] leading-[24px] font-[700] text-center"
                                onPress={() => handleUpdateTran()}
                            />
                            <ButtonCom
                                text="Quay lại"
                                styleButton="w-full py-[13px] mt-[10px]  mx-auto bg-primaryColor rounded-[18px] "
                                styleText="text-white text-[16px] leading-[24px] font-[700] text-center"
                                onPress={() => setModalVisibleEdit(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View className="flex-1 justify-center items-center">
                    {/* black overlay */}
                    <View className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"></View>
                    <View className="w-[300px] p-[20px] bg-white rounded-[18px] z-10">
                        <Text className="text-center font-[600] text-[16px] text-textColor ">Chức năng</Text>
                        <View className="flex flex-col mt-[20px] ">
                            <ButtonCom
                                text="Sửa"
                                styleButton="w-full py-[13px] mx-auto bg-[#0866ff] rounded-[18px] mb-[10px]"
                                styleText="text-white text-[16px] leading-[24px] font-[700] text-center"
                                onPress={() => setModalVisibleEdit(true)}
                            />
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
            <ScrollView className=" bg-white">
                <View className="w-full flex flex-row items-center justify-center bg-primaryColor h-[170px]">
                    <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ">Danh sách khoản chi</Text>
                </View>
                {
                    loading ? (<View className="mt-[300px]">
                        <Loading />
                    </View>) : (<View className="w-full h-full bg-white rounded-t-[36px] mt-[-30px] p-[25px]">
                        {
                            tranExpenses.length === 0 ? (<View className="">
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
                                            {tranExpenses.map((tran, index) => {
                                                return (
                                                    <View key={index} className="w-full flex flex-row items-center justify-between">
                                                        <View className="flex flex-row ">
                                                            <View className="w-[50px] h-[50px] border-[2px] border-borderColor flex flex-row justify-center items-center rounded-[100px] overflow-hidden">
                                                                <Image
                                                                    className="w-full h-full object-cover"
                                                                    source={{ uri: `${tran?.category?.categories_image}` }}
                                                                />
                                                            </View>
                                                            <View className="flex flex-col justify-center gap-[5px] ml-[10px]">
                                                                <View className="flex flex-row items-center">
                                                                    <Text className=" text-[17px]  font-[500] text-textColor  ">{tran?.transaction_name}</Text>
                                                                    <Text className="ml-[5px] text-[14px] font-[600] text-iconColor">({format(tran?.transaction_date, "dd MMMM yyyy", { locale: vi })})</Text>
                                                                </View>
                                                                <Text className=" text-[12px]  font-[600] text-warningColor  ">{tran?.amount} vnđ</Text>
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
                    </View>)
                }
            </ScrollView>
        </View>
    )
}