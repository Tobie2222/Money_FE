import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Text, StatusBar, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useState } from 'react'
import { selectUser } from '../../redux/authSlice'
import { useSelector } from 'react-redux'
import AbstractCircle from '../../components/AbstractCircle'
import ButtonCom from '../../components/ButtonCom'



import * as ImagePicker from "expo-image-picker"




const validationSchema = Yup.object().shape({

})
export default function CreateSaving() {
    const [avatar, setAvatar] = useState("https://timo.vn/wp-content/uploads/cach-chi-tieu-hop-ly-voi-muc-luong-6-trieu.jpg")
    const navigation = useNavigation()
    const { t } = useTranslation()
    const user = useSelector(selectUser)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [focusName, setFocusName] = useState(false)
    const [focusEmail, setFocusEmail] = useState(false)
    const [focusGender, setFocusGender] = useState(false)
    const upLoadImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') {
                return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            })
            if (!result.canceled) {
                setAvatar(result.assets[0].uri)
            }
        } catch (err) {
            console.log(err)
        }
    }
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
        <View className="flex-1">

            <StatusBar
                barStyle="dark"
            />
            <ScrollView>
                <AbstractCircle />
                <View className="flex-row items-center mt-[80px] mb-[40px] w-full px-[25px] ">
                    <TouchableOpacity onPress={() => navigation.navigate("accountScreen")} className=" w-[28px] h-[28px]  flex items-center justify-center">
                        <Icon name='chevron-left' color={"#fff"} size={22} />
                    </TouchableOpacity>
                    <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ml-[80px] ">Tạo mới tích lũy</Text>
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
                                    <View className="w-full flex-col gap-[10px] ">
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Tên ví</Text>
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
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Số tiền</Text>
                                        <View className={`w-full my-[20px] flex-row  items-center ${focusEmail === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[12px] bg-white rounded-[8px]`}>
                                            <TextInput
                                                onChangeText={handleChange('email')}
                                                onBlur={() => {
                                                    handleBlur('email')
                                                    setFocusEmail(false)
                                                }}
                                                value={values.email}
                                                className="text-[16px] leading-[20px] text-textColor w-[100%]  "
                                                onFocus={() => setFocusEmail(true)}
                                            />
                                        </View>
                                    </View>
                                    <View className="w-full flex-col gap-[10px] ">
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Mô tả</Text>
                                        <View className={`w-full my-[20px] flex-row  items-center ${focusEmail === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[12px] bg-white rounded-[8px]`}>
                                            <TextInput
                                                onChangeText={handleChange('email')}
                                                onBlur={() => {
                                                    handleBlur('email')
                                                    setFocusEmail(false)
                                                }}
                                                value={values.email}
                                                className="text-[16px] leading-[20px] text-textColor w-[100%]  "
                                                onFocus={() => setFocusEmail(true)}
                                            />
                                        </View>
                                    </View>
                                    <View className="w-full flex-col gap-[10px] ">
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Hạn</Text>
                                        <View className={`w-full my-[20px] flex-row  items-center ${focusEmail === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[12px] bg-white rounded-[8px]`}>
                                            <TextInput
                                                onChangeText={handleChange('email')}
                                                onBlur={() => {
                                                    handleBlur('email')
                                                    setFocusEmail(false)
                                                }}
                                                value={values.email}
                                                className="text-[16px] leading-[20px] text-textColor w-[100%]  "
                                                onFocus={() => setFocusEmail(true)}
                                            />
                                        </View>
                                    </View>
                                    <View className="w-full flex-col gap-[10px] ">
                                        <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Ảnh </Text>
                                        <TouchableOpacity activeOpacity={0.8} onPress={upLoadImage} className="w-full h-auto border-[4px] border-primaryColor py-[30px] rounded-[25px] flex-row items-center justify-center">
                                            <View className="w-[100px] h-[100px]">
                                                {
                                                    avatar !== "" ? (<Image source={{ uri: `${avatar}` }} className="w-full h-full object-cover " />) : (<Icon name='chevron-left' color={"#fff"} size={22} />)
                                                }
                                            </View>
                                        </TouchableOpacity>
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
        paddingHorizontal: 20,
        backgroundColor: "white",
        marginTop: 2
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