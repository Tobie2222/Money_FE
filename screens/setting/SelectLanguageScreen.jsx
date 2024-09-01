import { View, StyleSheet, Image, Text, StatusBar, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native'
import { useTranslation } from 'react-i18next'
import Loading from '../../components/Loading'
import { Formik } from 'formik'
import * as Yup from 'yup'
import AbstractCircle from '../../components/AbstractCircle'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ButtonCom from '../../components/ButtonCom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/authSlice'
import { changePassword } from '../../data/Api'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CutomToast'
import { showToastU } from '../../utils/toast'

export default function SelectLanguageScreen() {
    const user = useSelector(selectUser)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const navigation = useNavigation()
    const { i18n, t } = useTranslation()
    const languages = [
        { id: 0, label: "Tiếng Việt", value: 'vi', image: "https://media.istockphoto.com/id/464516754/vi/vec-to/qu%E1%BB%91c-k%E1%BB%B3-vi%E1%BB%87t-nam.jpg?s=612x612&w=0&k=20&c=20_fpqn2SzR-BYCcTgc77EuiudsNnh1c0mVXVJzSNbk=" },
        { id: 1, label: "Tiếng Anh", value: 'en', image: "https://file.hstatic.net/200000495037/file/5_400x300_0467d536c95c4d888d277275d871470e.jpg" }
    ]
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
            <View className="w-full h-[150px] px-[25px] bg-primaryColor flex-row items-center ">
                <TouchableOpacity onPress={() => navigation.navigate("settingScreen")} className=" w-[28px] h-[28px]  flex items-center justify-center">
                    <Icon name='chevron-left' color={"#fff"} size={22} />
                </TouchableOpacity>
                <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ml-[70px] ">Lựa chọn ngôn ngữ</Text>
            </View>
            <View className="mt-[20px] px-[20px]">
                <View className="bg-white rounded-[8px] shadow-sm px-[20px] pb-[20px] flex flex-col " >
                    {
                        languages.map((language) => {
                            return (
                                <TouchableOpacity activeOpacity={0.8} onPress={() => { i18n.changeLanguage(language.value); showToastU("Thay đổi ngôn ngữ thành công", "#0866ff", "check", 3000) }} key={language.id} className="flex flex-row items-center justify-between mt-[20px]">
                                    <View className="flex flex-row items-center gap-[10px]">
                                        <Image
                                            className="object-cover w-[50px] h-[34px] rounded-[4px]"
                                            source={{ uri: `${language.image}` }}
                                        />
                                        <Text>{language.label}</Text>
                                    </View>
                                    <Icon name='chevron-right' color={"#AAAAAA"} size={20} />
                                </TouchableOpacity>
                            )
                        })
                    }

                </View>
                <ButtonCom
                    text="Thay đổi ngôn ngữ"
                    styleButton="w-full flex py-[13px] mt-[50px] border border-primaryColor mb-[30px] rounded-[40px] "
                    styleText="text-white text-center text-[16px] leading-[24px] font-[600] text-primaryColor"
                    onPress={() => { }}
                />
            </View>
        </View>
    )
}
