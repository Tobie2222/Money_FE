import { View, Text, StatusBar, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectToken, selectUser } from '../../redux/authSlice'
import { selectRefresh } from '../../redux/accountSlice'
import { getAllDepositsSaving } from '../../data/Api'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import Loading from '../../components/Loading'

export default function TranDepositScreen() {
    const token = useSelector(selectToken)
    const [loading, setLoading] = useState(false)
    const user = useSelector(selectUser)
    const refresh = useSelector(selectRefresh)
    const [deposits, setDeposits] = useState([])
    const { t } = useTranslation()

    useEffect(() => {
        const getAllDeposits = async () => {
            setLoading(true)
            try {
                const response = await getAllDepositsSaving(user?.id, {
                    headers: {
                        token: `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setDeposits(response.data.allDeps)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        if (token) {
            getAllDeposits()
        }
    }, [token, refresh])
    return (
        <View className="flex-1">
            <View className="w-full flex flex-row items-center justify-center bg-primaryColor h-[170px]">
                <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ">Danh sách các khoản nạp tích lũy</Text>
            </View>
            <ScrollView className="w-full h-full bg-white rounded-t-[36px] mt-[-30px] px-[25px] py-[30px] ">
                {
                    loading ? (<View className="mt-[300px]">
                        <Loading />
                    </View>) : (<View className="w-full flex flex-col mb-[50px]">
                        {
                            deposits.length === 0 ? (<View className="">
                                <Text className="text-[20px] text-center text-textColor font-[600] mt-[100px] ">Không có dữ liệu!</Text>
                                <Image
                                    className="w-[200px] h-[200px] mx-auto mt-[40px] object-cover"
                                    source={{ uri: "https://s3-alpha-sig.figma.com/img/e224/311e/ad4282c1095acb9f0a249e6846fc58a6?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=o79vKFqjKxvscW6fpTzuJcgXi2YXmJks38nJJxlwwE-msUQqaZEPXSjjiF3NZqCcDG1KbbF8yXtBb9dAho4LYMi53Qy07pgbY3t25SFu0qgKAAIocjbOafGTxe5LSkGGbvzHD~4Zz2yWnPc2cSoaJ6S1yTJ-bC7OC7UDVEpw19nJp6eylQ0rJtn5jBDidlPTFeJ0xm-k7C0925NYFHFV5y2df-4Ej3jYPVxY7M9N~885~uOCdD1yrATnueLdQZ8c2emEqPtptDeV-kwtzzG~g90m3cYjL3yH28MSbPfrkHik7ddqKfEl2C4RXtem5OiJa5w1ZxQwk1wsuxjrKZe6VA__" }}
                                />
                            </View>) : (<View>
                                {
                                    deposits.map((deposit, index) => {
                                        return (
                                            <View key={index} className="w-full flex flex-row items-center justify-between mt-[10px]">
                                                <View className="flex flex-col items-start">
                                                    <Text className=" text-[16px] font-[500] text-textColor text-center ">{format(deposit?.transaction_date, "dd MMMM yyyy", { locale: vi })}</Text>
                                                    <Text className=" text-[14px] font-[600] text-iconColor text-center ">{deposit?.name_tran}</Text>
                                                </View>
                                                <View className="flex flex-col items-end">
                                                    <Text className=" text-[16px] font-[500] text-textColor text-center ">Số tiền</Text>
                                                    <Text className=" text-[14px] font-[600] text-warningColor ">-{deposit?.amount} vnđ</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>)
                        }
                    </View>)
                }


            </ScrollView>
        </View>
    )
}