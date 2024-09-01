import { View, TouchableOpacity, Text, StatusBar, TextInput, ScrollView, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AbstractCircle from '../../components/AbstractCircle'
import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import ButtonCom from '../../components/ButtonCom'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { selectToken, selectUser } from '../../redux/authSlice'
import { useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CutomToast'
import Loading from '../../components/Loading'
import { SelectCountry, SelectnameCat } from 'react-native-element-dropdown'
import { getAllCatExpense, getAllCatIncome } from '../../data/Api'
import { showToastU } from '../../utils/toast'

const selectFun = [
    { id: 0, title: "Chi tiền", nameIcon: "plus" },
    { id: 1, title: "Thu tiền", nameIcon: "minus" },
]


const validationSchema = Yup.object().shape({})

export default function TransactionScreen() {
    const navigation = useNavigation()
    const token = useSelector(selectToken)
    const user = useSelector(selectUser)
    const [loading, setLoading] = useState(false)
    const [cats, setCats] = useState([])
    const { t } = useTranslation()
    const [func, setFunc] = useState("Chi tiền")
    const [focusEmail, setFocusEmail] = useState(false)
    const [hiddenModal, setHiddenModal] = useState(false)
    const [focusGender, setFocusGender] = useState(false)
    const [accounts, setAccounts] = useState([])

    const [nameCat, setNameCat] = useState('')
    const [valueSelected, setValueSelected] = useState("")

    const formatCategories = (categories) => {
        return categories.map((cat) => {
            if (func === "Thu tiền") {
                return {
                    id: cat._id,
                    value: cat.income_type_name,
                    label: cat.income_type_name,
                    image: { uri: cat.income_type_image }
                }
            } else {
                return {
                    id: cat._id,
                    value: cat.categories_name,
                    label: cat.categories_name,
                    image: { uri: cat.categories_image }
                }
            }
        })
    }


    //fetch cat expense and income and account
    useEffect(() => {
        //fetching all Account
        const getAllAccounts = async () => {
            setLoading(true)
            try {
                const response = await getAllAccounts(user?.id, {
                    headers: {
                        token: `bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setLoading(false)
                    setAccounts(response.data.allAccountByUser)
                }
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
        }
        const getAllCategoriesExpenses = async () => {
            setLoading(true)
            try {
                const response = await getAllCatExpense(user?.id, {
                    headers: {
                        token: `bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setLoading(false)
                    const formattedCategories = formatCategories(response.data.allCategories)
                    setCats(formattedCategories)
                    if (formattedCategories.length > 0) {
                        setNameCat(formattedCategories[0].value)
                        setValueSelected(formattedCategories[0].id)
                    }
                }
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
        }
        const getAllCategoriesIncomes = async () => {
            setLoading(true)
            try {
                const response = await getAllCatIncome(user?.id, {
                    headers: {
                        token: `bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setLoading(false)
                    const formattedCategories = formatCategories(response.data.allInComeType)
                    setCats(formattedCategories)
                    if (formattedCategories.length > 0) {
                        setNameCat(formattedCategories[0].value)
                        setValueSelected(formattedCategories[0].id)
                    }
                }
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
        }
        if (token && func === "Chi tiền") {
            getAllCategoriesExpenses()
        } else {
            getAllCategoriesIncomes()
        }
    }, [token, func])



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
            <View className="z-20">
                <Toast
                    config={{
                        custom_toast: (internalState) => <CustomToast {...internalState} />
                    }}
                />
            </View>
            {
                hiddenModal && (
                    <View className="absolute w-full h-[84%] left-0 bottom-0 ">
                        <View className="w-full h-full relative ">
                            <View className="bg-white w-full h-auto px-[20px] pt-[15px] rounded-b-[20px] absolute top-0 left-0 z-20 ">
                                {
                                    selectFun.map((fun) => {
                                        return (
                                            <TouchableOpacity key={fun.id} activeOpacity={0.8} onPress={() => { setFunc(fun.title); setHiddenModal(false) }} className="flex-row items-center gap-[20px] mb-[15px]">
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
            {
                func === "Chi tiền" ? (<ScrollView className="z-[-1] mt-[15px]">
                    <Formik
                        initialValues={{ transaction_name: '', desc_transaction: '', amount: 0, transaction_date: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleLogin(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View className="w-[358px] mt-[60px] mx-auto rounded-[14px] ">
                                <View className="w-full flex-col bg-white rounded-[14px] py-[30px] px-[20px] ">
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
                                    {/* <View className="w-full flex-col gap-[10px] mt-[5px] ">
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Chọn tài khoản</Text>
                                        <View className={`w-full rounded-[8px] py-[4px] overflow-hidden border ${focusGender ? "border-primaryColor" : " border-borderColor "}`}>
                                        <SelectCountry
                                                style={styles.dropdown}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                placeholderStyle={styles.placeholderStyle}
                                                imageStyle={styles.imageStyle}
                                                iconStyle={styles.iconStyle}
                                                maxHeight={200}
                                                value={nameCat}
                                                data={local_data}
                                                valueField="value"
                                                labelField="lable"
                                                imageField="image"
                                                placeholder="Chọn loại nguồn thu"
                                                searchPlaceholder="Search..."
                                                onChange={e => {
                                                    setNameCat(e.value)
                                                    setValueSelected(e.id)
                                                }}
                                            />
                                        </View>
                                    </View> */}
                                    <View className="w-full flex-col gap-[10px] mt-[5px] ">
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Loại nguồn chi</Text>
                                        <View className={`w-full rounded-[8px] py-[4px] overflow-hidden border ${focusGender ? "border-primaryColor" : " border-borderColor "}`}>
                                            <SelectCountry
                                                style={styles.dropdown}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                placeholderStyle={styles.placeholderStyle}
                                                imageStyle={styles.imageStyle}
                                                iconStyle={styles.iconStyle}
                                                maxHeight={200}
                                                value={nameCat}
                                                data={cats}
                                                valueField="value"
                                                labelField="label"
                                                imageField="image"
                                                placeholder="Select nameCat"
                                                searchPlaceholder="Search..."
                                                onChange={e => {
                                                    setNameCat(e.value)
                                                    setValueSelected(e.id)
                                                }}
                                            />
                                        </View>
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
                </ScrollView>) : (
                    <ScrollView className="z-[-1] mt-[15px]">
                        <Formik
                            initialValues={{ transaction_name: '', desc_transaction: '', amount: 0 }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => handleLogin(values)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View className="w-[358px] mt-[60px] mx-auto rounded-[14px] ">
                                    <View className="w-full flex-col bg-white rounded-[14px] py-[30px] px-[20px] ">
                                        {/* {(touched.email && errors.email) || (touched.password && errors.password) || (error && message) ? (
                                            <View className="w-full flex-row items-center justify-center bg-backGroundColorWarning mb-[15px] py-[10px] rounded-[12px]">
                                                <Icon name="exclamation-circle" size={20} color="#EF4E4E" />
                                                <Text className="text-warningColor ml-[10px]">
                                                    {errors.email || errors.password || message}
                                                </Text>
                                            </View>
                                        ) : null} */}
                                        <View className="w-full flex-col gap-[10px] ">
                                            <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Tên khoản thu</Text>
                                            <TextInput
                                                onChangeText={handleChange('transaction_name')}
                                                // onBlur={() => {
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
                                                // onBlur={() => {
                                                //     handleBlur('email')
                                                //     setFocusEmail(false)
                                                // }}
                                                value={values.amount}
                                                className="text-[16px] leading-[20px] w-full text-textColor border-[1.4px] border-borderColor px-[20px] py-[15px] rounded-[8px] "
                                                onFocus={() => setFocusEmail(true)}
                                            />
                                        </View>
                                        <View className="w-full flex-col gap-[10px] mt-[5px]">
                                            <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Mô tả khoản thu</Text>
                                            <TextInput
                                                onChangeText={handleChange('desc_transaction')}
                                                // onBlur={() => {
                                                //     handleBlur('email')
                                                //     setFocusEmail(false)
                                                // }}
                                                value={values.desc_transaction}
                                                className="text-[16px] leading-[20px] w-full text-textColor border-[1.4px] border-borderColor px-[20px] py-[15px] rounded-[8px] "
                                                onFocus={() => setFocusEmail(true)}
                                            />
                                        </View>
                                        <View className="w-full flex-col gap-[10px] mt-[5px] ">
                                            <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Loại nguồn thu</Text>
                                            <View className={`w-full rounded-[8px] py-[4px] overflow-hidden border ${focusGender ? "border-primaryColor" : " border-borderColor "}`}>
                                                <SelectCountry
                                                    style={styles.dropdown}
                                                    selectedTextStyle={styles.selectedTextStyle}
                                                    placeholderStyle={styles.placeholderStyle}
                                                    imageStyle={styles.imageStyle}
                                                    iconStyle={styles.iconStyle}
                                                    maxHeight={200}
                                                    value={nameCat}
                                                    data={cats}
                                                    valueField="value"
                                                    labelField="label"
                                                    imageField="image"
                                                    placeholder="Select nameCat"
                                                    searchPlaceholder="Search..."
                                                    onChange={e => {
                                                        setNameCat(e.value)
                                                        setValueSelected(e.id)
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View className="w-full flex-col gap-[10px] mt-[5px]">
                                            <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Từ tài khoản</Text>
                                            <TextInput
                                                onChangeText={handleChange('email')}
                                                // onBlur={() => {
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
                                        text="Tạo mới khoản thu"
                                        styleButton="w-full flex py-[13px] mt-[30px] border border-primaryColor mb-[30px] rounded-[40px] "
                                        styleText="text-white text-center text-[16px] leading-[24px] font-[600] text-primaryColor"
                                        onPress={handleSubmit}
                                    />
                                </View>

                            )}
                        </Formik>
                    </ScrollView>
                )
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
        borderRadius: 8,
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
        width: 40,
        height: 40,
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