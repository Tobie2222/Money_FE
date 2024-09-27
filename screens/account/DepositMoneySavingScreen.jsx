import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, TextInput, Image } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome'
import {  useState } from 'react'
import { selectToken, selectUser } from '../../redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import AbstractCircle from '../../components/AbstractCircle'
import ButtonCom from '../../components/ButtonCom'
import { SelectCountry } from 'react-native-element-dropdown'
import { selectAccounts, toggleRefresh } from '../../redux/accountSlice'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import DateTimePicker from '@react-native-community/datetimepicker'
import { depositsSaving } from '../../data/Api'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CustomToast'
import { showToastU } from '../../utils/toast'
import Loading from '../../components/Loading'

const validationSchema = Yup.object().shape({})

export default function DepositMoneySavingScreen() {
    const dispatch=useDispatch()
    const token = useSelector(selectToken)
    const user = useSelector(selectUser)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const accounts = useSelector(selectAccounts)
    const navigation = useNavigation()
    const { t } = useTranslation()
    const [focusName, setFocusName] = useState(false)
    const [focusAmount, setFocusAmount] = useState(false)
    const [nameAccount, setNameAccount] = useState('')
    const [valueSelectedAccount, setValueSelectedAccount] = useState("")
    const route = useRoute()
    const { nameSaving, imageSaving,savingId } = route.params || {}


    const onDateChange = (event, selectedDate) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || new Date()
            setSelectedDate(currentDate)
        }
        setShowDatePicker(false)
    }
    const formatAccounts = (accounts) => {
        return accounts.map((acc) => (
            {
                id: acc._id,
                value: acc.account_name,
                label: acc.account_name,
                image: { uri: acc.accountType.account_type_image }
            }
        ))
    }

    console.log(valueSelectedAccount)

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            values.transaction_date = selectedDate.toISOString()
            values.amount = parseFloat(values.amount)
            console.log(values)
            const response = await depositsSaving(savingId,valueSelectedAccount,user?.user_id,values,{
                headers: {
                    token:`Bearer ${token}`
                }
            })
            if (response.status === 200) {
                console.log(response.data.message)
                setLoading(false)
                showToastU(response.data.message, "#0866ff", "check", 3000)
                dispatch(toggleRefresh())
            }
            console.log(values)
        } catch (err) {
            setLoading(false)
            if (err.response) {
                showToastU(err.response.data.message, "#EF4E4E", "warning", 3000)
            }
            console.log(err)
        }
    }

    return (
        <View className="flex-1 bg-backGroundColor">
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
                <TouchableOpacity onPress={() => navigation.navigate("savingDetailScreen")} className=" w-[28px] h-[28px]  flex items-center justify-center mr-[80px]">
                    <Icon name='chevron-left' color={"#fff"} size={22} />
                </TouchableOpacity>
                <View className=" flex flex-row items-center gap-[10px]">
                    <View className="w-[30px] h-[30px] border border-[#b2b2b2] rounded-[100px] ">
                        <Image
                            source={{ uri: `${imageSaving}` }}
                            className="object-cover w-full h-full rounded-[100px]"
                        />
                    </View>
                    <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ">{nameSaving}</Text>
                </View>
            </View>
            {
                loading ? (<View className="mt-[300px] ">
                    <Loading />
                </View>) : (<View className="px-[20px] mt-[30px] ">
                    <Formik
                        initialValues={{ name_tran: '', amount: '', transaction_date: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                            <View className="">
                                <View className="w-full flex-col bg-white rounded-[14px] py-[30px] px-[20px] ">
                                    <View className="w-full flex-col gap-[10px] ">
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Tên lần nạp</Text>
                                        <View className={`w-full my-[15px] flex-row  items-center ${focusName === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[12px] bg-white rounded-[8px]`}>
                                            <TextInput
                                                onChangeText={handleChange('name_tran')}
                                                onBlur={() => {
                                                    handleBlur('name_tran')
                                                    setFocusName(false)
                                                }}
                                                value={values.name_tran}
                                                className="text-[16px] leading-[20px] text-textColor  w-[100%]  "
                                                onFocus={() => setFocusName(true)}
                                            />
                                        </View>
                                    </View>
                                    <View className="w-full flex-col gap-[10px]">
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] mt-[10px]">Ngày</Text>
                                        <View className="w-full flex flex-row justify-between">
                                            <TouchableOpacity
                                                className="w-[32%] border border-borderColor px-[12px] py-[8px] rounded-[8px]"
                                                activeOpacity={0.8}
                                                onPress={() => setShowDatePicker(true)}
                                            >
                                                <Text className="text-[15px] leading-[22px] text-textColor font-[500]">Chọn ngày</Text>
                                            </TouchableOpacity>
                                            <Text className="text-[14px]  leading-[20px] mt-[10px] text-textColor">
                                                {format(selectedDate, "dd MMMM yyyy", { locale: vi })}
                                            </Text>
                                        </View>
                                        {showDatePicker && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={selectedDate}
                                                mode="date"
                                                display="default"
                                                onChange={onDateChange}
                                            />
                                        )}
                                    </View>
                                    <View className="w-full flex-col gap-[10px] mt-[5px]">
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Số tiền nạp vào</Text>
                                        <View className={`w-full my-[20px] flex-row  items-center ${focusAmount === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[12px] bg-white rounded-[8px]`}>
                                            <TextInput
                                                onChangeText={handleChange('amount')}
                                                onBlur={() => {
                                                    handleBlur('amount')
                                                    setFocusAmount(false)
                                                }}
                                                value={values.amount}
                                                className="text-[16px] leading-[20px] text-textColor  w-[100%]  "
                                                onFocus={() => setFocusAmount(true)}
                                            />
                                        </View>
                                    </View>
                                    <View className="w-full flex-col gap-[10px] ">
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Từ tài khoản</Text>
                                        <View className={`w-full rounded-[8px] py-[4px] overflow-hidden border border-borderColor`}>
                                            <SelectCountry
                                                style={styles.dropdown}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                placeholderStyle={styles.placeholderStyle}
                                                imageStyle={styles.imageStyle}
                                                iconStyle={styles.iconStyle}
                                                maxHeight={200}
                                                value={nameAccount}
                                                data={formatAccounts(accounts)}
                                                valueField="value"
                                                labelField="label"
                                                imageField="image"
                                                placeholder="Chọn tài khoản"
                                                searchPlaceholder="Search..."
                                                onChange={e => {
                                                    setNameAccount(e.value)
                                                    setValueSelectedAccount(e.id)
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <ButtonCom
                                    text="Nạp"
                                    styleButton="w-full flex py-[13px] my-[50px] border border-primaryColor  rounded-[40px] "
                                    styleText="text-white text-center text-[16px] leading-[24px] font-[600] text-primaryColor"
                                    onPress={handleSubmit}
                                />
                            </View>
                        )}
                    </Formik>
                </View>)
            }


        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 14,
        fontWeight: 400
    },
    dropdown: {
        height: 50,
        borderRadius: 14,
        paddingRight: 20,
        paddingLeft: 10,
        backgroundColor: "white",

    },
    placeholderStyle: {
        fontSize: 16,
        color: '#AAAAAA',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#666666',
    },
    imageStyle: {
        marginLeft: 10,
        marginRight: 10,
        width: 30,
        height: 30,
        borderRadius: 18,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#666666',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
})