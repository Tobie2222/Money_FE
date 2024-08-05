import { View ,TextInput,Image,Text,TouchableOpacity,StatusBar,StyleSheet} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome'
import ButtonCom from '../components/ButtonCom'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
})

export default function ForgotPassword() {
    const navigation = useNavigation()

    return (
        <View className="flex-1">
            <StatusBar
                barStyle="black"
            />
            <ScrollView>
                <View className="mt-[70px] ">
                    <TouchableOpacity onPress={()=>navigation.navigate("startScreen")} className="absolute w-[28px] h-[28px] top-[75px] left-[25px] flex items-center justify-center">
                        <Icon name='chevron-left'  color={"#438883"} style={styles.icon}/>
                    </TouchableOpacity>
                    <Text className="">Quên Mật khẩu</Text>
                </View>
                <Image
                    source={require("../assets/pig.png")}
                    className="w-[150px] h-[180px] mt-[80px] mx-auto object-cover "
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