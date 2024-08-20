import { View,TouchableOpacity,Text,StatusBar ,TextInput, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AbstractCircle from '../../components/AbstractCircle'
import { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import ButtonCom from '../../components/ButtonCom'


const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: Yup.string().min(3, 'Mật khẩu phải có ít nhất 3 ký tự').required('Mật khẩu là bắt buộc')
})

export default function TransactionScreen() {
    const [func,setFunc]=useState("Chi tiền")
    const [focusEmail,setFocusEmail]=useState(false)
    const handleLogin = async (values) => {
        dispatch(loginUser(values))
    }
    return (
        <View className="flex-1">
            <AbstractCircle/>
            <StatusBar
                barStyle="light-content"
            />
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{}} className="bg-[#559c96] flex-row items-center justify-center py-[5px] w-[35%] mx-auto mt-[67px] rounded-[24px]">
                <Text className="text-white text-[22px] font-[800] leading-[33px] mr-[5px]">{func}</Text>
                <Icon name={"angle-down"} size={30} color="#fff" />
            </TouchableOpacity>
            <ScrollView>
            <Formik
                        initialValues={{ transaction_name: '',desc_transaction:'',amount: 0 }}
                        validationSchema={validationSchema}
                        onSubmit={(values)=>handleLogin(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View className="w-[358px] mt-[60px] mx-auto rounded-[14px] ">
                                <View className="w-full flex-col bg-[#F5F6F7] rounded-[14px] py-[30px] px-[20px] ">
                                    {/* {(touched.email && errors.email) || (touched.password && errors.password) || (error && message) ? (
                                        <View className="w-full flex-row items-center justify-center bg-backGroundColorWarning mb-[15px] py-[10px] rounded-[12px]">
                                            <Icon name="exclamation-circle" size={20} color="#EF4E4E" />
                                            <Text className="text-warningColor ml-[10px]">
                                                {errors.email || errors.password || message}
                                            </Text>
                                        </View>
                                    ) : null} */}
                                    <View className="w-full flex-col gap-[10px] ">
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Tên khoản chi</Text>
                                        <TextInput
                                            onChangeText={handleChange('transaction_name')}
                                            // onBlur={()=>{
                                            //     handleBlur('email')
                                            //     setFocusEmail(false)
                                            // }}
                                            value={values.transaction_name}
                                            className="text-[16px] leading-[20px] w-full text-textColor border-[1.4px] border-borderColor px-[20px] py-[15px] rounded-[8px] "
                                            onFocus={()=>setFocusEmail(true)}
                                        />
                                    </View>
                                    <View className="w-full flex-col gap-[10px] mt-[5px]">
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Số tiền</Text>
                                        <TextInput
                                            onChangeText={handleChange('amount')}
                                            // onBlur={()=>{
                                            //     handleBlur('email')
                                            //     setFocusEmail(false)
                                            // }}
                                            value={values.amount}
                                            className="text-[16px] leading-[20px] w-full text-textColor border-[1.4px] border-borderColor px-[20px] py-[15px] rounded-[8px] "
                                            onFocus={()=>setFocusEmail(true)}
                                        />
                                    </View>
                                    <View className="w-full flex-col gap-[10px] mt-[5px]">
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Mô tả khoản chi</Text>
                                        <TextInput
                                            onChangeText={handleChange('desc_transaction')}
                                            // onBlur={()=>{
                                            //     handleBlur('email')
                                            //     setFocusEmail(false)
                                            // }}
                                            value={values.desc_transaction}
                                            className="text-[16px] leading-[20px] w-full text-textColor border-[1.4px] border-borderColor px-[20px] py-[15px] rounded-[8px] "
                                            onFocus={()=>setFocusEmail(true)}
                                        />
                                    </View>
                                    <View className="w-full flex-col gap-[10px] mt-[5px]">
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Danh mục chi tiêu</Text>
                                        <TextInput
                                            onChangeText={handleChange('email')}
                                            // onBlur={()=>{
                                            //     handleBlur('email')
                                            //     setFocusEmail(false)
                                            // }}
                                            value={values.email}
                                            className="text-[16px] leading-[20px] w-full text-textColor border-[1.4px] border-borderColor px-[20px] py-[15px] rounded-[8px] "
                                            onFocus={()=>setFocusEmail(true)}
                                        />
                                    </View>
                                    <View className="w-full flex-col gap-[10px] mt-[5px]">
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Từ tài khoản</Text>
                                        <TextInput
                                            onChangeText={handleChange('email')}
                                            // onBlur={()=>{
                                            //     handleBlur('email')
                                            //     setFocusEmail(false)
                                            // }}
                                            value={values.email}
                                            className="text-[16px] leading-[20px] w-full text-textColor border-[1.4px] border-borderColor px-[20px] py-[15px] rounded-[8px] "
                                            onFocus={()=>setFocusEmail(true)}
                                        />
                                    </View>
                                </View>
                                <ButtonCom
                                    text="Tạo mới khoản chi"
                                    styleButton="w-full flex py-[13px] mt-[30px] border border-primaryColor mb-[30px] rounded-[40px] " 
                                    styleText="text-white text-center text-[16px] leading-[24px] font-[600] text-primaryColor" 
                                    onPress={handleSubmit}
                                />
                            </View>
                            
                        )}
                    </Formik>
            </ScrollView>

        </View>
    );
}

