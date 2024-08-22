import { View, TouchableOpacity, Text, StatusBar, TextInput, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AbstractCircle from '../../components/AbstractCircle'
import { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import ButtonCom from '../../components/ButtonCom'
import { useTranslation } from 'react-i18next'

const selectFun = [
    { id: 0, title: "Chi tiền",nameIcon: "plus" },
    { id: 1, title: "Thu tiền",nameIcon: "minus" },
]


const validationSchema = Yup.object().shape({

})

export default function TransactionScreen() {
    const {t}=useTranslation()
    const [func, setFunc] = useState("Chi tiền")
    const [focusEmail, setFocusEmail] = useState(false)
    const [hiddenModal, setHiddenModal] = useState(false)
    const handleLogin = async (values) => {
        dispatch(loginUser(values))
    }
    return (
        <View className="flex-1">
            <AbstractCircle />
            <StatusBar
                barStyle="light-content"
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => setHiddenModal(!hiddenModal)} className="bg-[#559c96] flex-row items-center justify-center py-[5px] w-[35%] mx-auto mt-[67px] rounded-[24px]">
                <Text className="text-white text-[22px] font-[800] leading-[33px] mr-[5px]">{func}</Text>
                <Icon name={"angle-down"} size={30} color="#fff" />
            </TouchableOpacity>
            {
                hiddenModal && (
                    <View className="absolute w-full h-[84%] left-0 bottom-0 ">
                        <View className="w-full h-full relative ">
                            <View className="bg-white w-full h-auto px-[20px] pt-[15px] rounded-b-[20px] absolute top-0 left-0 z-20 ">
                                {
                                    selectFun.map((fun)=>{
                                        return (
                                            <TouchableOpacity key={fun.id} activeOpacity={0.8} onPress={()=>{setFunc(fun.title); setHiddenModal(false)}} className="flex-row items-center gap-[20px] mb-[15px]">
                                                <View className="flex-row items-center justify-center px-[10px] py-[8px] bg-[#c4d9d7] rounded-[100px]">
                                                    <Icon name={fun.nameIcon} size={25} color="#fff" />
                                                </View>
                                                <Text className="text-[22px] font-[800] leading-[33px] text-primaryColor">{fun.title}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            <View className="bg-black w-full h-full opacity-30 insert-0 z-10"></View>
                        </View>
                    </View>
                )
            }
            <ScrollView >
                <Formik
                    initialValues={{ transaction_name: '', desc_transaction: '', amount: 0 }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleLogin(values)}
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
                                        onFocus={() => setFocusEmail(true)}
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
                                        onFocus={() => setFocusEmail(true)}
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
                                        onFocus={() => setFocusEmail(true)}
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
                                        onFocus={() => setFocusEmail(true)}
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
                                        onFocus={() => setFocusEmail(true)}
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
    )
}

