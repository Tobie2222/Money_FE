import { View, StyleSheet, Image, Text, StatusBar, ScrollView, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native'
import { useTranslation } from 'react-i18next'
import Loading from '../../components/Loading'
import { Formik } from 'formik'
import * as Yup from 'yup'
import AbstractCircle from '../../components/AbstractCircle'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ButtonCom from '../../components/ButtonCom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectToken, selectUser } from '../../redux/authSlice'
import {  createCatIncome } from '../../data/Api'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CustomToast'
import { showToastU } from '../../utils/toast'
import * as ImagePicker from "expo-image-picker"



const validationSchema = Yup.object().shape({

})

export default function CreateIncomeTypeScreen() {
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState("https://timo.vn/wp-content/uploads/cach-chi-tieu-hop-ly-voi-muc-luong-6-trieu.jpg")
    const token = useSelector(selectToken)
    const user = useSelector(selectUser)
    const navigation = useNavigation()
    const [focusIncomeType, setFocusIncomeType] = useState(false)
    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("income_type_name", values?.income_type_name)
            if (avatar) {
                formData.append("image", {
                    uri: avatar,
                    name: 'image.jpg',
                    type: 'image/jpeg',
                })
            }
            const response = await createCatIncome(user?.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: `Bearer ${token}`,
                },
            })
            if (response.status === 200) {
                setLoading(false)
                console.log(response.data)
                showToastU(response.data.message, "#0866ff", "check", 3000)
                setAvatar("https://timo.vn/wp-content/uploads/cach-chi-tieu-hop-ly-voi-muc-luong-6-trieu.jpg")
            }
        } catch (err) {
            setLoading(false)
            if (err.response) {
                showToastU(err.response.data.message, "#EF4E4E", "warning", 3000)
            }
            console.log(err)
        }
    }



    const upLoadImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') {
                return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            })
            if (!result.canceled) {
                setAvatar(result.assets[0].uri)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View className="flex-1">
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
                <TouchableOpacity onPress={() => navigation.navigate("incomeTypeScreen")} className=" w-[28px] h-[28px]  flex items-center justify-center">
                    <Icon name='chevron-left' color={"#fff"} size={22} />
                </TouchableOpacity>
                <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ml-[35px] ">Tạo mới danh mục thu nhập </Text>
            </View>
            {
                loading ? (<Loading color='#438883' />) : (<View className="px-[20px] mt-[30px] ">
                    <Formik
                        initialValues={{ income_type_name: '', image: null }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                            <View className="">
                                <View className="w-full flex-col bg-white rounded-[14px] py-[30px] px-[20px] ">
                                    {/* {(touched.newPassword && errors.newPassword) || (touched.confirmNewPassword && errors.confirmNewPassword) || (error && message) ? (
                                    <View className="w-full flex-row items-center justify-center bg-backGroundColorWarning mb-[15px] py-[10px] rounded-[12px]">
                                        <Icon name="exclamation-circle" size={20} color="#EF4E4E" />
                                        <Text className="text-warningColor ml-[10px]">
                                            {errors.newPassword || errors.confirmNewPassword || message}
                                        </Text>
                                    </View>
                                ) : null} */}
                                    <View className="w-full flex-col gap-[10px] mt-[5px]">
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Tên danh mục thu nhập</Text>
                                        <View className={`w-full my-[20px] flex-row  items-center ${focusIncomeType === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[12px] bg-white rounded-[8px]`}>
                                            <TextInput
                                                onChangeText={handleChange('income_type_name')}
                                                onBlur={() => {
                                                    handleBlur('income_type_name')
                                                    setFocusIncomeType(false)
                                                }}
                                                value={values.income_type_name}
                                                className="text-[16px] leading-[20px] text-textColor  w-[100%]  "
                                                onFocus={() => setFocusIncomeType(true)}
                                            />
                                        </View>
                                    </View>
                                    <TouchableOpacity activeOpacity={0.8} onPress={upLoadImage} className="w-full h-auto border-[4px] border-primaryColor py-[30px] rounded-[25px] flex-row items-center justify-center">
                                        <View className="w-[100px] h-[100px]">
                                            {
                                                avatar !== "" ? (<Image source={{ uri: `${avatar}` }} className="w-full h-full object-cover " />) : (<Icon name='chevron-left' color={"#fff"} size={22} />)
                                            }
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <ButtonCom
                                    text="Lưu"
                                    styleButton="w-full flex py-[13px] my-[50px] border border-primaryColor  rounded-[40px] "
                                    styleText="text-white text-center text-[16px] leading-[24px] font-[600] text-primaryColor"
                                    onPress={handleSubmit}
                                />
                            </View>
                        )}
                    </Formik>
                </View>)
            }

        </View>
    )
}
