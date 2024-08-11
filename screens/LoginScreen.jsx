import { View ,TextInput,Image,Text,TouchableOpacity,StatusBar} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome'
import ButtonCom from '../components/ButtonCom'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../redux/action/auth'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { selectError, selectIsAuthenticated, selectLoading, selectMessage, selectToken } from '../redux/authSlice'
import { showToast } from '../utils/toast'



const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: Yup.string().min(3, 'Mật khẩu phải có ít nhất 3 ký tự').required('Mật khẩu là bắt buộc')
})

export default function LoginScreen() {
    const navigation = useNavigation()
    const isAuthenticated=useSelector(selectIsAuthenticated)
    const token=useSelector(selectToken)
    const [focusEmail,setFocusEmail]=useState(false)
    const [focusPassword,setFocusPassword]=useState(false)
    const [hiddenPassword,setHiddenPassword]=useState(false)
    const loading=useSelector(selectLoading)
    const message=useSelector(selectMessage)
    const error=useSelector(selectError)
    const dispatch=useDispatch()
    const route=useRoute()

    // useEffect(()=>{
    //     if (route.params?.registrationSuccess) {
    //         showToast("success","đăng ký thành công", "Thành công")
    //     }
    // },[route.params])
    const handleLogin = async (values) => {
        dispatch(loginUser(values))
    }
    useEffect(()=>{
        if (token) {
            //saveData("token",token)
            navigation.navigate("bottomTabScreen")
        }
    },[isAuthenticated])
    return (
        <View className="flex-1 bg-white">
        {
            loading===true?(<Loading color='#438883'/>):(
            <View>
                <StatusBar
                    barStyle="black"
                />
                <ScrollView>
                    <Image
                        source={require("../assets/pig.png")}
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
                                        placeholder="Email"
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
                                        placeholder="Password"
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
                                    text="Đăng nhập"
                                    styleButton="w-full flex py-[13px] mt-[5px] bg-primaryColor rounded-[14px] " 
                                    styleText="text-white text-center text-[16px] leading-[24px] font-[600]" 
                                    onPress={handleSubmit}
                                />
                            </View>
                        )}
                    </Formik>
                    <TouchableOpacity onPress={()=>navigation.navigate("forgotPassword")} activeOpacity={0.8} className="mx-auto mt-[40px]">
                        <Text className="text-[16px] leading-[24px] font-[600] text-primaryColor">Quên mật khẩu ?</Text>
                    </TouchableOpacity>
                    <View className="mx-auto mt-[140px]">
                        <Text className="text-[16px] leading-[24px] font-[400] text-[#AAAAAA]">Bạn chưa có tài khoản ? <TouchableOpacity onPress={()=>navigation.navigate("registerScreen")}><Text className="text-[#6d85fc] text-[16px] font-[600]">Đăng ký</Text></TouchableOpacity></Text>
                    </View>
                </ScrollView>
        </View>
            )
        }
    </View>
    )
}

