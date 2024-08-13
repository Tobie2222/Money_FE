import { View } from 'react-native'

export default function AbstractShape () {
    return (
        <View className="relative z-[-1]">
            <View className="absolute w-full h-[400px] bg-[#D6EEEB]"></View>
            <View className="h-[500px] w-full bg-[#D6EEEB] absolute top-[400px] border-t-[200px] border-l-[550px] border-t-[#D6EEEB] border-l-white" ></View>
        </View>
    )
}
