import {View, StyleSheet, Image, Text, StatusBar, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import HeaderAdmin from '../../components/HeaderAdmin'
import BottomSheetCom from '../../components/BottomSheetCom'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

export default function NotificationScreen({}) {
  const [hiddenBottomSheet,setHiddenBottomSheet]=useState(false)
  const navigation = useNavigation()
  const toggleSheet = () => {
    setHiddenBottomSheet((prev) => !prev)
  }
  const textInputRef = useRef()
  const {t}=useTranslation()
  return (
    <View className="flex-1">
      <StatusBar
        barStyle="dark-content"
      />
      <HeaderAdmin
        title='Quản lý thông báo'
        toggleSheet={toggleSheet}
        children={(
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
        )}
      />
      <Text className="">Quản lý thông báo</Text>
      {
        hiddenBottomSheet && (
          <BottomSheetCom
            onCloseBottomSheet={()=>setHiddenBottomSheet(false)}
            children={(
              <View>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate("dashBroadScreen");setHiddenBottomSheet(false)}} className="flex-row items-center gap-[15px] px-[20px] py-[10px]">
                  <Icon name={`user`} size={30} color="#AAAAAA" />
                  <Text className="text-[18px] text-[#AAAAAA] font-[500]">Quản lý người dùng</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate("notificationScreen");setHiddenBottomSheet(false)}} className="flex-row items-center gap-[15px] px-[20px] py-[10px]">
                  <Icon name={`bell`} size={30} color="#AAAAAA" />
                  <Text className="text-[18px] text-[#AAAAAA] font-[500]">Quản lý thông báo</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate("bottomTabScreen")}} className="flex-row items-center gap-[15px] px-[20px] py-[10px]">
                  <Icon name={`sign-out`} size={30} color="#AAAAAA" />
                  <Text className="text-[18px] text-[#AAAAAA] font-[500]">Thoát</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )
      }
    </View>
  )
}