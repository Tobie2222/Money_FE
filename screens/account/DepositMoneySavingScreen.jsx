import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Text, StatusBar, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome'
import TabViews from '../../components/TabViews'
import { useEffect, useState } from 'react'
import { selectToken, selectUser } from '../../redux/authSlice'
import { useSelector } from 'react-redux'
import AbstractCircle from '../../components/AbstractCircle'
import ButtonCom from '../../components/ButtonCom'
import { SelectCountry } from 'react-native-element-dropdown'
const validationSchema = Yup.object().shape({

})



export default function DepositMoneySavingScreen() {
    const navigation=useNavigation()
    const { t } = useTranslation()
    const [focusName,setFocusName]=useState()
    const [focusGender, setFocusGender] = useState(false)
    const [country, setCountry] = useState('1')
    const [valueSelected,setValueSelected]=useState("")
    console.log(valueSelected)

    const local_data = [
        {
            id: "1",
            value: '1',
            lable: 'Country 1',
            image: {
                uri: 'https://s3-alpha-sig.figma.com/img/d7f2/efb5/4ac33076f515347973bb7ed34b01735a?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NeRJGaacoozkEGoNn9KYStEAlb-1MQHobwrh5-BROzabd6FJbwza20qEUF-XYg9zhIE-FgwbEhz8MZNVgtLzl2JsHELVZEnTZEviKP0uOyzKiy-4yKsymWKFwe~9FQkjf-0DVn0Vj7y7gDG5m6FeZN9~uwvQO2uwxsnxctjmNzf5t8nQYtC2wMQLwLFBnOYlaUm-ALh9L0Bwz5cpS1oQcPqHODH8Ci1rzRf-sx13HfUo6eNO-lGBiboNj8Hx7O39RTWQ98hlATA4plzDMqus5tTrRbJvBce3kdEn~0m4E0sl~x8s9E2MEgc13bYAvUVGpVsIk4mZ1kttBglulJMk9w__',
            },
        },
        {
            id: "2",
            value: '2',
            lable: 'Country 2',
            image: {
                uri: 'https://s3-alpha-sig.figma.com/img/d7f2/efb5/4ac33076f515347973bb7ed34b01735a?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NeRJGaacoozkEGoNn9KYStEAlb-1MQHobwrh5-BROzabd6FJbwza20qEUF-XYg9zhIE-FgwbEhz8MZNVgtLzl2JsHELVZEnTZEviKP0uOyzKiy-4yKsymWKFwe~9FQkjf-0DVn0Vj7y7gDG5m6FeZN9~uwvQO2uwxsnxctjmNzf5t8nQYtC2wMQLwLFBnOYlaUm-ALh9L0Bwz5cpS1oQcPqHODH8Ci1rzRf-sx13HfUo6eNO-lGBiboNj8Hx7O39RTWQ98hlATA4plzDMqus5tTrRbJvBce3kdEn~0m4E0sl~x8s9E2MEgc13bYAvUVGpVsIk4mZ1kttBglulJMk9w__',
            },
        },
        {
            id: "3",
            value: '3',
            lable: 'Country 3',
            image: {
                uri: 'https://s3-alpha-sig.figma.com/img/d7f2/efb5/4ac33076f515347973bb7ed34b01735a?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NeRJGaacoozkEGoNn9KYStEAlb-1MQHobwrh5-BROzabd6FJbwza20qEUF-XYg9zhIE-FgwbEhz8MZNVgtLzl2JsHELVZEnTZEviKP0uOyzKiy-4yKsymWKFwe~9FQkjf-0DVn0Vj7y7gDG5m6FeZN9~uwvQO2uwxsnxctjmNzf5t8nQYtC2wMQLwLFBnOYlaUm-ALh9L0Bwz5cpS1oQcPqHODH8Ci1rzRf-sx13HfUo6eNO-lGBiboNj8Hx7O39RTWQ98hlATA4plzDMqus5tTrRbJvBce3kdEn~0m4E0sl~x8s9E2MEgc13bYAvUVGpVsIk4mZ1kttBglulJMk9w__',
            },
        },
        {
            id: "4",
            value: '4',
            lable: 'Country 4',
            image: {
                uri: 'https://s3-alpha-sig.figma.com/img/d7f2/efb5/4ac33076f515347973bb7ed34b01735a?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NeRJGaacoozkEGoNn9KYStEAlb-1MQHobwrh5-BROzabd6FJbwza20qEUF-XYg9zhIE-FgwbEhz8MZNVgtLzl2JsHELVZEnTZEviKP0uOyzKiy-4yKsymWKFwe~9FQkjf-0DVn0Vj7y7gDG5m6FeZN9~uwvQO2uwxsnxctjmNzf5t8nQYtC2wMQLwLFBnOYlaUm-ALh9L0Bwz5cpS1oQcPqHODH8Ci1rzRf-sx13HfUo6eNO-lGBiboNj8Hx7O39RTWQ98hlATA4plzDMqus5tTrRbJvBce3kdEn~0m4E0sl~x8s9E2MEgc13bYAvUVGpVsIk4mZ1kttBglulJMk9w__',
            },
        },
        {
            id: "5",
            value: '5',
            lable: 'Country 5',
            image: {
                uri: 'https://s3-alpha-sig.figma.com/img/d7f2/efb5/4ac33076f515347973bb7ed34b01735a?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NeRJGaacoozkEGoNn9KYStEAlb-1MQHobwrh5-BROzabd6FJbwza20qEUF-XYg9zhIE-FgwbEhz8MZNVgtLzl2JsHELVZEnTZEviKP0uOyzKiy-4yKsymWKFwe~9FQkjf-0DVn0Vj7y7gDG5m6FeZN9~uwvQO2uwxsnxctjmNzf5t8nQYtC2wMQLwLFBnOYlaUm-ALh9L0Bwz5cpS1oQcPqHODH8Ci1rzRf-sx13HfUo6eNO-lGBiboNj8Hx7O39RTWQ98hlATA4plzDMqus5tTrRbJvBce3kdEn~0m4E0sl~x8s9E2MEgc13bYAvUVGpVsIk4mZ1kttBglulJMk9w__',
            },
        },
    ]

    const handleSubmit = async (values) => {
        //setLoading(true)
        try {
            // const response = await changePassword(values)
            // if (response.status === 200) {
            //     console.log(response.data.message)
            //     showToastU(response.data.message, "#0866ff", "check", 3000)
            //     setLoading(false)
            //     // await removeData("dataSave")
            //     // setLoading(false)
            //     // navigation.navigate('startScreen')
            // }
            // console.log(values)
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
        <View className="flex-1 bg-backGroundColor">
            <StatusBar
                barStyle="dark"
            />
            <AbstractCircle />
            <View className="flex-row items-center mt-[80px] mb-[40px] w-full px-[25px] ">
                <TouchableOpacity onPress={() => navigation.navigate("savingDetailScreen")} className=" w-[28px] h-[28px]  flex items-center justify-center mr-[80px]">
                    <Icon name='chevron-left' color={"#fff"} size={22} />
                </TouchableOpacity>
                <View className=" flex flex-row items-center gap-[10px]">
                    <View className="w-[30px] h-[30px] border border-[#b2b2b2] rounded-[100px] ">
                        <Image
                            source={{ uri: `https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg` }}
                            className="object-cover w-full h-full rounded-[100px]"
                        />
                    </View>
                    <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ">Tích lũy 1</Text>
                </View>
            </View>
            <View className="px-[20px] mt-[30px] ">
                    <Formik
                        initialValues={{ email: '', name: '', sex: '', image: null }}
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
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Số tiền</Text>
                                        <View className={`w-full my-[20px] flex-row  items-center ${focusName === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[12px] bg-white rounded-[8px]`}>
                                            <TextInput
                                                onChangeText={handleChange('name')}
                                                onBlur={() => {
                                                    handleBlur('name')
                                                    setFocusName(false)
                                                }}
                                                value={values.name}
                                                className="text-[16px] leading-[20px] text-textColor  w-[100%]  "
                                                onFocus={() => setFocusName(true)}
                                            />
                                        </View>
                                    </View>
                                    <View className="w-full flex-col gap-[10px] ">
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Từ tài khoản</Text>
                                        <View className={`w-full rounded-[14px] border ${focusGender ? "border-primaryColor" : " border-borderColor "}`}>
                                        <SelectCountry
                                                style={styles.dropdown}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                placeholderStyle={styles.placeholderStyle}
                                                imageStyle={styles.imageStyle}
                                                iconStyle={styles.iconStyle}
                                                maxHeight={200}
                                                value={country}
                                                data={local_data}
                                                valueField="value"
                                                labelField="lable"
                                                imageField="image"
                                                placeholder="Select country"
                                                searchPlaceholder="Search..."
                                                onChange={e => {
                                                    setCountry(e.value)
                                                    setValueSelected(e.id)
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
                </View>
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