import { View, StyleSheet, Image, Text, StatusBar, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import { selectMessage, selectToken, selectUser } from '../../redux/authSlice'
import { useNavigation } from '@react-navigation/native'
import { Table, Row, Rows } from 'react-native-table-component'
import BottomSheetCom from '../../components/BottomSheetCom'
import HeaderAdmin from '../../components/HeaderAdmin'
import ButtonCom from '../../components/ButtonCom'
import { TextInput } from 'react-native-gesture-handler'
import { deleteUser, getAllUser } from '../../data/Api'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CutomToast'
import { showToastU } from '../../utils/toast'
import Loading from '../../components/Loading'

export default function DashBroadScreen() {
  const [loading, setLoading] = useState(false)
  const [fetchingUser, setFetchingUser] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const textInputRef = useRef()
  const [countUser, setCountUser] = useState(0)
  const [idUser, setIdUser] = useState("")
  const token = useSelector(selectToken)
  const [hiddenBottomSheet, setHiddenBottomSheet] = useState(false)
  const [hiddenBottomSheetDelete, setHiddenBottomSheetDelete] = useState(false)
  const [users, setUsers] = useState([])
  const user = useSelector(selectUser)
  const { t } = useTranslation()
  const navigation = useNavigation()
  console.log(token)
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await getAllUser(1, 5, {
          headers: {
            token: `Bearer ${token}`
          }
        })
        if (response.status === 200) {
          setUsers(response.data.getAllUser?.data)
          setCountUser(response.data.getAllUser?.totalItems || 0)
        }
      } catch (err) {
        console.log(err)
      }
    }
    if (token) {
      getAllUsers()
    }
  }, [token, fetchingUser])
  const tableHead = ['STT', 'Tên', 'Giới tính', 'Email', 'Hành động']

  const toggleSheet = () => {
    setHiddenBottomSheet((prev) => !prev)
  }
  const handleDeleteUser = async () => {
    setModalVisible(false)
    setLoading(true)
    try {
      const response = await deleteUser(idUser, {
        headers: {
          token: `Bearer ${token}`
        }
      })
      if (response.status === 200) {
        showToastU(response.data.message, "#438883", "check", 3000)
        setLoading(false)
        setFetchingUser(!fetchingUser)
      }
    } catch (err) {
      setLoading(false)
      if (err.response) {
        showToastU(err.response.data.message, "#EF4E4E", "check", 3000)
      }
    }
  }
  return (
    <View className="flex-1 bg-bgAdmin">
      <StatusBar
        barStyle="dark-content"
      />
      <HeaderAdmin
        title='Quản lý người dùng'
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
        toggleSheet={toggleSheet}
      />
      <View className="z-20">
        <Toast
          config={{
            custom_toast: (internalState) => <CustomToast {...internalState} />
          }}
        />
      </View>
      {
        loading ? (<Loading color='438883' />) : (
          <View className="flex-1">
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
            >
              <View className="flex-1 justify-center items-center">
                {/* black overlay */}
                <View className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"></View>
                <View className="w-[300px] p-[20px] bg-white rounded-[18px] z-10">
                  <Text className="text-center font-[600] text-[16px] text-textColor ">Bạn có muốn xóa người dùng này ?</Text>
                  <View className="flex flex-col mt-[20px] ">
                    <ButtonCom
                      text="Có"
                      styleButton="w-full py-[13px] mx-auto bg-warningColor rounded-[18px] "
                      styleText="text-white text-[16px] leading-[24px] font-[700] text-center"
                      onPress={handleDeleteUser}
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
            <ScrollView>
              <View className=" py-[20px] px-[30px]">
                <Text className="text-textColorAdmin text-[18px] font-[700] mb-[20px] ">Số người tham gia app</Text>
                <View style={styles.shadowS} className="p-[20px] bg-white rounded-[16px] flex-row  ">
                  <View className="w-[45px] h-[45px] flex justify-center items-center rounded-[100px] border border-[#396AFF] bg-[#E7EDFF]">
                    <Icon name={`user`} size={30} color="#396AFF" />
                  </View>
                  <View className="ml-[15px] flex flex-col">
                    <Text className="text-[#718EBF] text-[18px] font-[400] ">Số người </Text>
                    <Text className="text-textColorAdmin text-[18px] font-[700]  mt-[5px]">{countUser}</Text>
                  </View>
                </View>
                <Text className="text-textColorAdmin text-[18px] font-[700] my-[20px] ">Danh sách người sự dụng APP</Text>
                <ButtonCom
                  text="Tạo người tham gia mới"
                  styleButton=" py-[8px] px-[10px] w-[60%] bg-white rounded-[6px] shadow-2xl"
                  styleText="text-[#718EBF] text-[16px] leading-[24px] font-[500] text-center"
                  onPress={() => { navigation.navigate("createUserScreen"); setHiddenBottomSheet(false) }}
                />
                <View className="">
                  <Table style={{ padding: 15, marginTop: 20, backgroundColor: 'white', borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 10 }}>
                    <Row data={tableHead} style={{ flexDirection: 'row' }} textStyle={{ fontWeight: '500', color: '#718EBF', textAlign: 'center', backgroundColor: 'red' }} />
                    <View style={{ width: '100%', height: 1, marginTop: 5, marginBottom: 10, backgroundColor: '#e3e3e3' }} />
                    <View className="">
                      {
                        users.map((user, index) => {
                          return (
                            <View key={index} className="flex-row gap-[10px] px-[8px] ">
                              <Text className="text-center w-[17%] ">{index}</Text>
                              <Text className="text-center w-[17%] ">{user?.name}</Text>
                              <Text className="text-center w-[17%] ">{user?.sex}</Text>
                              <Text className="text-center w-[17%] ">  {user?.email.length > 4 ? `${user?.email.substring(0, 4)}...` : user?.email}</Text>
                              <TouchableOpacity activeOpacity={0.8} onPress={() => { setIdUser(user._id); setHiddenBottomSheetDelete(true) }} style={styles.icon} className=" flex-row justify-center">
                                <Icon name="ellipsis-v" size={20} color="#AAAAAA" />
                              </TouchableOpacity>
                            </View>
                          )
                        })
                      }
                    </View>
                  </Table>
                </View>
              </View>
            </ScrollView>
            {/* paginate */}
            <View className="">

            </View>

          </View>
        )
      }
      {
        hiddenBottomSheet && (
          <BottomSheetCom
            onCloseBottomSheet={() => setHiddenBottomSheet(false)}
            children={(
              <View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate("dashBroadScreen"); setHiddenBottomSheet(false) }} className="flex-row items-center gap-[15px] px-[20px] py-[10px]">
                  <Icon name={`user`} size={30} color="#AAAAAA" />
                  <Text className="text-[18px] text-[#AAAAAA] font-[500]">Quản lý người dùng</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate("notificationScreen"); setHiddenBottomSheet(false) }} className="flex-row items-center gap-[15px] px-[20px] py-[10px]">
                  <Icon name={`bell`} size={30} color="#AAAAAA" />
                  <Text className="text-[18px] text-[#AAAAAA] font-[500]">Quản lý thông báo</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate("bottomTabScreen") }} className="flex-row items-center gap-[15px] px-[20px] py-[10px]">
                  <Icon name={`sign-out`} size={30} color="#AAAAAA" />
                  <Text className="text-[18px] text-[#AAAAAA] font-[500]">Thoát</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )
      }
      {
        hiddenBottomSheetDelete && (
          <BottomSheetCom
            onCloseBottomSheet={() => setHiddenBottomSheetDelete(false)}
            children={(
              <View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { setHiddenBottomSheetDelete(false) }} className="flex-row items-center gap-[15px] px-[20px] py-[10px]">
                  <Icon name={`pencil`} size={30} color="#AAAAAA" />
                  <Text className="text-[18px] text-[#AAAAAA] font-[500]">Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { setModalVisible(true); setHiddenBottomSheetDelete(false) }} className="flex-row items-center gap-[15px] px-[20px] py-[10px]">
                  <Icon name={`trash`} size={30} color="#AAAAAA" />
                  <Text className="text-[18px] text-[#AAAAAA] font-[500]">Xóa</Text>
                </TouchableOpacity>
              </View>
            )}
          />
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
    width: "17%"
  },
})
