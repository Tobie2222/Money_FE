import React, { useState } from 'react'
import { View ,StyleSheet,Image,Text, ScrollView,TextInput,TouchableOpacity } from 'react-native'
import AbstractShape from '../components/AbstractShape'
import Icon from 'react-native-vector-icons/FontAwesome'
import ButtonCom from '../components/ButtonCom'
import { useNavigation } from '@react-navigation/native'

export default function SelectLanguageScreen() {
    const navigation = useNavigation()
    const [selectedValue, setSelectedValue] = useState("")
    const [hiddenListLang,setHiddenListLang]=useState(false)
    const items = [
        { label: 'Việt Nam', value: 'Việt Nam',image: "https://media.istockphoto.com/id/464516754/vi/vec-to/qu%E1%BB%91c-k%E1%BB%B3-vi%E1%BB%87t-nam.jpg?s=612x612&w=0&k=20&c=20_fpqn2SzR-BYCcTgc77EuiudsNnh1c0mVXVJzSNbk=" },
        { label: 'Hàn Quốc', value: 'Hàn Quốc',image: "https://eurotravel.com.vn/wp-content/uploads/2023/05/quoc-ky-chinh-thuc-cua-han-quoc.png" },
        { label: 'Nhật Bản', value: 'Nhật Bản' ,image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/225px-Flag_of_Japan.svg.png" },
        { label: 'Nhật Bản', value: 'Nhật Bản' ,image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/225px-Flag_of_Japan.svg.png" },
        { label: 'Nhật Bản', value: 'Nhật Bản' ,image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/225px-Flag_of_Japan.svg.png" },
    
    ]
    const handleSelectLang=(values)=>{
        setSelectedValue(values) 
        setHiddenListLang(false)
    }
    return (
        <View className="flex-1 relative ">
            <AbstractShape/>
            <TouchableOpacity onPress={()=>navigation.navigate("startScreen")} className="absolute w-[28px] h-[28px] top-[75px] left-[25px] flex items-center justify-center">
                <Icon name='chevron-left'  color={"#438883"} style={styles.icon}/>
            </TouchableOpacity>
            <Image
                source={require("../assets/pig.png")}
                className="w-[200px] h-[240px] mt-[130px] mx-auto object-cover "
            />
            <Text className="mx-auto text-center font-[700] leading-[39px] text-[30px] text-primaryColor w-[300px]">Chào mừng bạn đến với <Text className="text-[#FBBE4A]">M</Text>.app</Text>
            <TouchableOpacity onPress={()=>setHiddenListLang(true)} style={styles.inputSelect} className="w-[250px] mx-auto h-[40px] bg-white border border-borderColor mt-[75px] rounded-[8px]">
                <TextInput
                    className=" px-[17px] py-[10px] text-[14px] font-[500] text-primaryColor"
                    placeholder="Chọn ngôn ngữ"
                    placeholderTextColor="#438883"
                    value={selectedValue}
                    onChangeText={(input)=>setSelectedValue(input)}
                    onFocus={()=>setHiddenListLang(true)}
                />
            </TouchableOpacity>
            <View className="h-[140px]">
                {
                    hiddenListLang && (
                        <View style={styles.inputSelect}  className="mt-[10px] mx-auto w-[250px] h-full bg-white rounded-[8px] border border-borderColor">
                            <ScrollView  className=" rounded-[8px] ">
                                {
                                    items.map((item,index)=>{
                                        return (
                                            <TouchableOpacity onPress={()=>handleSelectLang(item.value) } key={index}  className="flex-row py-[10px] px-[16px] bg-white items-center gap-[10px]">
                                                <Image
                                                    source={{ uri: item.image }}
                                                    className="w-[28px] h-[18px] rounded-[4px] border-2 border-borderColor "
                                                />
                                                <Text className="text-[16px] font-[500] text-textColor">{item.value}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                    )
                }
            </View>

            <ButtonCom
                text="Tiếp tục"
                styleButton="px-[96px] py-[13px] mt-[47px] mx-auto bg-primaryColor rounded-[40px]" 
                styleText="text-white text-[16px] leading-[24px] font-[600]" 
                onPress={() => navigation.navigate('loginScreen')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 22, 
        fontWeight: 400
    },
    inputSelect: {
        shadowColor: "#000",
        shadowOffset: {
            width: 8,
            height: 8,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 2,
    }
})