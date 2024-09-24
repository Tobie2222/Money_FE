import { View ,TextInput,Image,Text,TouchableOpacity,StatusBar,StyleSheet} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome'
import ButtonCom from '../../components/ButtonCom'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { resetPassword } from '../../data/Api'
import Loading from '../../components/Loading'
import Toast from 'react-native-toast-message'
import { showToastU } from '../../utils/toast'
import { useTranslation } from 'react-i18next'
import CustomToast from '../../components/CustomToast'

const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required('Mật khẩu là bắt buộc').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp').required('Xác nhận mật khẩu là bắt buộc')
})

export default function ResetPasswordScreen() {
    const {t}=useTranslation()
    const navigation = useNavigation()
    const [focusPassword,setFocusPassword]=useState(false)
    const [focusConfirmPassword,setConfirmFocusPassword]=useState(false)
    const [hiddenPassword,setHiddenPassword]=useState(false)
    const [hiddenConfirmPassword,setHiddenConfirmPassword]=useState(false)
    const [loading,setLoading]=useState(false)
    const [message,setMessage]=useState("")
    const [err,setErr]=useState(false)
    const route=useRoute()
    const {email,messageS,success}=route.params || {}
    console.log(email)
    //show verify code success
    useEffect(() => {
        console.log('Showing Toast:', success, messageS) 
        if (success) {
            showToastU(messageS, "#438883", "check", 2000)
        }
        navigation.setParams({ success: false, messageS: '' })
    }, [success, messageS])

    const handleSubmit=async(values)=>{
        setLoading(true)
        try {
            console.log(values)
            const response=await resetPassword({email:email,...values})
            if (response.status===200) {
                console.log(response.data)
                setLoading(false)
                navigation.navigate("loginScreen"
                    ,{verifyResetPassSuccess:true,messageReset:response.data.message}
                )
                
            }
        } catch(err) {
            if (err.response) {
                setMessage(err.response.data.message)
            }
            setLoading(false)
            setErr(true)
            console.log(err)
        }
    }

    return (
        <View className="flex-1 bg-white">
            <StatusBar
                barStyle="black"
            />
            {
                    loading===true?(<Loading/>):(
                        
                    <ScrollView>
                        <View className="z-20">
                            <Toast 
                                config={{
                                    custom_toast: (internalState) => <CustomToast {...internalState} />
                                }} 
                            />
                        </View>
                        <View className="mt-[70px] mx-[25px] flex-row items-center ">
                            <TouchableOpacity onPress={()=>navigation.navigate("loginScreen")} className="w-[4%]  h-[28px] flex items-center justify-center">
                                <Icon name='chevron-left'  color={"#438883"} style={styles.icon}/>
                            </TouchableOpacity>
                            <View className=" w-[95%]">
                                <Text className=" text-center text-[24px] font-[600] text-textColor ">Đặt lại mật khẩu</Text>
                            </View>
                        </View>
                        <Image
                            source={require("../../assets/pig.png")}
                            className="w-[150px] h-[180px] mt-[80px] mx-auto object-cover "
                        />
                        <Text className="mx-auto mt-[10px] text-center font-[700] leading-[39px] text-[26px] text-primaryColor w-[300px]"><Text className="text-[#FBBE4A]">M</Text>.app</Text>
                        <Formik
                            initialValues={{ newPassword: '',confirmNewPassword: ''}}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View className="w-[330px] flex-col mt-[20px] mx-auto ">
                                    {(touched.newPassword && errors.newPassword) || (touched.confirmNewPassword && errors.confirmNewPassword) || (err && message) ? (
                                        <View className="w-full flex-row items-center justify-center bg-backGroundColorWarning mb-[15px] py-[10px] rounded-[12px]">
                                            <Icon name="exclamation-circle" size={20} color="#EF4E4E" />
                                            <Text className="text-warningColor ml-[10px]">{errors.newPassword || errors.confirmNewPassword || message}</Text>
                                        </View>
                                    ):null}
                                    <View className={`w-full mt-[20px] mb-[15px] flex-row  items-center ${focusPassword===true?"border border-primaryColor ":"border border-borderColor "} px-[16px] py-[16px] bg-[#F5F6F7] rounded-[14px]`}>
                                        <Icon name="lock" size={20} color="#AAAAAA" />
                                        <TextInput
                                            placeholder="newPassword..."
                                            onChangeText={handleChange('newPassword')}
                                            onBlur={()=>{
                                                handleBlur('newPassword')
                                                setFocusPassword(false)
                                            }}
                                            value={values.newPassword}
                                            className="text-[16px] leading-[20px] text-textColor ml-[10px] w-[85%]  "
                                            secureTextEntry={!hiddenPassword}
                                            onFocus={()=>setFocusPassword(true)}
                                        />
                                        <TouchableOpacity onPress={()=>setHiddenPassword(!hiddenPassword)}>
                                            <Icon name={`${hiddenPassword===true?"eye-slash":"eye"}`} size={20} color="#AAAAAA" />
                                        </TouchableOpacity>
                                    </View>
                                    <View className={`w-full mb-[20px] flex-row  items-center ${focusConfirmPassword===true?"border border-primaryColor ":"border border-borderColor "} px-[16px] py-[16px] bg-[#F5F6F7] rounded-[14px]`}>
                                        <Icon name="lock" size={20} color="#AAAAAA" />
                                        <TextInput
                                            placeholder="confirmNewPassword..."
                                            onChangeText={handleChange('confirmNewPassword')}
                                            onBlur={()=>{
                                                handleBlur('confirmNewPassword')
                                                setConfirmFocusPassword(false)
                                            }}
                                            value={values.confirmNewPassword}
                                            className="text-[16px] leading-[20px] text-textColor ml-[10px] w-[85%]  "
                                            secureTextEntry={!hiddenConfirmPassword}
                                            onFocus={()=>setConfirmFocusPassword(true)}
                                        />
                                        <TouchableOpacity onPress={()=>setHiddenConfirmPassword(!hiddenConfirmPassword)}>
                                            <Icon name={`${hiddenConfirmPassword===true?"eye-slash":"eye"}`} size={20} color="#AAAAAA" />
                                        </TouchableOpacity>
                                    </View>
                                    <ButtonCom
                                        text="Gửi"
                                        styleButton="w-full flex  py-[13px] mt-[5px] bg-primaryColor rounded-[14px] " 
                                        styleText="text-white text-center text-[16px] leading-[24px] font-[600]" 
                                        onPress={handleSubmit}
                                    />
                                </View>
                            )}
                        </Formik>
                    </ScrollView>
                    )
                }
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 22, 
        fontWeight: 400
    },
    inputSelect: {
        shadowColor: "#000",
        shadowOffset: {
            width: 8,
            height: 8,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 2,
    }
})