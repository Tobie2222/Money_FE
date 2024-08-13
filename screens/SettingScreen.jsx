import { View ,StyleSheet,Image,Text, StatusBar, ScrollView,TouchableOpacity,Modal} from 'react-native'
import AbstractCircle from '../components/AbstractCircle'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useState } from 'react'


const func=[
    {nameIcon: "user",title: "Chỉnh sửa trang cá nhân"},
    {nameIcon: "user",title: "Đăng xuất"},
    {nameIcon: "user",title: "Đổi mật khẩu"},
    {nameIcon: "user",title: "Thay đổi ngôn ngữ"},
    {nameIcon: "user",title: "Chọn loại tiền tệ"},
    {nameIcon: "user",title: "Danh mục chi tiêu"},
    {nameIcon: "user",title: "Danh mục thu nhập"},
]


export default function SettingScreen() {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <View className="flex-1">
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
                }}
            ></Modal>
            <StatusBar
                barStyle="light-content"
            />
            <ScrollView className="">
                <AbstractCircle
                    shadowS={styles.shadowX}
                />
                <View className="px-[20px]">
                    <Image
                        source={require("../assets/user.png")}
                        className="w-[100px] h-[100px] mt-[280px] rounded-[50%] border border-borderColor mx-auto object-cover "
                        style={styles.shadowX}
                    />
                    <Text className="text-center text-[22px] font-[600] text-textColor mt-[10px] leading-[33px] ">Hoàng Nguyễn</Text>
                    <Text className="text-center text-[16px] font-[600] text-primaryColor leading-[24px] ">nguyenhoanghuu15042004@gmail.com</Text>
                    <View className="w-full mt-[25px] bg-white mx-auto rounded-[8px] py-[12px] px-[20px]" style={styles.shadowS}>
                        <View className="flex-row items-center gap-[15px] ">
                            <View className="h-[45px] w-[45px] rounded-[50%] border-[2px] border-primaryColor flex-row items-center justify-center">
                                <Image
                                    source={{uri:"https://s3-alpha-sig.figma.com/img/4fb3/cea4/2af90e1573bb9b5163aec628ea81185d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DA4WMfM2WMHgH1qWGikk3z0R2OXW4jXVfqZxFjQveQlUMjV8gsQ8iG4tdqUTDENHju3mQzmIP~KVUfpNe8p98aO1WPGJi9JMeHYqccEmpasxowowK8BTaepVLrkb7XS0VCTz7Y-p7A28h88PC~ZVERoXKA6UrO8sBgxmj~AwjW0QoAToe7gpzrV5aYnEuFSB1u8DBTIMeHR3ndZoU9DDlvmL5PeXlZEqWkr5OZdsRRrRxijPnoQ8xuxNHbzalzTq7ZvZ8JMQMlX~g08m2fnOr96f-MYOSqGFzR61GFAxg0~H5mWxRoQ~qxh9AoIMKBxylq87sOONfWx1BXNBooj4Fw__"}}
                                    className="w-[27px] h-[22px] object-cover "
                                />
                            </View>
                            <Text className="text-textColor text-[16px] leading-[21] font-[500]">Mua Bản premium</Text>
                        </View>
                    </View>
                    <Text className="text-[14px] font-[600] text-textColor my-[15px] leading-[21px] ">Xem thêm</Text>
                    <View className="w-full bg-white mx-auto rounded-[8px] pb-[12px] px-[20px] mb-[30px]" style={styles.shadowS}>
                        {
                            func.map((fun,index)=>{
                                return (
                                    <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)} activeOpacity={0.8} key={index} className="flex-row items-center gap-[15px] mt-[1px] ">
                                        <View className="h-[45px] w-[45px] rounded-[50%] bg-[#F3F2FB] border-[2px] border-primaryColor flex-row items-center justify-center">
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

const styles=StyleSheet.create({
    shadowX: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 }, 
        shadowOpacity: 0.15, 
        shadowRadius: 20, 
        elevation: 10,
    },shadowS: {
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
