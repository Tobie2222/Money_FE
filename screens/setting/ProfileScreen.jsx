import { View, StyleSheet, Image, Text, StatusBar, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { useTranslation } from 'react-i18next'
import Loading from '../../components/Loading'
import { Formik } from 'formik'
import * as Yup from 'yup'
import AbstractCircle from '../../components/AbstractCircle'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ButtonCom from '../../components/ButtonCom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken, selectUser, updateTsAuth } from '../../redux/authSlice'
import { createUser, updateUser } from '../../data/Api'
import Toast from 'react-native-toast-message'
import { showToastU } from '../../utils/toast'
import { Dropdown } from 'react-native-element-dropdown'
import * as ImagePicker from "expo-image-picker"
import CustomToast from '../../components/CustomToast'



const validationSchema = Yup.object().shape({

})


export default function ProfileScreen() {
  const user = useSelector(selectUser)
  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState(user?.avatar)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null)

  const [focusName, setFocusName] = useState(false)
  const [focusEmail, setFocusEmail] = useState(false)
  const [focusGender, setFocusGender] = useState(false)
  const { t } = useTranslation()
  const navigation = useNavigation()

  const options = [
    { label: 'Male', value: 'male', sex: 'male' },
    { label: 'Female', value: 'female', sex: 'female' }
  ]


  const upLoadImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        return
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })
      if (!result.canceled) {
        setAvatar(result.assets[0].uri)
      }
    } catch (err) {
      console.log(err)
    }
  }


  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("name", values?.name)
      formData.append("email", values?.email)
      formData.append("sex", values?.sex)
      if (avatar) {
        formData.append("image", {
          uri: avatar,
          name: 'image.jpg',
          type: 'image/jpeg',
        })
      }
      const response = await updateUser(user?.id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: `Bearer ${token}`,
        },
      })
      if (response.status === 200) {
        setLoading(false)
        showToastU(response.data.message, "#0866ff", "check", 3000)
        dispatch(updateTsAuth({
          user: response.data.updateUser,
          token: token
        }))
        setAvatar(response.data.updateUser.avatar)
      }
    } catch (err) {
      setLoading(false)
      setError(true)
      if (err.response) {
        setMessage(err.response.data.message)
        showToastU(err.response.data.message, "#EF4E4E", "warning", 3000)
      }
    }
  }

  return (
    <View className="flex-1">
      <StatusBar
        barStyle="dark"
      />
      <ScrollView>
        <View className="mt-[-20px]">
          <AbstractCircle />
        </View>

        <View className="z-20">
          <Toast
            config={{
              custom_toast: (internalState) => <CustomToast {...internalState} />
            }}
          />
        </View>
        <View className="flex-row items-center mt-[80px] mb-[40px] w-full px-[25px] ">
          <TouchableOpacity onPress={() => navigation.navigate("settingScreen")} className=" w-[28px] h-[28px]  flex items-center justify-center">
            <Icon name='chevron-left' color={"#fff"} style={styles.icon} />
          </TouchableOpacity>
          <Text className=" text-[22px] leading-[33px] font-[700] text-white text-center ml-[35px] ">Chỉnh sửa thông tin cá nhân</Text>
        </View>


        {
          loading ? (<View className="mt-[350px]">
            <Loading color='#438883' />
          </View>) : (
            <View className="flex-1">
              <View className="w-[100px] h-[100px] rounded-[100px] border border-borderColor mt-[130px] mx-auto shadow-2xl relative ">
                <Image
                  source={{ uri: `${avatar}` }}
                  className="w-full h-full rounded-[100px] border-[2px] border-red-400 object-cover"
                />
                <TouchableOpacity activeOpacity={0.8} onPress={upLoadImage} className="absolute w-[30px] h-[30px] bg-textColor flex-row items-center justify-center rounded-[20px] border border-borderColor top-[70%] right-[-8%]">
                  <Icon name='camera' color={"#fff"} style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View className="px-[20px] mt-[30px] ">
                <Formik
                  initialValues={{ email: '', name: '', sex: '', image: null }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => handleSubmit(values)}
                >
                  {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <View className="">
                      <View className="w-full flex-col bg-white rounded-[14px] py-[30px] px-[20px] ">
                        <View className="w-full flex-col gap-[10px] mt-[5px]">
                          <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Tên</Text>
                          <View className={`w-full my-[20px] flex-row  items-center ${focusName === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[12px] bg-white rounded-[8px]`}>
                            <TextInput
                              onChangeText={handleChange('name')}
                              onBlur={() => {
                                handleBlur('name')
                                setFocusName(false)
                              }}
                              value={values.name}
                              className="text-[16px] leading-[20px] text-textColor  w-[100%]  "
                              onFocus={() => setFocusName(true)}
                            />
                          </View>
                        </View>
                        <View className="w-full flex-col gap-[10px] ">
                          <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Email</Text>
                          <View className={`w-full my-[20px] flex-row  items-center ${focusEmail === true ? "border border-primaryColor " : "border border-borderColor "} px-[16px] py-[12px] bg-white rounded-[8px]`}>
                            <TextInput
                              onChangeText={handleChange('email')}
                              onBlur={() => {
                                handleBlur('email')
                                setFocusEmail(false)
                              }}
                              value={values.email}
                              className="text-[16px] leading-[20px] text-textColor w-[100%]  "
                              onFocus={() => setFocusEmail(true)}
                            />
                          </View>
                        </View>
                        <View className="w-full flex-col gap-[10px] ">
                          <Text className="text-[15px] leading-[22px] text-textColor font-[500] ">Giới tính</Text>
                          <View className={`w-full rounded-[14px] border ${focusGender ? "border-primaryColor" : " border-borderColor "}`}>
                            <Dropdown
                              style={styles.dropdown}
                              data={options}
                              labelField="label"
                              valueField="value"
                              placeholder={t("gender")}
                              value={selectedValue}
                              onChange={item => {
                                setFieldValue('sex', item.value)
                                setSelectedValue(item.value)
                              }}
                              renderItem={item => (
                                <View className="flex-row items-center gap-[10px] px-[20px] py-[12px] rounded-[14px]">
                                  <Icon name={`${item.sex}`} size={30} color="#666666" />
                                  <Text className="text-textColor ">{item.label}</Text>
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
                        text="Lưu"
                        styleButton="w-full flex py-[13px] my-[50px] border border-primaryColor  rounded-[40px] "
                        styleText="text-white text-center text-[16px] leading-[24px] font-[600] text-primaryColor"
                        onPress={handleSubmit}
                      />
                    </View>
                  )}
                </Formik>
              </View>
            </View>
          )
        }


      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  icon: {
    fontSize: 14,
    fontWeight: 400
  },
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