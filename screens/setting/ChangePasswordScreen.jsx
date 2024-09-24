import { View, StyleSheet, Image, Text, StatusBar, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native'
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
import { selectUser } from '../../redux/authSlice'
import { changePassword } from '../../data/Api'
import Toast from 'react-native-toast-message'
import { showToastU } from '../../utils/toast'
import CustomToast from '../../components/CustomToast'

const validationSchema = Yup.object().shape({
    newPassword: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Mật khẩu xác nhận không khớp').required('Mật khẩu xác nhận là bắt buộc')
})


export default function ChangePasswordScreen() {
    const user = useSelector(selectUser)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)
    const [focusPassword, setFocusPassword] = useState(false)
    const [hiddenNewPassword, setHiddenNewPassword] = useState(false)
    const [focusConfirmPassword, setFocusConfirmPassword] = useState(false)
    const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(false)
    const [focusOldPassword, setFocusOldPassword] = useState(false)
    const [hiddenOldPassword, setHiddenOldPassword] = useState(false)
    const navigation = useNavigation()
    const { t } = useTranslation()
    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            values.email = user?.email
            const response = await changePassword(values)
            if (response.status === 200) {
                console.log(response.data.message)
                showToastU(response.data.message, "#0866ff", "check", 3000)
                setLoading(false)
            }
            console.log(values)
        } catch (err) {
            setLoading(false)
            setError(true)
            if (err.response) {
                setMessage(err.response.data.message)
                showToastU(err.response.data.message, "#EF4E4E", "warning", 3000)
            }
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
                <TouchableOpacity onPress={() => navigation.navigate("settingScreen")} className=" w-[28px] h-[28px]  flex items-center justify-center">
                    <Icon name='chevron-left' color={"#fff"} style={styles.icon} />
                </TouchableOpacity>
                <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ml-[100px] ">Đổi mật khẩu</Text>
            </View>
            {
                loading ? <Loading color='#438883' /> : (
                    <View className="px-[20px] ">
                        <Formik
                            initialValues={{ email: '', oldPassword: '', newPassword: '', confirmNewPassword: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View className="">
                                    <View className="w-full flex-col bg-white rounded-[14px] py-[30px] px-[20px] ">
                                        {(touched.newPassword && errors.newPassword) || (touched.confirmNewPassword && errors.confirmNewPassword) || (error && message) ? (
                                            <View className="w-full flex-row items-center justify-center bg-backGroundColorWarning mb-[15px] py-[10px] rounded-[12px]">
                                                <Icon name="exclamation-circle" size={20} color="#EF4E4E" />
                                                <Text className="text-warningColor ml-[10px]">
                                                    {errors.newPassword || errors.confirmNewPassword || message}
                                                </Text>
                                            </View>
                                        ) : null}
                                        <View className="w-full flex-col gap-[10px] mt-[5px]">
                                            <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Mật khẩu cũ</Text>
                                            <View className={`w-full my-[20px] flex-row  items-center ${focusOldPassword === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[16px] bg-white rounded-[8px]`}>
                                                <Icon name="lock" size={20} color="#AAAAAA" />
                                                <TextInput
                                                    onChangeText={handleChange('oldPassword')}
                                                    onBlur={() => {
                                                        handleBlur('oldPassword')
                                                        setFocusOldPassword(false)
                                                    }}
                                                    value={values.oldPassword}
                                                    className="text-[16px] leading-[20px] text-textColor ml-[10px] w-[85%]  "
                                                    secureTextEntry={!hiddenOldPassword}
                                                    onFocus={() => setFocusOldPassword(true)}
                                                />
                                                <TouchableOpacity onPress={() => setHiddenOldPassword(!hiddenOldPassword)}>
                                                    <Icon name={`${hiddenOldPassword ? "eye-slash" : "eye"}`} size={20} color="#AAAAAA" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View className="w-full flex-col gap-[10px] ">
                                            <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Mật khẩu mới</Text>
                                            <View className={`w-full my-[20px] flex-row  items-center ${focusPassword === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[16px] bg-white rounded-[8px]`}>
                                                <Icon name="lock" size={20} color="#AAAAAA" />
                                                <TextInput
                                                    onChangeText={handleChange('newPassword')}
                                                    onBlur={() => {
                                                        handleBlur('newPassword')
                                                        setFocusPassword(false)
                                                    }}
                                                    value={values.newPassword}
                                                    className="text-[16px] leading-[20px] text-textColor ml-[10px] w-[85%]  "
                                                    secureTextEntry={!hiddenNewPassword}
                                                    onFocus={() => setFocusPassword(true)}
                                                />
                                                <TouchableOpacity onPress={() => setHiddenNewPassword(!hiddenNewPassword)}>
                                                    <Icon name={`${hiddenNewPassword ? "eye-slash" : "eye"}`} size={20} color="#AAAAAA" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View className="w-full flex-col gap-[10px]">
                                            <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Nhắc lại mật khẩu mới</Text>
                                            <View className={`w-full my-[20px] flex-row  items-center ${focusConfirmPassword === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[16px] bg-white rounded-[8px]`}>
                                                <Icon name="lock" size={20} color="#AAAAAA" />
                                                <TextInput
                                                    onChangeText={handleChange('confirmNewPassword')}
                                                    onBlur={() => {
                                                        handleBlur('confirmNewPassword')
                                                        setFocusConfirmPassword(false)
                                                    }}
                                                    value={values.confirmNewPassword}
                                                    className="text-[16px] leading-[20px] text-textColor ml-[10px] w-[85%]  "
                                                    secureTextEntry={!hiddenConfirmPassword}
                                                    onFocus={() => setFocusConfirmPassword(true)}
                                                />
                                                <TouchableOpacity onPress={() => setHiddenConfirmPassword(!hiddenConfirmPassword)}>
                                                    <Icon name={`${hiddenConfirmPassword ? "eye-slash" : "eye"}`} size={20} color="#AAAAAA" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <ButtonCom
                                        text="Đổi mật khẩu"
                                        styleButton="w-full flex py-[13px] mt-[50px] border border-primaryColor mb-[30px] rounded-[40px] "
                                        styleText="text-white text-center text-[16px] leading-[24px] font-[600] text-primaryColor"
                                        onPress={handleSubmit}
                                    />
                                </View>

                            )}
                        </Formik>
                    </View>
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