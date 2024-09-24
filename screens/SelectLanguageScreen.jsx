import React, { useState } from 'react'
import { View ,StyleSheet,Image,Text, ScrollView,TextInput,TouchableOpacity ,StatusBar} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import ButtonCom from '../components/ButtonCom'
import AbstractShape from '../components/AbstractShape'


export default function SelectLanguageScreen() {
    const {i18n,t}=useTranslation()
    const navigation = useNavigation()
    const [selectedValue, setSelectedValue] = useState("")
    const [hiddenListLang,setHiddenListLang]=useState(false)
    const items = [
        { label: 'Tiếng Việt', value: 'vi',image: "https://media.istockphoto.com/id/464516754/vi/vec-to/qu%E1%BB%91c-k%E1%BB%B3-vi%E1%BB%87t-nam.jpg?s=612x612&w=0&k=20&c=20_fpqn2SzR-BYCcTgc77EuiudsNnh1c0mVXVJzSNbk=" },
        { label: 'Tiếng Anh', value: 'en',image: "https://file.hstatic.net/200000495037/file/5_400x300_0467d536c95c4d888d277275d871470e.jpg" },
    ]
    const handleSelectLang=(values,labelTitle)=>{
        setSelectedValue(labelTitle) 
        setHiddenListLang(false)
        i18n.changeLanguage(values)
    }
    
    return (
        <View className="flex-1 relative ">
            <AbstractShape/>
            <StatusBar
                barStyle="dark"
            />
            <TouchableOpacity onPress={()=>navigation.navigate("startScreen")} className="absolute w-[28px] h-[28px] top-[75px] left-[25px] flex items-center justify-center">
                <Icon name='chevron-left'  color={"#438883"} style={styles.icon}/>
            </TouchableOpacity>
            <Image
                source={require("../assets/pig.png")}
                className="w-[200px] h-[240px] mt-[130px] mx-auto object-cover "
            />
            <Text className="mx-auto text-center font-[700] leading-[39px] text-[30px] text-primaryColor w-[300px]">{t("Welcome")} <Text className="text-[#FBBE4A]">M</Text>.app</Text>
            <TouchableOpacity onPress={()=>setHiddenListLang(true)} style={styles.inputSelect} className="w-[250px] mx-auto h-[40px] bg-white border border-borderColor mt-[75px] rounded-[8px]">
                <TextInput
                    className=" px-[17px] py-[10px] text-[14px] font-[500] text-primaryColor"
                    placeholder={t("SelectLanguage")}
                    placeholderTextColor="#438883"
                    value={selectedValue}
                    onChangeText={(input)=>setSelectedValue(input)}
                    onFocus={()=>setHiddenListLang(true)}
                />
            </TouchableOpacity>
            <View className="h-[140px]">
                {
                    hiddenListLang && (
                        <View style={styles.inputSelect}  className="mt-[10px] mx-auto w-[250px] bg-white rounded-[8px] border border-borderColor">
                            <ScrollView  className=" rounded-[8px] ">
                                {
                                    items.map((item,index)=>{
                                        return (
                                            <TouchableOpacity onPress={()=>handleSelectLang(item.value,item.label) } key={index}  className="flex-row py-[10px] px-[16px] bg-white items-center gap-[10px]">
                                                <Image
                                                    source={{ uri: item.image }}
                                                    className="w-[28px] h-[18px] rounded-[4px] border-[2px] border-borderColor "
                                                />
                                                <Text className="text-[16px] font-[500] text-textColor">{item.label}</Text>
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
                text={t("Continue")}
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