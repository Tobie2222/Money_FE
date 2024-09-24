import { View, StyleSheet, Image, Text, StatusBar, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native'
import { useTranslation } from 'react-i18next'
import Loading from '../../components/Loading'
import AbstractCircle from '../../components/AbstractCircle'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ButtonCom from '../../components/ButtonCom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectToken, selectUser } from '../../redux/authSlice'
import { deleteCatExpense, getAllCatExpense, updateCatExpense } from '../../data/Api'
import BottomSheetCom from '../../components/BottomSheetCom'
import Toast from 'react-native-toast-message'
import { showToastU } from '../../utils/toast'
import { selectRefresh } from '../../redux/accountSlice'
import { TextInput } from 'react-native-gesture-handler'
import CustomToast from '../../components/CustomToast'


export default function ExpenseTypeScreen() {
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const refresh=useSelector(selectRefresh)
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false)
    const [fetchingCatExpense, setFetchingCatExpense] = useState(false)
    const [idCatExpense, setIdCatExpense] = useState("")
    const [updateCat,setUpdateCat]=useState("")
    const [hiddenBottomSheetDelete, setHiddenBottomSheetDelete] = useState(false)
    const [catExpense, setCatExpense] = useState([])
    const navigation = useNavigation()
    const { t } = useTranslation()
    console.log(updateCat)
    const handleDeleteCatExpense = async () => {
        setModalVisible(false)
        setLoading(true)
        try {
            const response = await deleteCatExpense(idCatExpense,user?.id, {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                showToastU(response.data.message, "#316896", "check", 3000)
                setLoading(false)
                setFetchingCatExpense(!fetchingCatExpense)
            }
        } catch (err) {
            setLoading(false)
            if (err.response) {
                showToastU(err.response.data.message, "#EF4E4E", "warning", 3000)
            }
        }
    }
    //fetching All cat expense
    useEffect(() => {
        const getAllCategoriesExpenses = async () => {
            setLoading(true)
            try {
                const response = await getAllCatExpense(user?.id, {
                    headers: {
                        token: `bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setLoading(false)
                    setCatExpense(response.data.allCategories)
                }
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
        }
        if (token || refresh) {
            getAllCategoriesExpenses()
        }
    }, [token,fetchingCatExpense,refresh])

    const handleUpdateCatExpense=async ()=>{
        setModalVisibleUpdate(false)
        setLoading(true)
        try {
            const response = await updateCatExpense(idCatExpense,user?.id,{
                categories_name: updateCat
            }, {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                showToastU(response.data.message, "#316896", "check", 3000)
                setUpdateCat("")
                setLoading(false)
                setFetchingCatExpense(!fetchingCatExpense)
            }
        } catch (err) {
            setLoading(false)
            if (err.response) {
                showToastU(err.response.data.message, "#EF4E4E", "warning", 3000)
            }
        }
    }
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
            {/* modal update */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleUpdate}
            >
                <View className="flex-1 justify-center items-center">
                    {/* black overlay */}
                    <View className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"></View>
                    <View className="w-[300px] p-[20px] bg-white rounded-[18px] z-10">
                        <Text className="text-center font-[600] text-[16px] text-textColor ">Bạn có sửa danh mục này ?</Text>
                        <View className="">
                            <TextInput
                                placeholder='Tên danh mục chi tiêu'
                                className="border border-borderColor rounded-[6px] px-[12px] py-[8px] mt-[20px] text-textColor text-[14px]"
                                value={updateCat}
                                onChangeText={(text) => setUpdateCat(text)} 
                            />
                        </View>
                        <View className="flex flex-col mt-[20px] ">
                            <ButtonCom
                                text="Lưu"
                                styleButton="w-full py-[13px] mx-auto bg-primaryColor rounded-[18px] "
                                styleText="text-white text-[16px] leading-[24px] font-[700] text-center"
                                onPress={handleUpdateCatExpense}
                            />
                            <ButtonCom
                                text="Quay lại"
                                styleButton="w-full py-[13px] mt-[10px]  mx-auto bg-warningColor rounded-[18px] "
                                styleText="text-white text-[16px] leading-[24px] font-[700] text-center"
                                onPress={() => setModalVisibleUpdate(false)}
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
                        <Text className="text-center font-[600] text-[16px] text-textColor ">Bạn có muốn xóa danh mục này ?</Text>
                        <View className="flex flex-col mt-[20px] ">
                            <ButtonCom
                                text="Có"
                                styleButton="w-full py-[13px] mx-auto bg-warningColor rounded-[18px] "
                                styleText="text-white text-[16px] leading-[24px] font-[700] text-center"
                                onPress={handleDeleteCatExpense}
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
            <View className="flex-row items-center mt-[80px] mb-[40px] w-full px-[25px] ">
                <TouchableOpacity onPress={() => navigation.navigate("settingScreen")} className=" w-[28px] h-[28px]  flex items-center justify-center">
                    <Icon name='chevron-left' color={"#fff"} style={styles.icon} />
                </TouchableOpacity>
                <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ml-[60px] ">Danh mục chi tiêu</Text>
            </View>

            <View className="w-full h-full bg-white rounded-t-[36px] p-[20px] ">
                {
                    loading ? (<Loading color='#438883' />) : (
                        <View>
                            <Text className=" text-[18px] leading-[27px] font-[500] text-primaryColor">Tất cả danh mục chi tiêu</Text>
                            <View className="mt-[20px] mb-[100px] ">
                                <FlatList
                                    data={catExpense}
                                    renderItem={({ item }) => {
                                        return (
                                            <View className="w-full flex-row items-center justify-between mt-[15px]">
                                                <View className="flex-row items-center  gap-[15px] ">
                                                    <View className="w-[50px] h-[50px] rounded-[100px] border border-borderColor" >
                                                        <Image
                                                            source={{ uri: `${item?.categories_image}` }}
                                                            className="w-full h-full rounded-[100px] "
                                                        />
                                                    </View>
                                                    <Text className="text-[16px] text-textColor font-[400] ">{item?.categories_name}</Text>
                                                </View>
                                                <TouchableOpacity activeOpacity={0.8} onPress={() => { setIdCatExpense(item?._id); setHiddenBottomSheetDelete(true) }}>
                                                    <Icon name='ellipsis-v' color={"#AAAAAA"} style={styles.icon} />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }}
                                    keyExtractor={item => item._id.toString()}
                                />
                            </View>
                        </View>
                    )
                }


            </View>
            <ButtonCom
                styleButton="absolute w-[50px] h-[50px] border border-primaryColor rounded-[100px] top-[90%] right-[6%] flex-row items-center justify-center"
                nameIcon='plus'
                colorIcon='#438883'
                styleWrapperIcon='block'
                onPress={() => navigation.navigate("createExpenseTypeScreen")}
            />
            {
                hiddenBottomSheetDelete && (
                    <BottomSheetCom
                        onCloseBottomSheet={() => setHiddenBottomSheetDelete(false)}
                        children={(
                            <View>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => { setModalVisibleUpdate(true); setHiddenBottomSheetDelete(false) }} className="flex-row items-center gap-[15px] px-[20px] py-[10px]">
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
const styles = StyleSheet.create({
    icon: {
        fontSize: 22,
        fontWeight: 400
    }
})