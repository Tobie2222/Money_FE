import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const CustomToast = ({ text1,props }) => {
    const {setBackgroundColor,nameIcon}=props
    return (
        <View className={`w-[80%] rounded-[8px] flex-row items-center justify-center py-[12px]`} style={{backgroundColor: setBackgroundColor}}>
            <Icon style={{}} name={`${nameIcon}`} size={22} color="#FFF" />
            <Text className="ml-[10px] font-[600] text-white text-[16px] ">{text1}</Text>
        </View>
    )
}
export default CustomToast
