import { View, StyleSheet, Image, Text, StatusBar, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/authSlice'
import { TextInput } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'

export default function DashBroad() {
  const textInputRef = useRef()
  const [hiddenBottomSheet,setHiddenBottomSheet]=useState(false)
  const user = useSelector(selectUser)
  const { t } = useTranslation()
  const bottomSheetRef = useRef(null)
  const snapPoints = useMemo(() => ['25%'], [])
  const navigation = useNavigation()

  const toggleSheet = () => {
    setHiddenBottomSheet((prev) => !prev)
  }


  return (
    <View className="flex-1">
      <View className="px-[20px] w-full bg-white">
        <View className="mt-[80px] mb-[35px] flex-row items-center justify-between ">
          <TouchableOpacity activeOpacity={0.8} onPress={toggleSheet}>
            <Icon name={`list`} size={24} color="#343C6A" />
          </TouchableOpacity>
          <Text className="text-[20px] font-[700] text-textColorAdmin">Quản lý người dùng</Text>
          <View>
            <Image
              source={{ uri: `${user?.avatar}` }}
              className="w-[30px] h-[30px] rounded-[200px] border border-borderColor mx-auto object-cover"
              //style={styles.shadowX}
            />
          </View>
        </View>
        <View className="px-[20px] w-full">
          <View className="w-full mb-[25px] flex-row items-center rounded-[40px] bg-bgAdmin px-[20px] py-[10px] border border-[#f0f0f0]">
            <Icon name={`search`} size={24} color="#8BA3CB" />
            <TextInput
              ref={textInputRef}
              className=" text-[#8BA3CB] text-[16px] ml-[10px] w-[90%]"
              placeholder="Tìm kiếm"
            />
          </View>
        </View>
      </View>
      <View className="bg-bgAdmin h-[900px]">
      </View>
      {
        hiddenBottomSheet && (
          <BottomSheet
            ref={bottomSheetRef}
            onChange={()=>{}}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onClose={() => {setHiddenBottomSheet(false)}}
          >
            <View className="flex-1 ">
              <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate("bottomTabScreen")}} className="flex-row items-center gap-[15px] px-[20px] py-[10px]">
                <Icon name={`user`} size={30} color="#AAAAAA" />
                <Text className="text-[18px] text-[#AAAAAA] font-[500]">Quản lý người dùng</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate("bottomTabScreen")}} className="flex-row items-center gap-[15px] px-[20px] py-[10px]">
                <Icon name={`bell`} size={30} color="#AAAAAA" />
                <Text className="text-[18px] text-[#AAAAAA] font-[500]">Quản lý thông báo</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate("bottomTabScreen")}} className="flex-row items-center gap-[15px] px-[20px] py-[10px]">
                <Icon name={`sign-out`} size={30} color="#AAAAAA" />
                <Text className="text-[18px] text-[#AAAAAA] font-[500]">Thoát</Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
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
  },
  shadowS: {
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
