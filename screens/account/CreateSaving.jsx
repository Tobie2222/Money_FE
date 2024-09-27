import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Text, StatusBar, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useState } from 'react'
import { selectToken, selectUser } from '../../redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import AbstractCircle from '../../components/AbstractCircle'
import ButtonCom from '../../components/ButtonCom'
import * as ImagePicker from "expo-image-picker"
import { format } from 'date-fns'
import DateTimePicker from '@react-native-community/datetimepicker'
import { vi } from 'date-fns/locale'
import { createSaving } from '../../data/Api'
import { showToastU } from '../../utils/toast'
import { toggleRefresh } from '../../redux/accountSlice'
import Loading from '../../components/Loading'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CustomToast'

const validationSchema = Yup.object().shape({})
export default function CreateSaving() {
    const token = useSelector(selectToken)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [avatar, setAvatar] = useState("https://timo.vn/wp-content/uploads/cach-chi-tieu-hop-ly-voi-muc-luong-6-trieu.jpg")
    const navigation = useNavigation()
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)

    const [showDatePickerStart, setShowDatePickerStart] = useState(false)
    const [showDatePickerEnd, setShowDatePickerEnd] = useState(false)
    const [selectedDateStart, setSelectedDateStart] = useState(new Date())
    const [selectedDateEnd, setSelectedDateEnd] = useState(new Date())
    const [focusSavingName, setFocusSavingName] = useState(false)
    const [focusDescSaving, setFocusDescSaving] = useState(false)
    const [focusGoalAmount, setFocusGoalAmount] = useState(false)

    const onDateChangeStart = (event, selectedDate) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || new Date()
            setSelectedDateStart(currentDate)
        }
        setShowDatePickerStart(false)
    }
    const onDateChangeEnd = (event, selectedDate) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || new Date()
            setSelectedDateEnd(currentDate)
        }
        setShowDatePickerEnd(false)
    }
    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            // Prepare the data in JSON format
            const data = {
                saving_name: values.saving_name,
                desc_saving: values.desc_saving,
                goal_amount: values.goal_amount,
                deadline: selectedDateEnd.toISOString(),
                saving_date: selectedDateStart.toISOString(),
            };
                
            // Send the data in JSON format without using FormData
            const response = await createSaving(user?.user_id, data, {
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${token}`,
                }
            });
            
            if (response.status === 200) {
                console.log(response.data.message);
                showToastU(response.data.message, "#0866ff", "check", 3000);
                setLoading(false);
                dispatch(toggleRefresh());
            }
            
        } catch (err) {
            setLoading(false);
            setError(true);
            if (err.response) {
                setMessage(err.response.data.message);
                showToastU(err.response.data.message, "#EF4E4E", "warning", 3000);
            }
            console.log(err);
        }
    };

    return (
        <View className="flex-1">
            <StatusBar
                barStyle="dark"
            />
            
            <View className="z-20">
                <Toast
                    config={{
                        custom_toast: (internalState) => <CustomToast {...internalState} />
                    }}
                />
            </View>
            <ScrollView>
                <AbstractCircle />
                <View className="flex-row items-center mt-[80px] mb-[40px] w-full px-[25px] ">
                    <TouchableOpacity onPress={() => navigation.navigate("accountScreen")} className=" w-[28px] h-[28px]  flex items-center justify-center">
                        <Icon name='chevron-left' color={"#fff"} size={22} />
                    </TouchableOpacity>
                    <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ml-[80px] ">Tạo mới tích lũy</Text>
                </View>
                {
                    loading ? (<View className="mt-[250px]">
                        <Loading />
                    </View>) : (<View className="px-[20px] mt-[30px] ">
                        <Formik
                            initialValues={{ saving_name: '', desc_saving: '', goal_amount: '', deadline: '', saving_date: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                                <View className="">
                                    <View className="w-full flex-col bg-white rounded-[14px] py-[30px] px-[20px] ">

                                        <View className="w-full flex-col gap-[10px] ">
                                            <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Tên tích lũy</Text>
                                            <View className={`w-full my-[20px] flex-row  items-center ${focusSavingName === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[12px] bg-white rounded-[8px]`}>
                                                <TextInput
                                                    onChangeText={handleChange('saving_name')}
                                                    onBlur={() => {
                                                        handleBlur('saving_name')
                                                        setFocusSavingName(false)
                                                    }}
                                                    value={values.saving_name}
                                                    className="text-[16px] leading-[20px] text-textColor  w-[100%]  "
                                                    onFocus={() => setFocusSavingName(true)}
                                                />
                                            </View>
                                        </View>
                                        <View className="w-full flex-col gap-[10px] ">
                                            <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Số tiền muốn tích lũy</Text>
                                            <View className={`w-full my-[20px] flex-row  items-center ${focusGoalAmount === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[12px] bg-white rounded-[8px]`}>
                                                <TextInput
                                                    onChangeText={handleChange('goal_amount')}
                                                    onBlur={() => {
                                                        handleBlur('goal_amount')
                                                        setFocusGoalAmount(false)
                                                    }}
                                                    value={values.goal_amount}
                                                    className="text-[16px] leading-[20px] text-textColor w-[100%]  "
                                                    onFocus={() => setFocusGoalAmount(true)}
                                                />
                                            </View>
                                        </View>
                                        <View className="w-full flex-col gap-[10px] ">
                                            <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Mô tả</Text>
                                            <View className={`w-full my-[20px] flex-row  items-center ${focusDescSaving === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[12px] bg-white rounded-[8px]`}>
                                                <TextInput
                                                    onChangeText={handleChange('desc_saving')}
                                                    onBlur={() => {
                                                        handleBlur('desc_saving')
                                                        setFocusDescSaving(false)
                                                    }}
                                                    value={values.desc_saving}
                                                    className="text-[16px] leading-[20px] text-textColor w-[100%]  "
                                                    onFocus={() => setFocusDescSaving(true)}
                                                />
                                            </View>
                                        </View>
                                        <View className="w-full flex-col gap-[10px] mb-[15px]">
                                            <Text className="text-[15px] leading-[22px] text-textColor font-[500] mt-[10px]">Ngày bắt đầu</Text>
                                            <View className="w-full flex flex-row justify-between">
                                                <TouchableOpacity
                                                    className="w-[30%] border border-borderColor px-[12px] py-[8px] rounded-[8px]"
                                                    activeOpacity={0.8}
                                                    onPress={() => setShowDatePickerStart(true)}
                                                >
                                                    <Text className="text-[15px] leading-[22px] text-textColor font-[500]">Chọn ngày</Text>
                                                </TouchableOpacity>
                                                <Text className="text-[14px]  leading-[20px] mt-[10px] text-textColor">
                                                    {format(selectedDateStart, "dd MMMM yyyy", { locale: vi })}
                                                </Text>
                                            </View>
                                            {showDatePickerStart && (
                                                <DateTimePicker
                                                    testID="dateTimePicker"
                                                    value={selectedDateStart}
                                                    mode="date"
                                                    display="default"
                                                    onChange={onDateChangeStart}
                                                />
                                            )}
                                        </View>
                                        <View className="w-full flex-col gap-[10px] ">
                                            <Text className="text-[15px] leading-[22px] text-textColor font-[500] mt-[10px]">Đến hạn</Text>
                                            <View className="w-full flex flex-row justify-between">
                                                <TouchableOpacity
                                                    className="w-[30%] border border-borderColor px-[12px] py-[8px] rounded-[8px]"
                                                    activeOpacity={0.8}
                                                    onPress={() => setShowDatePickerEnd(true)}
                                                >
                                                    <Text className="text-[15px] leading-[22px] text-textColor font-[500]">Chọn ngày</Text>
                                                </TouchableOpacity>
                                                <Text className="text-[14px]  leading-[20px] mt-[10px] text-textColor">
                                                    {format(selectedDateEnd, "dd MMMM yyyy", { locale: vi })}
                                                </Text>
                                            </View>
                                            {showDatePickerEnd && (
                                                <DateTimePicker
                                                    testID="dateTimePicker"
                                                    value={selectedDateEnd}
                                                    mode="date"
                                                    display="default"
                                                    onChange={onDateChangeEnd}
                                                />
                                            )}
                                        </View>
                                    </View>
                                    <ButtonCom
                                        text="Lưu"
                                        styleButton="w-full flex py-[13px] my-[50px] border border-primaryColor  rounded-[40px] "
                                        styleText="text-white text-center text-[16px] leading-[24px] font-[600] text-primaryColor"
                                        onPress={handleSubmit}
                                    />
                                </View>
                            )}
                        </Formik>
                    </View>)
                }



            </ScrollView>
        </View>
    )
}
