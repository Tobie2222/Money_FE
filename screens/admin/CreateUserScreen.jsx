import { View, StyleSheet, Image, Text, StatusBar, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import BottomSheetCom from '../../components/BottomSheetCom'
import HeaderAdmin from '../../components/HeaderAdmin'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native-gesture-handler'
import ButtonCom from '../../components/ButtonCom'
import { Dropdown } from 'react-native-element-dropdown'
import * as ImagePicker from "expo-image-picker"
import { createUser } from '../../data/Api'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../../redux/authSlice'
import { showToastU } from '../../utils/toast'
import Loading from '../../components/Loading'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CutomToast'
import { toggleRefresh } from '../../redux/accountSlice'


const validationSchema = Yup.object().shape({})

export default function CreateUserScreen() {
    const { t } = useTranslation()
    const [hiddenBottomSheet, setHiddenBottomSheet] = useState(false)
    const [avatar, setAvatar] = useState("https://img.freepik.com/vetores-premium/icone-de-camera-escuro-em-um-dispositivo-de-adesivo-de-cartao-de-vetor-de-simbolo-de-arte-plana-simples-branco_775175-276.jpg")
    const dispatch=useDispatch()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)
    const token = useSelector(selectToken)
    const [selectedValue, setSelectedValue] = useState(null)
    const [focusEmail, setFocusEmail] = useState(false)
    const [focusPassword, setFocusPassword] = useState(false)
    const [focusGender, setFocusGender] = useState(false)
    const [focusName, setFocusName] = useState(false)
    const navigation = useNavigation()
    const toggleSheet = () => {
        setHiddenBottomSheet((prev) => !prev)
    }
    const options = [
        { label: 'Male', value: 'male', sex: 'male' },
        { label: 'Female', value: 'female', sex: 'female' }
    ]

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



    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", values?.name)
            formData.append("email", values?.email)
            formData.append("sex", values?.gender)
            formData.append("password", values?.password)
            if (avatar) {
                formData.append("image", {
                    uri: avatar,
                    name: 'image.jpg',
                    type: 'image/jpeg',
                })
            }
            const response = await createUser(formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                showToastU(response.data.message, "#0866ff", "check", 3000)
                setLoading(false)
                setSelectedValue(t("gender"))
                setAvatar("https://img.freepik.com/vetores-premium/icone-de-camera-escuro-em-um-dispositivo-de-adesivo-de-cartao-de-vetor-de-simbolo-de-arte-plana-simples-branco_775175-276.jpg")
                dispatch(toggleRefresh())
            }
        } catch (err) {
            setLoading(false)
            setError(true)
            if (err.response) {
                setMessage(err.response.data.message)
                showToastU(err.response.data.message, "#EF4E4E", "warning", 3000)
            }
        }
    }
    return (
        <View className="flex-1 bg-bgAdmin">
            <StatusBar
                barStyle="dark-content"
            />
            <HeaderAdmin
                title='Quản lý người dùng'
                toggleSheet={toggleSheet}
            />
            
            <View className="z-20">
                <Toast
                    config={{
                        custom_toast: (internalState) => <CustomToast {...internalState} />
                    }}
                />
            </View>
            {
                loading ? (<Loading color='#438883' />) : (
                    <ScrollView className="px-[30px] py-[25px] ">
                        <Text className="text-textColorAdmin text-[18px] font-[700] mb-[20px] ">Tạo mới người dùng</Text>
                        <View className="">
                            <Formik
                                initialValues={{ name: '', email: '', password: '', gender: '', avatar: null }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                                    <View className="w-full">
                                        {/* {(touched.email && errors.email) || (touched.password && errors.password) ? (
                                    <View className="w-full flex-row items-center justify-center bg-backGroundColorWarning mb-[15px] py-[10px] rounded-[12px]">
                                        <Icon name="exclamation-circle" size={20} color="#EF4E4E" />
                                        <Text className="text-warningColor ml-[10px]">
                                            {errors.email || errors.password}
                                        </Text>
                                    </View>
                                ) : null} */}
                                        <View className="w-full bg-white px-[20px] py-[40px] rounded-[12px] mb-[30px] shadow-lg mx-auto flex flex-col">
                                            <TouchableOpacity activeOpacity={0.8} onPress={upLoadImage} >
                                                <View className="flex items-center justify-center mx-auto mb-[20px] w-[100px] h-[100px] rounded-[200px] bg-iconColor border border-borderColor overflow-hidden">
                                                    {
                                                        avatar !== "" ? (<Image
                                                            className="w-[100px] h-[100px] "
                                                            source={{ uri: `${avatar}` }}
                                                        />) : (<Icon name={`camera`} size={30} color="#fff" />)
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                            <View className="w-full flex flex-col gap-[10px] ">
                                                <Text className="text-[14px] text-[#232323] font-[400]">Tên người dùng</Text>
                                                <TextInput
                                                    placeholder={t("name")}
                                                    onChangeText={handleChange('name')}
                                                    onBlur={() => {
                                                        handleBlur('name')
                                                        setFocusName(false)
                                                    }}
                                                    value={values.name}
                                                    className={`text-[16px] leading-[20px] w-full text-[#718EBF] border ${focusName ? "border-[#718EBF]" : "border-borderColor"}   px-[16px] py-[13px] rounded-[10px] `}
                                                    onFocus={() => setFocusName(true)}
                                                />
                                            </View>
                                            <View className="w-full flex flex-col gap-[10px] mt-[10px]">
                                                <Text className="text-[14px] text-[#232323] font-[400]">Email</Text>
                                                <TextInput
                                                    placeholder={t("email")}
                                                    onChangeText={handleChange('email')}
                                                    onBlur={() => {
                                                        handleBlur('email')
                                                        setFocusEmail(false)
                                                    }}
                                                    value={values.email}
                                                    className={`text-[16px] leading-[20px] w-full text-[#718EBF] border ${focusEmail ? "border-[#718EBF]" : "border-borderColor"}   px-[16px] py-[13px] rounded-[10px] `}
                                                    onFocus={() => setFocusEmail(true)}
                                                />
                                            </View>
                                            <View className="w-full flex flex-col gap-[10px] mt-[10px]">
                                                <Text className="text-[14px] text-[#232323] font-[400]">Mật khẩu</Text>
                                                <TextInput
                                                    placeholder={t("password")}
                                                    onChangeText={handleChange('password')}
                                                    onBlur={() => {
                                                        handleBlur('password')
                                                        setFocusPassword(false)
                                                    }}
                                                    value={values.password}
                                                    className={`text-[16px] leading-[20px] w-full text-[#718EBF] border ${focusPassword ? "border-[#718EBF]" : "border-borderColor"}   px-[16px] py-[13px] rounded-[10px] `}
                                                    onFocus={() => setFocusPassword(true)}
                                                />
                                            </View>
                                            <View className="w-full flex flex-col gap-[10px] mt-[10px] mb-[2px]">
                                                <Text className="text-[14px] text-[#232323] font-[400]">Giới tính</Text>
                                                <View className={`w-full rounded-[14px] border ${focusGender ? "border-[#718EBF]" : " border-borderColor "}`}>
                                                    <Dropdown
                                                        style={styles.dropdown}
                                                        data={options}
                                                        labelField="label"
                                                        valueField="value"
                                                        placeholder={t("gender")}
                                                        value={selectedValue}
                                                        onChange={item => {
                                                            setFieldValue('gender', item.value)
                                                            setSelectedValue(item.value)
                                                        }}
                                                        renderItem={item => (
                                                            <View className="flex-row items-center gap-[10px] px-[20px] py-[12px] rounded-[14px]">
                                                                <Icon name={`${item.sex}`} size={30} color="#666666" />
                                                                <Text className="text-[#718EBF] ">{item.label}</Text>
                                                            </View>
                                                        )}
                                                        placeholderStyle={styles.placeholderStyle}
                                                        selectedTextStyle={styles.selectedTextStyle}
                                                        onFocus={() => setFocusGender(true)}
                                                        onBlur={() => setFocusGender(false)}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <ButtonCom
                                            text="Tạo mới"
                                            styleButton="w-full flex py-[10px] mt-[5px] bg-white rounded-[30px] border border-[#718EBF]"
                                            styleText="text-[#718EBF] text-center text-[16px] leading-[24px] font-[600]"
                                            onPress={handleSubmit}
                                        />
                                        <ButtonCom
                                            text="Quay lại"
                                            styleButton="w-full flex py-[10px] mt-[15px] mb-[100px] bg-[#718EBF] rounded-[30px] border border-[#718EBF]"
                                            styleText="text-white text-center text-[16px] leading-[24px] font-[600]"
                                            onPress={() => navigation.navigate("dashBroadScreen")}
                                        />
                                    </View>
                                )}
                            </Formik>
                        </View>
                    </ScrollView>
                )
            }

            {
                hiddenBottomSheet && (
                    <BottomSheetCom
                        onCloseBottomSheet={() => setHiddenBottomSheet(false)}
                        children={(
                            <View>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate("dashBroadScreen"); setHiddenBottomSheet(false) }} className="flex-row items-center gap-[15px] px-[20px] py-[10px]">
                                    <Icon name={`user`} size={30} color="#AAAAAA" />
                                    <Text className="text-[18px] text-[#AAAAAA] font-[500]">Quản lý người dùng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate("notificationScreen"); setHiddenBottomSheet(false) }} className="flex-row items-center gap-[15px] px-[20px] py-[10px]">
                                    <Icon name={`bell`} size={30} color="#AAAAAA" />
                                    <Text className="text-[18px] text-[#AAAAAA] font-[500]">Quản lý thông báo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate("bottomTabScreen") }} className="flex-row items-center gap-[15px] px-[20px] py-[10px]">
                                    <Icon name={`sign-out`} size={30} color="#AAAAAA" />
                                    <Text className="text-[18px] text-[#AAAAAA] font-[500]">Thoát</Text>
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
    dropdown: {
        height: 50,
        borderRadius: 14,
        paddingHorizontal: 20,
        backgroundColor: "white",
        marginTop: 2
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#AAAAAA',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#AAAAAA',
    },
})