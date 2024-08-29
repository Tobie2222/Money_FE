import { View ,TextInput,Image,Text,TouchableOpacity,StatusBar} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome'
import ButtonCom from '../../components/ButtonCom'
import { ScrollView } from 'react-native-gesture-handler'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../../redux/action/auth'
import { useCallback, useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import { resetAuthState, selectError, selectLoading, selectMessage, selectToken, selectUser } from '../../redux/authSlice'
import { saveData } from '../../utils/storage'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CutomToast'
import { showToastU } from '../../utils/toast'
import { useTranslation } from 'react-i18next'



const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: Yup.string().min(3, 'Mật khẩu phải có ít nhất 3 ký tự').required('Mật khẩu là bắt buộc')
})

export default function LoginScreen() {
    const {t}=useTranslation()
    const navigation = useNavigation()
    const token=useSelector(selectToken)
    const [focusEmail,setFocusEmail]=useState(false)
    const [focusPassword,setFocusPassword]=useState(false)
    const [hiddenPassword,setHiddenPassword]=useState(false)
    const loading=useSelector(selectLoading)
    const message=useSelector(selectMessage)
    const user=useSelector(selectUser)
    const error=useSelector(selectError)
    const dispatch=useDispatch()
    const route=useRoute()
    const { registrationSuccess, messageR,verifyResetPassSuccess,messageReset } = route.params || {}
    useEffect(() => {
        if (registrationSuccess) {
            showToastU(messageR,"#438883","check",3000)
            navigation.setParams({ registrationSuccess: false, messageR: '' })
        }
        if (verifyResetPassSuccess) {
            showToastU(messageReset,"#438883","check",3000)
            navigation.setParams({ verifyResetPassSuccess: false, messageReset: '' })
        }
    }, [registrationSuccess,verifyResetPassSuccess])
    //clear state old
    useFocusEffect(
        useCallback(() => {
            // Reset lại trạng thái message và error khi màn hình được focus
            dispatch(resetAuthState())
            return () => {
                // Optional: Reset lại trạng thái khi màn hình mất focus
                dispatch(resetAuthState())
            }
        }, [dispatch])
    )
    //handle login
    const handleLogin = async (values) => {
        dispatch(loginUser(values))
    }
    useEffect(()=>{
        if (token) {
            const dataSave = {
                token: token,
                user
            }
            saveData("dataSave", JSON.stringify(dataSave))
            navigation.reset({
                index: 0,
                routes: [{ name: 'bottomTabScreen' }],
            })
        }
    },[token,user])

    
    return (
        <View className="flex-1 bg-white">
        {
            loading===true?(<Loading color='#438883'/>):(
            <View>
                <View className="z-20">
                    <Toast 
                        config={{
                            custom_toast: (internalState) => <CustomToast {...internalState} />
                        }} 
                    />
                </View>
                <StatusBar
                    barStyle="black"
                />
                <ScrollView>
                    <Image
                        source={require("../../assets/pig.png")}
                        className="w-[150px] h-[180px] mt-[80px] mx-auto object-cover "
                    />
                    <Text className="mx-auto mt-[10px] text-center font-[700] leading-[39px] text-[26px] text-primaryColor w-[300px]"><Text className="text-[#FBBE4A]">M</Text>.app</Text>
                    <Formik
                        initialValues={{ email: '' ,password:''}}
                        validationSchema={validationSchema}
                        onSubmit={(values)=>handleLogin(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View className="w-[330px] flex-col mt-[60px] mx-auto ">
                            {(touched.email && errors.email) || (touched.password && errors.password) || (error && message) ? (
                                <View className="w-full flex-row items-center justify-center bg-backGroundColorWarning mb-[15px] py-[10px] rounded-[12px]">
                                    <Icon name="exclamation-circle" size={20} color="#EF4E4E" />
                                    <Text className="text-warningColor ml-[10px]">
                                        {errors.email || errors.password || message}
                                    </Text>
                                </View>
                            ) : null}
                                <View className={`w-full flex-row  items-center px-[16px] py-[16px] bg-[#F5F6F7] rounded-[14px] ${focusEmail===true?"border border-primaryColor ":"border border-borderColor "}`}>
                                    <Icon name="envelope" size={20} color="#AAAAAA" />
                                    <TextInput
                                        placeholder={t("email")}
                                        onChangeText={handleChange('email')}
                                        onBlur={()=>{
                                            handleBlur('email')
                                            setFocusEmail(false)
                                        }}
                                        value={values.email}
                                        className="text-[16px] leading-[20px] w-[85%] text-textColor ml-[10px]"
                                        onFocus={()=>setFocusEmail(true)}
                                    />
                                </View>
                                <View className={`w-full my-[20px] flex-row  items-center ${focusPassword===true?"border border-primaryColor ":"border border-borderColor "} px-[16px] py-[16px] bg-[#F5F6F7] rounded-[14px]`}>
                                    <Icon name="lock" size={20} color="#AAAAAA" />
                                    <TextInput
                                        placeholder={t("password")}
                                        onChangeText={handleChange('password')}
                                        onBlur={()=>{
                                            handleBlur('password')
                                            setFocusPassword(false)
                                        }}
                                        value={values.password}
                                        className="text-[16px] leading-[20px] text-textColor ml-[10px] w-[85%]  "
                                        secureTextEntry={!hiddenPassword}
                                        onFocus={()=>setFocusPassword(true)}
                                    />
                                    <TouchableOpacity onPress={()=>setHiddenPassword(!hiddenPassword)}>
                                        <Icon name={`${hiddenPassword===true?"eye-slash":"eye"}`} size={20} color="#AAAAAA" />
                                    </TouchableOpacity>
                                </View>
                                <ButtonCom
                                    text={t("login")}
                                    styleButton="w-full flex py-[13px] mt-[5px] bg-primaryColor rounded-[14px] " 
                                    styleText="text-white text-center text-[16px] leading-[24px] font-[600]" 
                                    onPress={handleSubmit}
                                />
                            </View>
                        )}
                    </Formik>
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("forgotPassword")}
                        activeOpacity={0.8} 
                        className="mx-auto mt-[40px]"
                    >
                        <Text className="text-[16px] leading-[24px] font-[600] text-primaryColor">{t("forgotPassword")}</Text>
                    </TouchableOpacity>
                    <View className="mx-auto mt-[140px] flex-row items-center">
                        <Text className="text-[16px] leading-[24px] font-[400] text-[#AAAAAA]">{t("noAccount")}</Text>
                        <TouchableOpacity className="ml-[10px] " onPress={()=>navigation.navigate("registerScreen")}><Text className="text-[#6d85fc] text-[16px] font-[600]">{t("register")}</Text></TouchableOpacity>
                    </View>
                </ScrollView>
        </View>
            )
        }
    </View>
    )
}

