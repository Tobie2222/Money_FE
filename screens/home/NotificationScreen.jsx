import { View, Text, StatusBar, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AbstractCircle from '../../components/AbstractCircle'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { showToastU } from '../../utils/toast'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CutomToast'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken, selectUser } from '../../redux/authSlice'
import { deleteNotification, tickNotification } from '../../data/Api'
import { selectRefresh, toggleRefresh } from '../../redux/accountSlice'
import { selectNotification } from '../../redux/notificationSlice'
import Loading from '../../components/Loading'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

export default function NotificationScreen() {
    const dispatch = useDispatch()
    const notifications = useSelector(selectNotification)
    const [openNotificationId, setOpenNotificationId] = useState(null)
    // const [tickId, setTickId] = useState(null)
    const [loading, setLoading] = useState(false)
    const token = useSelector(selectToken)
    const user = useSelector(selectUser)
    const navigation = useNavigation()
    const { t } = useTranslation()

    const handleTickNotification = async (id) => {
        try {
            console.log(id)
            const response = await tickNotification(id, user?.id, {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            console.log(`Request URL: ${response.request.url}`)
            console.log(`Response status: ${response.status}`)
            console.log(response.data);   
            // if (response.status === 200) {
            //     console.log("Thành công");
            //     setOpenNotificationId(null);
            //     dispatch(toggleRefresh());
            // } else {
            //     console.log("Lỗi response:", response.status);
            // }
        } catch (err) {
            console.log("Lỗi khi đánh dấu là đã đọc:", err) 
        } finally {
            setLoading(false)
        }
    }
    const handelDeleteNotification = async (id) => {
        setLoading(true)
        try {
            console.log(openNotificationId)
            const response = await deleteNotification(openNotificationId, user?.id, {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                showToastU(response.data.message, "#0866ff", "check", 3000)
                setOpenNotificationId(null)
                dispatch(toggleRefresh())
            }
        } catch (err) {
            console.log("Lỗi khi xóa thông báo:", err) // log error
        } finally {
            setLoading(false)
        }
    }
    return (
        <View className="flex-1" >
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
                <TouchableOpacity onPress={() => navigation.navigate("homeScreen")} className=" w-[28px] h-[28px]  flex items-center justify-center">
                    <Icon name='chevron-left' color={"#fff"} size={22} />
                </TouchableOpacity>
                <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ml-[100px] ">Thông báo</Text>
            </View>
            {
                notifications.length === 0 ? (<ScrollView className="w-full h-full bg-white rounded-t-[36px] px-[20px] py-[25px]">
                    <View className="">
                        <Text className="text-[20px] text-center text-textColor font-[600] mt-[100px] ">Không có thông báo nào</Text>
                        <Image
                            className="w-[200px] h-[200px] mx-auto mt-[40px] object-cover"
                            source={{ uri: "https://s3-alpha-sig.figma.com/img/e224/311e/ad4282c1095acb9f0a249e6846fc58a6?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=o79vKFqjKxvscW6fpTzuJcgXi2YXmJks38nJJxlwwE-msUQqaZEPXSjjiF3NZqCcDG1KbbF8yXtBb9dAho4LYMi53Qy07pgbY3t25SFu0qgKAAIocjbOafGTxe5LSkGGbvzHD~4Zz2yWnPc2cSoaJ6S1yTJ-bC7OC7UDVEpw19nJp6eylQ0rJtn5jBDidlPTFeJ0xm-k7C0925NYFHFV5y2df-4Ej3jYPVxY7M9N~885~uOCdD1yrATnueLdQZ8c2emEqPtptDeV-kwtzzG~g90m3cYjL3yH28MSbPfrkHik7ddqKfEl2C4RXtem5OiJa5w1ZxQwk1wsuxjrKZe6VA__" }}
                        />
                    </View>
                </ScrollView>
                ) : (<ScrollView className="w-full h-full bg-[#F5F4FB] px-[20px] pb-[40px]">
                    {
                        loading ? (<View className="mt-[200px]"><Loading /></View>) : (<View>
                            {
                                notifications.map((notification, index) => {
                                    return (
                                        <View key={index} className="w-full p-[20px] bg-white rounded-[6px] shadow-2xl border border-borderColor mt-[20px]">
                                            {
                                                notification?.status === "unread" ? (<View className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-10"></View>) : null
                                            }
                                            <View className="flex flex-row justify-between items-center">
                                                <Text className="text-[14px] text-textColor font-[500] ">{notification?.notification?.notification_name}<Text className={`text-[15px] font-[600] ${notification?.notification?.priority === "low" ? "text-clickButton" : "text-warningColor"} `}>{notification?.notification?.priority === "low" ? "  (Bình thường)" : "  (Quan trọng)"}</Text> </Text>
                                                <View className="relative">
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setOpenNotificationId(openNotificationId === notification.notification._id ? null : notification.notification._id)
                                                        }}
                                                        activeOpacity={0.8}
                                                    >
                                                        <Icon name="ellipsis-v" size={22} color="#AAAAAA" />
                                                    </TouchableOpacity>
                                                    {
                                                        openNotificationId === notification.notification._id && (
                                                            <View className="absolute top-[100%] right-[0] w-[150px] px-[15px] py-[10px] rounded-[4px]  bg-slate-200 z-50">
                                                                <TouchableOpacity onPress={()=>handleTickNotification(notification?._id)} activeOpacity={0.8}>
                                                                    <Text className="text-[14px] text-textColor">Đánh dấu là đã đọc</Text>
                                                                </TouchableOpacity>
                                                                {
                                                                    notification.notification?.type !== "admin" ? (<TouchableOpacity className=" mt-[5px] py-[5px] " onPress={()=>handelDeleteNotification(notification?._id)} activeOpacity={0.2}>
                                                                        <Text className="text-[14px] text-center text-textColor ">Xóa thông báo</Text>
                                                                    </TouchableOpacity>) : null
                                                                }
                                                            </View>
                                                        )
                                                    }
                                                </View>
                                            </View>
                                            <Text className="text-[12px] font-[400] text-iconColor mb-[8px]">{format(notification?.notification?.createdAt, "dd MMMM yyyy", { locale: vi })} </Text>
                                            <Text className="text-[16px] font-[400] text-textColor ">{notification?.notification?.desc_notification}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>)
                    }
                </ScrollView>)
            }
        </View>
    )
}
