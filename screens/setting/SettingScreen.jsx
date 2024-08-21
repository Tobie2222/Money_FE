import { View, StyleSheet, Image, Text, StatusBar, ScrollView, TouchableOpacity, Modal } from 'react-native'
import { jwtDecode } from 'jwt-decode'
import AbstractCircle from '../../components/AbstractCircle'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useEffect, useState } from 'react'
import ButtonCom from '../../components/ButtonCom'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectIsAuthenticated, selectToken, selectUser } from '../../redux/authSlice'
import { removeData } from '../../utils/storage'
import Loading from '../../components/Loading'
import { useTranslation } from 'react-i18next'


const func = [
    { nameIcon: "user", title: "Chỉnh sửa trang cá nhân", typeFunc: "EditUser" },
    { nameIcon: "user", title: "Đăng xuất", typeFunc: "Logout" },
    { nameIcon: "user", title: "Đổi mật khẩu", typeFunc: "ChangePassword" },
    { nameIcon: "user", title: "Thay đổi ngôn ngữ", typeFunc: "ChangeLanguage" },
    { nameIcon: "user", title: "Chọn loại tiền tệ", typeFunc: "ChangeMoney" },
    { nameIcon: "user", title: "Danh mục chi tiêu", typeFunc: "ChangeCategoriesExpense" },
    { nameIcon: "user", title: "Danh mục thu nhập", typeFunc: "ChangeCategoriesIncome" },
    { nameIcon: "bell", title: "Trang quản trị", typeFunc: "navigateAdminPage" },
]


export default function SettingScreen() {
    const {t}=useTranslation()
    const [modalVisible, setModalVisible] = useState(false)
    const token = useSelector(selectToken)
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        if (isAuthenticated && token) {
            const decoded = jwtDecode(token)
            setAdmin(decoded.isAdmin)
        }
    },
        [isAuthenticated])



    const handleLogout = async () => {
        try {
            dispatch(logout())
            setLoading(true)
            await removeData()
            navigation.navigate('startScreen')
        } catch (err) {
            console.log(err)
        }
    }
    const functionChose = {
        EditUser: () => {
            //navigation.navigate('EditUser')
        },
        Logout: () => { setModalVisible(true) },
        ChangePassword: () => {
            console.log("click 1")
            //navigation.navigate('ChangePassword')
        },
        ChangeLanguage: () => {
            console.log("click 1")
            //navigation.navigate('ChangeLanguage')
        },
        ChangeMoney: () => {
            console.log("click 1")
            //navigation.navigate('ChangeMoney')
        },
        ChangeCategoriesExpense: () => {
            console.log("click 1")
            //navigation.navigate('ChangeCategoriesExpense')
        },
        ChangeCategoriesIncome: () => {
            console.log("click 1")
            //navigation.navigate('ChangeCategoriesIncome')
        },
        navigateAdminPage: () => {
            console.log("click 1")
            //navigation.navigate('ChangeCategoriesIncome')
        }
    }
    const choseFun = (typeFunc) => {
        if (functionChose[typeFunc]) {
            functionChose[typeFunc]()
        } else {
            console.log(`Function ${typeFunc} not defined`)
        }
    }

    return (
        <View className="flex-1">
            {
                loading === true ? (<Loading color='#438883' />) : (
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                        >
                            <View className="flex-1 justify-center items-center">
                                {/* black overlay */}
                                <View className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"></View>
                                <View className="w-[300px] p-[20px] bg-white rounded-[18px] z-10">
                                    <Text className="text-center font-[600] text-[16px] text-textColor ">Bạn có muốn đăng xuất ?</Text>
                                    <View className="flex-col mt-[20px] ">
                                        <ButtonCom
                                            text="Đăng xuất"
                                            styleButton="w-full py-[13px] mx-auto bg-warningColor rounded-[18px] "
                                            styleText="text-white text-[16px] leading-[24px] font-[700] text-center"
                                            onPress={handleLogout}
                                        />
                                        <ButtonCom
                                            text="Quay lại"
                                            styleButton="w-full py-[13px] mt-[10px]  mx-auto bg-primaryColor rounded-[18px] "
                                            styleText="text-white text-[16px] leading-[24px] font-[700] text-center"
                                            onPress={() => setModalVisible(false)}
                                        />
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <StatusBar
                            barStyle="light-content"
                        />
                        <ScrollView className="">
                            <AbstractCircle
                                shadowS={styles.shadowX}
                            />
                            <View className="px-[20px]">
                                <Image
                                    source={{ uri: `${user?.avatar}` }}
                                    className="w-[100px] h-[100px] mt-[280px] rounded-[200px] border border-borderColor mx-auto object-cover "
                                    style={styles.shadowX}
                                />
                                <Text className="text-center text-[22px] font-[600] text-textColor mt-[10px] leading-[33px] ">{user?.name}</Text>
                                <Text className="text-center text-[16px] font-[600] text-primaryColor leading-[24px] ">{user?.email}</Text>
                                <View className="w-full mt-[25px] bg-white mx-auto rounded-[8px] py-[12px] px-[20px]" style={styles.shadowS}>
                                    <View className="flex-row items-center gap-[15px] ">
                                        <View className="h-[45px] w-[45px] rounded-[200px] border-[2px] border-primaryColor flex-row items-center justify-center">
                                            <Image
                                                source={{ uri: "https://s3-alpha-sig.figma.com/img/4fb3/cea4/2af90e1573bb9b5163aec628ea81185d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DA4WMfM2WMHgH1qWGikk3z0R2OXW4jXVfqZxFjQveQlUMjV8gsQ8iG4tdqUTDENHju3mQzmIP~KVUfpNe8p98aO1WPGJi9JMeHYqccEmpasxowowK8BTaepVLrkb7XS0VCTz7Y-p7A28h88PC~ZVERoXKA6UrO8sBgxmj~AwjW0QoAToe7gpzrV5aYnEuFSB1u8DBTIMeHR3ndZoU9DDlvmL5PeXlZEqWkr5OZdsRRrRxijPnoQ8xuxNHbzalzTq7ZvZ8JMQMlX~g08m2fnOr96f-MYOSqGFzR61GFAxg0~H5mWxRoQ~qxh9AoIMKBxylq87sOONfWx1BXNBooj4Fw__" }}
                                                className="w-[27px] h-[22px] object-cover "
                                            />
                                        </View>
                                        <Text className="text-textColor text-[16px] leading-[21] font-[500]">Mua Bản premium</Text>
                                    </View>
                                </View>
                                <Text className="text-[14px] font-[600] text-textColor my-[15px] leading-[21px] ">Xem thêm</Text>
                                <View className="w-full bg-white mx-auto rounded-[8px] pb-[12px] px-[20px] mb-[30px]" style={styles.shadowS}>
                                    {
                                        func
                                            .filter((fun) => (admin && fun.typeFunc === "navigateAdminPage") || (fun.typeFunc !== "navigateAdminPage"))
                                            .map((fun, index) => {
                                                return (
                                                    <TouchableOpacity onPress={() => choseFun(fun.typeFunc)} activeOpacity={0.8} key={index} className="flex-row items-center gap-[15px] mt-[1px] ">
                                                        <View className="h-[45px] w-[45px] rounded-[200px] bg-[#F3F2FB] border-[2px] border-primaryColor flex-row items-center justify-center">
                                                            <Icon name={`${fun.nameIcon}`} size={18} color="#438883" />
                                                        </View>
                                                        <Text className="text-textColor text-[16px] leading-[21] font-[500]">{fun.title}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                    }
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                )
            }

        </View>
    )
}

const styles = StyleSheet.create({
    shadowX: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
    }, shadowS: {
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 10,
    },
    icon: {
        fontSize: 22,
        fontWeight: 400
    },

})
