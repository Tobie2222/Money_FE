import { View, StyleSheet, Image, Text, StatusBar, TouchableOpacity, Modal, FlatList } from 'react-native'
import { useTranslation } from 'react-i18next'
import Loading from '../../components/Loading'
import AbstractCircle from '../../components/AbstractCircle'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ButtonCom from '../../components/ButtonCom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectToken, selectUser } from '../../redux/authSlice'
import { deleteCatIncome, getAllCatIncome } from '../../data/Api'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CutomToast'
import BottomSheetCom from '../../components/BottomSheetCom'
import { showToastU } from '../../utils/toast'
import { selectRefresh } from '../../redux/accountSlice'

export default function IncomeTypeScreen() {
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const [loading, setLoading] = useState(false)
    const refresh=useSelector(selectRefresh)
    const [message, setMessage] = useState("")
    const [idCatIncomeType, setIdCatIncomeType] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const [catIncomes, setCatIncomes] = useState([])
    const [fetchingCatIncomeType, setFetchingCatIncomeType] = useState(false)
    const [hiddenBottomSheetDelete, setHiddenBottomSheetDelete] = useState(false)
    const navigation = useNavigation()
    const { t } = useTranslation()

    const handleDeleteCatInComeType = async () => {
        setModalVisible(false)
        setLoading(true)
        try {
            const response = await deleteCatIncome(idCatIncomeType, user?.id, {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                showToastU(response.data.message, "#316896", "check", 3000)
                setLoading(false)
                setFetchingCatIncomeType(!fetchingCatIncomeType)
            }
        } catch (err) {
            setLoading(false)
            if (err.response) {
                console.log(err.response.data)
                showToastU(err.response.data.message, "#EF4E4E", "warning", 3000)
            }
        }
    }


    // fetching CatIncomeType
    useEffect(() => {
        const getAllCategoriesIncomes = async () => {
            setLoading(true)
            try {
                const response = await getAllCatIncome(user?.id, {
                    headers: {
                        token: `bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setLoading(false)
                    setCatIncomes(response.data.allInComeType)
                    
                }
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
        }
        if (token || refresh) {
            getAllCategoriesIncomes()
        }
    }, [token, fetchingCatIncomeType,refresh])
    //handleDelete



    return (
        <View className="flex-1 relative">
            <StatusBar
                barStyle="dark"
            />
            <AbstractCircle />
            <View className="z-20">
                <Toast
                    config={{
                        custom_toast: (internalState) => <CustomToast {...internalState} />
                    }}
                />
            </View>
            <View className="flex-row items-center mt-[80px] mb-[40px] w-full px-[25px] ">
                <TouchableOpacity onPress={() => navigation.navigate("settingScreen")} className=" w-[28px] h-[28px]  flex items-center justify-center">
                    <Icon name='chevron-left' color={"#fff"} size={22} />
                </TouchableOpacity>
                <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ml-[60px] ">Danh mục thu nhập</Text>
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
                        <Text className="text-center font-[600] text-[16px] text-textColor ">Bạn có muốn xóa danh mục này ?</Text>
                        <View className="flex flex-col mt-[20px] ">
                            <ButtonCom
                                text="Có"
                                styleButton="w-full py-[13px] mx-auto bg-warningColor rounded-[18px] "
                                styleText="text-white text-[16px] leading-[24px] font-[700] text-center"
                                onPress={handleDeleteCatInComeType}
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

            <View className="w-full h-full bg-white rounded-t-[36px] p-[20px] ">
                {
                    loading ? (<Loading color='#438883' />) : (
                        <View>
                            <Text className=" text-[18px] leading-[27px] font-[500] text-primaryColor">Tất cả danh mục thu nhập</Text>
                            <View className="mt-[20px] mb-[100px] ">
                                <FlatList
                                    data={catIncomes}
                                    renderItem={({ item }) => {
                                        return (
                                            <View className="w-full flex-row items-center justify-between mt-[15px]">
                                                <View className="flex-row items-center  gap-[15px] ">
                                                    <View className="w-[50px] h-[50px] rounded-[100px] border border-borderColor" >
                                                        <Image
                                                            source={{ uri: `${item?.income_type_image}` }}
                                                            className="w-full h-full rounded-[100px] "
                                                        />
                                                    </View>
                                                    <Text className="text-[16px] text-textColor font-[400] ">{item?.income_type_name}</Text>
                                                </View>
                                                <TouchableOpacity activeOpacity={0.8} onPress={() => { setIdCatIncomeType(item?._id); setHiddenBottomSheetDelete(true) }}>
                                                    <Icon name='ellipsis-v' color={"#AAAAAA"} size={22} />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }}
                                    keyExtractor={item => item?._id.toString()}
                                />
                            </View>
                        </View>
                    )}

            </View>
            <ButtonCom
                styleButton="absolute w-[50px] h-[50px] border border-primaryColor rounded-[100px] top-[90%] right-[6%] flex-row items-center justify-center"
                nameIcon='plus'
                colorIcon='#438883'
                styleWrapperIcon='block'
                onPress={() => navigation.navigate("createIncomeTypeScreen")}
            />
            {
                hiddenBottomSheetDelete && (
                    <BottomSheetCom
                        onCloseBottomSheet={() => setHiddenBottomSheetDelete(false)}
                        children={(
                            <View>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate("dashBroadScreen"); setHiddenBottomSheetDelete(false) }} className="flex-row items-center gap-[15px] px-[20px] py-[10px]">
                                    <Icon name={`pencil`} size={30} color="#AAAAAA" />
                                    <Text className="text-[18px] text-[#AAAAAA] font-[500]">Sửa</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => { setModalVisible(true); setHiddenBottomSheetDelete(false) }} className="flex-row items-center gap-[15px] px-[20px] py-[10px]">
                                    <Icon name={`trash`} size={30} color="#AAAAAA" />
                                    <Text className="text-[18px] text-[#AAAAAA] font-[500]">Xóa</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )
            }
        </View>
    )
}
