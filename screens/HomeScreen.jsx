import { View ,Text,StatusBar,StyleSheet,Image, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AbstractCircle from '../components/AbstractCircle'
import TabScreen from '../navigation/TabScreen'
import TabViewExample from '../components/tabView'


const labelCost=[
    "25.000k",
    "20.000k",
    "15.000k",
    "10.000k",
    "5.000k",
    "0",
]

export default function HomeScreen() {
    return (
        <View className="flex-1">
            <AbstractCircle/>
            <StatusBar
                barStyle="light-content"
            />
            <ScrollView>
                <View className="flex-row items-center w-full justify-between mt-[70px] px-[20px]">
                    <Text className="text-white text-[24px] leading-[33px] font-[700] ">1.500.000 đ</Text>
                    <Icon name={"bell"} size={25} color="#fff" />
                </View>
                <Text className="text-white text-[14px] leading-[21px] font-[600] ml-[20px] ">Tổng số dư?</Text>
                <View className="w-[91%]  mt-[20px] bg-white mx-auto rounded-[12px] py-[15px] px-[20px] " style={styles.shadowS}>
                    <View className="flex-row justify-between ">
                        <Text className="text-[#000000] text-[15px] leading-[22px] font-[500]">Ví của tôi</Text>
                        <Text className="text-clickButton text-[14px] leading-[18px] font-[500]">Xem tất cả</Text>
                    </View>
                    <View className="flex-row justify-between items-center mt-[10px] ">
                        <View className="flex-row items-center gap-[5px] ">
                            <Image
                                source={require("../assets/pig.png")}
                                className="w-[35px] h-[35px] rounded-[50%] object-cover border border-borderColor "
                            />
                            <Text className="text-textColor text-[14px] leading-[18px] font-[500]">Tiền mặt</Text>
                        </View>
                        <Text className="text-textColor text-[16px] leading-[24px] font-[500]">1.500.000 đ</Text>
                    </View>
                </View>
                <Text className="text-white text-[14px] leading-[21px] font-[600] ml-[20px] my-[20px] ">Báo cáo chi tiêu</Text>
                <View className="w-[91%] bg-white mx-auto rounded-[12px] py-[15px] px-[20px] " style={styles.shadowS}>
                    <Text className="text-[#000000] text-[18px] leading-[27px] font-[500]">12.000.000.000 đ</Text>
                    <Text className="text-textColor mt-[5px] text-[14px] leading-[21px] font-[500]">Tổng chi tháng này  <Text className="text-clickButton font-[600]">Tăng 20%</Text></Text>
                    <TabViewExample/>
                    <View className="flex-row justify-between h-[200px] mt-[5px] ">
                        <View className="flex-row gap-[30px] items-end">
                            <View className="flex-col items-end">
                                {
                                    labelCost.map((item)=>{
                                        return (
                                            <Text key={item} className="text-[#B8BFCC] mt-[15px] font-[700] text-[14px] ">{item}</Text>
                                        )
                                    })
                                }
                            </View>
                            {/* column char */}
                            <View className="w-[10px] h-[160px] bg-[#22C55E] rounded-[30px] "></View>
                            <View className="w-[10px] h-[108px] bg-[#A855F7] rounded-[30px] "></View>
                        </View>
                        <View className="">
                            
                        </View>
                    </View>
                </View>
            </ScrollView>

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
    }
})
