import { View, StyleSheet, Image, Text, StatusBar, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import HeaderAdmin from '../../components/HeaderAdmin'
import BottomSheetCom from '../../components/BottomSheetCom'
import { TextInput } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { selectToken } from '../../redux/authSlice'
import { showToastU } from '../../utils/toast'
import Loading from '../../components/Loading'
import Toast from 'react-native-toast-message'
import CustomToast from '../../components/CutomToast'
import { toggleRefresh } from '../../redux/accountSlice'
import { useSelector } from 'react-redux'
import ButtonCom from '../../components/ButtonCom'
import { Dropdown } from 'react-native-element-dropdown'


const validationSchema = Yup.object().shape({})

export default function NotificationScreen({ }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)
  const token = useSelector(selectToken)
  const [focusEmail, setFocusEmail] = useState(false)
  const [focusPassword, setFocusPassword] = useState(false)
  const [focusGender, setFocusGender] = useState(false)
  const [focusName, setFocusName] = useState(false)
  const [hiddenBottomSheet, setHiddenBottomSheet] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null)
  const navigation = useNavigation()
  const toggleSheet = () => {
    setHiddenBottomSheet((prev) => !prev)
  }
  const textInputRef = useRef()
  const { t } = useTranslation()
  const options = [
    { label: 'Quan trọng', value: 'male', sex: 'male' },
    { label: 'Bình thường', value: 'female', sex: 'female' }
  ]
  const handleSubmit = async (values) => {
    // setLoading(true)
    // try {
    //     const response = await createUser(formData, {
    //         headers: {
    //             token: `Bearer ${token}`
    //         }
    //     })
    //     if (response.status === 200) {
    //         showToastU(response.data.message, "#0866ff", "check", 3000)
    //         setLoading(false)
    //     }
    // } catch (err) {
    //     setLoading(false)
    //     setError(true)
    //     if (err.response) {
    //         showToastU(err.response.data.message, "#EF4E4E", "warning", 3000)
    //     }
    // }
  }

  return (
    <View className="flex-1">
      <StatusBar
        barStyle="dark-content"
      />
      <View className="z-20">
        <Toast
          config={{
            custom_toast: (internalState) => <CustomToast {...internalState} />
          }}
        />
      </View>
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

      {
        loading ? (<Loading />) : (
          <View className="px-[30px] py-[25px]">
            <Text className="text-textColorAdmin text-[18px] font-[700] mb-[20px] ">Gửi thông báo</Text>
            <View className="">
              <Formik
                initialValues={{ name: '', email: '', type: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                  <View className="w-full">
                    {/* {(touched.email && errors.email) || (touched.password && errors.password) ? (
                                    <View className="w-full flex-row items-center justify-center bg-backGroundColorWarning mb-[15px] py-[10px] rounded-[12px]">
                                        <Icon name="exclamation-circle" size={20} color="#EF4E4E" />
                                        <Text className="text-warningColor ml-[10px]">
                                            {errors.email || errors.password}
                                        </Text>
                                    </View>
                                ) : null} */}
                    <View className="w-full bg-white px-[20px] py-[40px] rounded-[12px] mb-[30px] shadow-lg mx-auto flex flex-col">
                      <View className="w-full flex flex-col gap-[10px] ">
                        <Text className="text-[14px] text-[#232323] font-[400]">Tên người dùng</Text>
                        <TextInput
                          placeholder={t("name")}
                          onChangeText={handleChange('name')}
                          onBlur={() => {
                            handleBlur('name')
                            setFocusName(false)
                          }}
                          value={values.name}
                          className={`text-[16px] leading-[20px] w-full text-[#718EBF] border ${focusName ? "border-[#718EBF]" : "border-borderColor"}   px-[16px] py-[13px] rounded-[10px] `}
                          onFocus={() => setFocusName(true)}
                        />
                      </View>
                      <View className="w-full flex flex-col gap-[10px] mt-[10px]">
                        <Text className="text-[14px] text-[#232323] font-[400]">Email</Text>
                        <TextInput
                          placeholder={t("email")}
                          onChangeText={handleChange('email')}
                          onBlur={() => {
                            handleBlur('email')
                            setFocusEmail(false)
                          }}
                          value={values.email}
                          className={`text-[16px] leading-[20px] w-full text-[#718EBF] border ${focusEmail ? "border-[#718EBF]" : "border-borderColor"}   px-[16px] py-[13px] rounded-[10px] `}
                          onFocus={() => setFocusEmail(true)}
                        />
                      </View>
                      <View className="w-full flex flex-col gap-[10px] mt-[10px] mb-[2px]">
                        <Text className="text-[14px] text-[#232323] font-[400]">Giới tính</Text>
                        <View className={`w-full rounded-[14px] border ${focusGender ? "border-[#718EBF]" : " border-borderColor "}`}>
                          <Dropdown
                            style={styles.dropdown}
                            data={options}
                            labelField="label"
                            valueField="value"
                            placeholder={t("gender")}
                            value={selectedValue}
                            onChange={item => {
                              setFieldValue('gender', item.value)
                              setSelectedValue(item.value)
                            }}
                            renderItem={item => (
                              <View className="flex-row items-center gap-[10px] px-[20px] py-[12px] rounded-[14px]">
                                <Text className="text-[#718EBF] ">{item.label}</Text>
                              </View>
                            )}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            onFocus={() => setFocusGender(true)}
                            onBlur={() => setFocusGender(false)}
                          />
                        </View>
                      </View>
                    </View>
                    <ButtonCom
                      text="Gửi"
                      styleButton="w-full flex py-[10px] mt-[5px] bg-white rounded-[30px] border border-[#718EBF]"
                      styleText="text-[#718EBF] text-center text-[16px] leading-[24px] font-[600]"
                      onPress={handleSubmit}
                    />
                  </View>
                )}
              </Formik>
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
    </View>
  )
}
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderRadius: 14,
    paddingHorizontal: 20,
    backgroundColor: "white",
    marginTop: 2
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#AAAAAA',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#AAAAAA',
  },
})