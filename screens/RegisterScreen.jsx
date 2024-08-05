import { View ,TextInput,Image,Text,TouchableOpacity,StatusBar, ScrollView} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ButtonCom from '../components/ButtonCom'

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
})

export default function RegisterScreen() {
    const navigation = useNavigation()
    return (
        <View className="flex-1">
            <StatusBar
                barStyle="black"
            />
            <ScrollView>
                <Image
                    source={require("../assets/pig.png")}
                    className="w-[150px] h-[180px] mt-[100px] mx-auto object-cover "
                />
                <Text className="mx-auto mt-[10px] text-center font-[700] leading-[39px] text-[26px] text-primaryColor w-[300px]"><Text className="text-[#FBBE4A]">M</Text>.app</Text>
                <Formik
                    initialValues={{ email: '' ,password:''}}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View className="w-[330px] flex-col mt-[60px] mx-auto ">
                            {/* {touched.email && errors.email && (
                                <View className="w-full flex-row items-center justify-center bg-backGroundColorWarning mb-[15px] py-[10px] rounded-[12px]">
                                    <Icon name="exclamation-circle" size={20} color="#EF4E4E" />
                                    <Text className="text-warningColor ml-[10px]">{errors.email}</Text>
                                </View>
                            )} */}
                            <View className="w-full flex-row items-center border border-borderColor px-[16px] py-[16px] bg-[#F5F6F7] rounded-[14px] ">
                                <Icon name="envelope" size={20} color="#666666" />
                                <TextInput
                                    placeholder="Email"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    className="text-[16px] leading-[20px] w-[85%] text-textColor ml-[10px] "
                                />
                            </View>
                            <View className="w-full my-[10px] flex-row items-center border border-borderColor px-[16px] py-[16px] bg-[#F5F6F7] rounded-[14px] ">
                                <Icon name="lock" size={20} color="#666666" />
                                <TextInput
                                    placeholder="Password"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('email')}
                                    value={values.password}
                                    className="text-[16px] leading-[20px] text-textColor ml-[10px] w-[85%]  "
                                    secureTextEntry={true}
                                />
                                <Icon name="eye" size={20} color="#666666" />
                            </View>
                            <View className="w-full flex-row items-center border border-borderColor px-[16px] py-[16px] bg-[#F5F6F7] rounded-[14px] ">
                                <Icon name="lock" size={20} color="#666666" />
                                <TextInput
                                    placeholder="Password"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('email')}
                                    value={values.password}
                                    className="text-[16px] leading-[20px] text-textColor ml-[10px] w-[85%]  "
                                    secureTextEntry={true}
                                />
                                <Icon name="eye" size={20} color="#666666" />
                            </View>
                            <View className="w-full mt-[10px] flex-row items-center border border-borderColor px-[16px] py-[16px] bg-[#F5F6F7] rounded-[14px] ">
                                <Icon name="lock" size={20} color="#666666" />
                                <TextInput
                                    placeholder="Password"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('email')}
                                    value={values.password}
                                    className="text-[16px] leading-[20px] text-textColor ml-[10px] w-[85%]  "
                                    secureTextEntry={true}
                                />
                                <Icon name="eye" size={20} color="#666666" />
                            </View>
                            <View className="w-full my-[10px] flex-row items-center border border-borderColor px-[16px] py-[16px] bg-[#F5F6F7] rounded-[14px] ">
                                <Icon name="lock" size={20} color="#666666" />
                                <TextInput
                                    placeholder="Password"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('email')}
                                    value={values.password}
                                    className="text-[16px] leading-[20px] text-textColor ml-[10px] w-[85%]  "
                                    secureTextEntry={true}
                                />
                                <Icon name="eye" size={20} color="#666666" />
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
                    <Text className="text-[16px] leading-[24px] font-[400] text-[#242D35]">Bạn đã có tài khoản ? <TouchableOpacity onPress={()=>navigation.navigate("loginScreen")}><Text className="text-[#0E33F3] text-[16px] font-[600]">Đăng nhập</Text></TouchableOpacity></Text>
                </View>
                </ScrollView>
        </View>
    )
}
