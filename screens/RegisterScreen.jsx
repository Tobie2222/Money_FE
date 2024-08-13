import { View ,TextInput,Image,Text,TouchableOpacity,StatusBar,StyleSheet, ScrollView} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ButtonCom from '../components/ButtonCom'
import { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { register } from '../data/Api'
import Loading from '../components/Loading'

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp').required('Mật khẩu xác nhận là bắt buộc'),
    sex: Yup.string().required('Giới tính là bắt buộc')
})
const options = [
    { label: 'Male', value: 'male',sex: 'male' },
    { label: 'Female', value: 'female',sex: 'female' }
]

export default function RegisterScreen() {
    const [selectedValue, setSelectedValue] = useState(null)
    const [loading,setLoading]=useState(false)
    const [message,setMessage]=useState("")
    const [err,setErr]=useState(false)
    const navigation = useNavigation()
    const [focusEmail,setFocusEmail]=useState(false)
    const [focusPassword,setFocusPassword]=useState(false)
    const [focusName,setFocusName]=useState(false)
    const [focusConfirmPassword,setFocusConfirmPassword]=useState(false)
    const [hiddenPassword,setHiddenPassword]=useState(false)
    const [hiddenConfirmPassword,setHiddenConfirmPassword]=useState(false)
    const [focusSex,setFocusSex]=useState(false)
    const handleSubmit = async (values) => {
        try {
            setLoading(true)
            const response = await register(values)
            if (response.status === 200) {
                setMessage(response.data.message)
                navigation.navigate("loginScreen", { registrationSuccess: true })
            } else {
                setMessage(response.data.message)
                setErr(true)
            }
        } catch (err) {
            if (err.response) {
                console.log("Response data:", err.response.data)
                setMessage(err.response.data.message)
                setErr(true)
                console.log("Response status:", err.response.status)
                console.log("Response headers:", err.response.headers)
            } else if (err.request) {
                console.log("Request data:", err.request)
            } else {
                console.log("Error message:", err.message)
            }
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <View className="flex-1 bg-white">
            <StatusBar
                barStyle="black"
            />
            {
                loading===true?(<Loading color='#438883'/>):(
                <ScrollView>
                    <Image
                        source={require("../assets/pig.png")}
                        className="w-[150px] h-[180px] mt-[70px] mx-auto object-cover "
                    />
                    <Text className="mx-auto mt-[10px] text-center font-[700] leading-[39px] text-[26px] text-primaryColor w-[300px]"><Text className="text-[#FBBE4A]">M</Text>.app</Text>
                    <Formik
                        initialValues={{name: '', email: '' ,password:'',confirmPassword: '',sex:''}}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleChange, handleBlur, handleSubmit,setFieldValue, values, errors, touched }) => (
                            <View className="w-[330px] flex-col mt-[60px] mx-auto ">
                                {(touched.name && errors.name) || (touched.email && errors.email) || (touched.password && errors.password) || (touched.confirmPassword && errors.confirmPassword) || (touched.sex && errors.sex) || (err && message) ? (
                                    <View className="w-full flex-row items-center justify-center bg-backGroundColorWarning mb-[15px] py-[10px] rounded-[12px]">
                                        <Icon name="exclamation-circle" size={20} color="#EF4E4E" />
                                        <Text className="text-warningColor ml-[10px]">{errors.name || errors.email || errors.password || errors.confirmPassword || errors.sex || message}</Text>
                                    </View>
                                ):null}
                                <View className={`w-full flex-row items-center ${focusName===true?"border border-primaryColor ":"border border-borderColor "} px-[16px] py-[16px] bg-[#F5F6F7] rounded-[14px] `}>
                                    <Icon name="user" size={20} color="#AAAAAA" />
                                    <TextInput
                                        placeholder="Name"
                                        onChangeText={handleChange('name')}
                                        onBlur={()=>{
                                            handleBlur('email')
                                            setFocusName(false)
                                            setErr(false)
                                        }}
                                        onFocus={()=>setFocusName(true)}
                                        value={values.name}
                                        className="text-[16px] leading-[20px] text-textColor ml-[10px] w-[85%]  "
                                    />
                                </View>
                                <View className={`w-full flex-row items-center my-[10px] ${focusEmail===true?"border border-primaryColor ":"border border-borderColor "} px-[16px] py-[16px] bg-[#F5F6F7] rounded-[14px] `}>
                                    <Icon name="envelope" size={15} color="#AAAAAA" />
                                    <TextInput
                                        placeholder="Email"
                                        onChangeText={handleChange('email')}
                                        onBlur={()=>{
                                            handleBlur('email')
                                            setFocusEmail(false)
                                        }}
                                        onFocus={()=>setFocusEmail(true)}
                                        value={values.email}
                                        className="text-[16px] leading-[20px] w-[85%] text-textColor ml-[10px] "
                                    />
                                </View>
                                <View className={`w-full flex-row items-center ${focusPassword===true?"border border-primaryColor ":"border border-borderColor "} px-[16px] py-[16px] bg-[#F5F6F7] rounded-[14px] `}>
                                    <Icon name="lock" size={20} color="#AAAAAA" />
                                    <TextInput
                                        placeholder="Password"
                                        onChangeText={handleChange('password')}
                                        onBlur={()=>{
                                            handleBlur('password')
                                            setFocusPassword(false)
                                        }}
                                        onFocus={()=>setFocusPassword(true)}
                                        value={values.password}
                                        className="text-[16px] leading-[20px] text-textColor ml-[10px] w-[85%]  "
                                        secureTextEntry={!hiddenPassword}
                                    />
                                    <TouchableOpacity onPress={()=>setHiddenPassword(!hiddenPassword)}>
                                        <Icon name={`${hiddenPassword===true?"eye-slash":"eye"}`} size={20} color="#AAAAAA" />
                                    </TouchableOpacity>
                                </View>
                                <View className={`w-full mt-[10px] flex-row items-center ${focusConfirmPassword===true?"border border-primaryColor ":"border border-borderColor "} px-[16px] py-[16px] bg-[#F5F6F7] rounded-[14px] `}>
                                    <Icon name="lock" size={20} color="#AAAAAA" />
                                    <TextInput
                                        placeholder="ConfirmPassword"
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={()=>{
                                            handleBlur('confirmPassword')
                                            setFocusConfirmPassword(false)
                                        }}
                                        onFocus={()=>setFocusConfirmPassword(true)}
                                        value={values.confirmPassword}
                                        className="text-[16px] leading-[20px] text-textColor ml-[10px] w-[85%]  "
                                        secureTextEntry={!hiddenConfirmPassword}
                                    />
                                    <TouchableOpacity onPress={()=>setFocusConfirmPassword(!hiddenConfirmPassword)}>
                                        <Icon name={`${hiddenConfirmPassword===true?"eye-slash":"eye"}`} size={20} color="#AAAAAA" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.container} className={`w-full rounded-[14px] ${focusSex===true?"border border-primaryColor ":"border border-borderColor "}`}>
                                    <Dropdown
                                        style={styles.dropdown}
                                        data={options}
                                        labelField="label"
                                        valueField="value"
                                        placeholder="Giới tính"
                                        value={selectedValue}
                                        onChange={item => {
                                            setFieldValue('sex', item.value)
                                            setSelectedValue(item.value)
                                        }}
                                        renderItem={item => (
                                            <View className="flex-row items-center gap-[10px] px-[20px] py-[12px] rounded-[14px]">
                                                <Icon name={`${item.sex}`} size={30} color="#666666" />
                                                <Text className="text-textColor ">{item.label}</Text>
                                            </View>
                                        )}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        onFocus={() => setFocusSex(true)}
                                        onBlur={() => setFocusSex(false)}
                                    />
                                </View>
                                <ButtonCom
                                    text="Đăng ký"
                                    styleButton="w-full flex justify-center px-[124px] py-[13px] mt-[5px] bg-primaryColor rounded-[14px] " 
                                    styleText="text-white text-[16px] leading-[24px] font-[600]" 
                                    onPress={handleSubmit}
                                />
                            </View>
                        )}
                    </Formik>
                    <View className="mx-auto mt-[90px] mb-[40px] ">
                        <Text className="text-[16px] leading-[24px] font-[400] text-[#AAAAAA]">Bạn đã có tài khoản ? <TouchableOpacity onPress={()=>navigation.navigate("loginScreen")}><Text className="text-[#6d85fc] text-[16px] font-[600]">Đăng nhập</Text></TouchableOpacity></Text>
                    </View>
                </ScrollView>
                )
            }


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 20
    },
    dropdown: {
        height: 50,
        borderRadius: 14,
        paddingHorizontal: 20,
        backgroundColor: "#F5F6F7",
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