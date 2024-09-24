import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Text, StatusBar, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useEffect, useState } from 'react'
import { selectToken, selectUser } from '../../redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import AbstractCircle from '../../components/AbstractCircle'
import { SelectCountry } from 'react-native-element-dropdown'
import ButtonCom from '../../components/ButtonCom'
import { createAccount, getAllAccountType } from '../../data/Api'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CustomToast'
import { showToastU } from '../../utils/toast'
import Loading from '../../components/Loading'
import { toggleRefresh } from '../../redux/accountSlice'

const validationSchema = Yup.object().shape({})


export default function CreateAccountScreen() {
    const dispatch=useDispatch()
    const navigation = useNavigation()
    const { t } = useTranslation()
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)
    const [accountTypes, setAllAccountTypes] = useState([])
    const [focusAccount, setFocusAccount] = useState(false)
    const [focusDesc, setFocusDesc] = useState(false)
    const [focusBalance, setFocusBalance] = useState(false)

    const [accountType, setAccountType] = useState('')
    const [valueSelected, setValueSelected] = useState("")
    console.log(valueSelected)

    const formatAccountType = (accTypes) => {
        return accTypes.map((accType) => (
            {
                id: accType._id,
                value: accType.account_type_name,
                label: accType.account_type_name,
                image: { uri: accType.account_type_image }
            }
        ))
    }


    //fetching account type
    useEffect(() => {
        const getAllAccountsTypes = async () => {
            try {
                const response = await getAllAccountType(user?.id, {
                    headers: {
                        token: `bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    console.log(response.data)
                    const formattedAccountType = formatAccountType(response.data.allAccountType)
                    console.log(formattedAccountType)
                    setAllAccountTypes(formattedAccountType)
                    if (formattedAccountType.length > 0) {
                        setAccountType(formattedAccountType[0].value)
                        setValueSelected(formattedAccountType[0].id)
                    }
                }
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
        }
        if (token) {
            getAllAccountsTypes()
        }
    }, [token])


    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            console.log(values)
            const response = await createAccount(valueSelected, user?.id, values,{
                headers: {
                    token: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                console.log(response.data.message)
                showToastU(response.data.message, "#438883", "check", 3000)
                setLoading(false)
                dispatch(toggleRefresh())
            }
        } catch (err) {
            setLoading(false)
            setError(true)
            if (err.response) {
                setMessage(err.response.data.message)
                showToastU(err.response.data.message, "#EF4E4E", "warning", 3000)
            }
            console.log(err)
        }
    }

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
                    <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ml-[60px] ">Tạo tài khoản mới</Text>
                </View>
                <View className="px-[20px] mt-[30px] ">
                    {
                        loading ? ( <Loading />) : (<Formik
                            initialValues={{ account_name: '', desc_account: '', balance: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                                <View className="">
                                    <View className="w-full flex-col bg-white rounded-[14px] py-[30px] px-[20px] ">
                                        {/* {(touched.newPassword && errors.newPassword) || (touched.confirmNewPassword && errors.confirmNewPassword) || (error && message) ? (
                                        <View className="w-full flex-row items-center justify-center bg-backGroundColorWarning mb-[15px] py-[10px] rounded-[12px]">
                                            <Icon name="exclamation-circle" size={20} color="#EF4E4E" />
                                            <Text className="text-warningColor ml-[10px]">
                                                {errors.newPassword || errors.confirmNewPassword || message}
                                            </Text>
                                        </View>
                                    ) : null} */}
                                        <View className="w-full flex-col gap-[10px] mt-[5px]">
                                            <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Tên ví</Text>
                                            <View className={`w-full my-[20px] flex-row  items-center ${focusAccount === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[12px] bg-white rounded-[8px]`}>
                                                <TextInput
                                                    onChangeText={handleChange('account_name')}
                                                    onBlur={() => {
                                                        handleBlur('account_name')
                                                        setFocusAccount(false)
                                                    }}
                                                    value={values.account_name}
                                                    className="text-[16px] leading-[20px] text-textColor  w-[100%]  "
                                                    onFocus={() => setFocusAccount(true)}
                                                />
                                            </View>
                                        </View>
                                        <View className="w-full flex-col gap-[10px] ">
                                            <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Mô tả</Text>
                                            <View className={`w-full my-[20px] flex-row  items-center ${focusDesc === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[12px] bg-white rounded-[8px]`}>
                                                <TextInput
                                                    onChangeText={handleChange('desc_account')}
                                                    onBlur={() => {
                                                        handleBlur('desc_account')
                                                        setFocusDesc(false)
                                                    }}
                                                    value={values.desc_account}
                                                    className="text-[16px] leading-[20px] text-textColor w-[100%]  "
                                                    onFocus={() => setFocusDesc(true)}
                                                />
                                            </View>
                                        </View>
                                        <View className="w-full flex-col gap-[10px] ">
                                            <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Số tiền</Text>
                                            <View className={`w-full my-[20px] flex-row  items-center ${focusBalance === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[12px] bg-white rounded-[8px]`}>
                                                <TextInput
                                                    onChangeText={handleChange('balance')}
                                                    onBlur={() => {
                                                        handleBlur('balance')
                                                        setFocusBalance(false)
                                                    }}
                                                    value={values.balance}
                                                    className="text-[16px] leading-[20px] text-textColor w-[100%]  "
                                                    onFocus={() => setFocusBalance(true)}
                                                />
                                            </View>
                                        </View>
                                        <View className="w-full flex-col gap-[10px] ">
                                            <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Loại tài khoản</Text>
                                            <View className="w-full rounded-[14px] border border-borderColor">
                                                <SelectCountry
                                                    style={styles.dropdown}
                                                    selectedTextStyle={styles.selectedTextStyle}
                                                    placeholderStyle={styles.placeholderStyle}
                                                    imageStyle={styles.imageStyle}
                                                    iconStyle={styles.iconStyle}
                                                    maxHeight={200}
                                                    value={accountType}
                                                    data={accountTypes}
                                                    valueField="value"
                                                    labelField="label"
                                                    imageField="image"
                                                    placeholder="Chọn loại tài khoản"
                                                    searchPlaceholder="Search..."
                                                    onChange={e => {
                                                        setAccountType(e.value)
                                                        setValueSelected(e.id)
                                                    }}
                                                />
                                            </View>
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
                        </Formik>)
                    }

                </View>
            </ScrollView>
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
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
})