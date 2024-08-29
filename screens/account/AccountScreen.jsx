import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Image, Text, StatusBar, ScrollView, TouchableOpacity, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import TabViews from '../../components/TabViews'


const accounts = [
    { id: 0, name: "ví 1", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 1, name: "ví 1", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 2, name: "ví 1", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 3, name: "ví 1", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 4, name: "ví 1", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 5, name: "ví 1", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
    { id: 6, name: "ví 1", image: "https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg", currency: "vnđ", balance: 400000 },
]

export default function AccountScreen() {
    const navigation = useNavigation()
    const { t } = useTranslation()
    return (
        <View className="flex-1 ">
            <StatusBar
                barStyle="light"
            />
            <View className="">
                <View className="bg-primaryColor py-[70px]">
                    <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center">Ví của bạn </Text>
                </View>
                <View className="w-full h-full bg-white rounded-t-[36px] mt-[-45px] px-[20px]">
                    <Text className="text-center text-textColor mt-[60px] text-[16px] font-[400]">Tổng số tiền</Text>
                    <Text className="text-center text-textColor mt-[15px] text-[30px] font-[700] leading-[45px] ">96.000.000 vnđ</Text>
                    <View className="mx-auto mt-[35px] flex-row">
                        <View className="flex-col items-center gap-[10px] mr-[20px] ">
                            <TouchableOpacity onPress={() => { }} activeOpacity={0.8} className="w-[60px] h-[60px] border border-primaryColor rounded-[100px] flex-row items-center justify-center">
                                <Icon name="plus" size={25} color="#438883" />
                            </TouchableOpacity>
                            <Text className="text-center text-textColor text-[16px] font-[400]">Tài khoản</Text>
                        </View>
                        <View className="flex-col items-center gap-[10px]">
                            <TouchableOpacity onPress={() => { }} activeOpacity={0.8} className="w-[60px] h-[60px] border border-primaryColor rounded-[100px] flex-row items-center justify-center">
                                <Icon name="money" size={25} color="#438883" />
                            </TouchableOpacity>
                            <Text className="text-center text-textColor text-[16px] font-[400]">Tích lũy</Text>
                        </View>
                    </View>
                    <View className="mt-[35px] ">
                        <TabViews
                            tabs={[{ id: 0, title: "Tài khoản" }, { id: 1, title: "Tích lũy" }]}
                            styleTab="rounded-[40px] py-[10px] "
                            styleTabs="h-[48px] bg-[#f0eef1] mt-[10px] rounded-[40px] flex-row items-center px-[6px]"
                            styleTextTab="text-[14px] font-[500] text-textColor"
                        />
                    </View>
                    <ScrollView className=" flex flex-col gap-[10px] w-full h-[100px] my-[20px]">
                        {
                            accounts.map((account) => {
                                return (
                                    <View key={account.id} className="flex flex-row justify-between items-center">
                                        <View className="flex-row items-center">
                                            <View style={styles.shadowS} className="w-[50px] h-[50px] border border-[#b2b2b2] rounded-[100px] ">
                                                <Image
                                                    source={{ uri: `https://res.cloudinary.com/doklsozku/image/upload/v1724342646/app_ql/sy7rcszdxyoqxgxxkmee.jpg` }}
                                                    className="object-cover w-full h-full rounded-[100px]"
                                                />
                                            </View>
                                            <View className="ml-[10px] flex flex-col items-start">
                                                <Text className="text-center text-textColor text-[16px] font-[600]">{account.name}</Text>
                                                <Text className="text-center mt-[5px] text-clickButton text-[12px] font-[500]">{account.balance} {account.currency}</Text>
                                            </View>
                                        </View>
                                        <View className="">
                                            <Icon name="ellipsis-v" size={25} color="#AAAAAA" />
                                        </View>
                                    </View>
                                )
                            })
                        }

                    </ScrollView>
                </View>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 22,
        fontWeight: 400
    },
    shadowS: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2
    },
    shadowX: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.00,

        elevation: 2
    }
})