import AsyncStorage from '@react-native-async-storage/async-storage'


export const saveData=async(key,value)=>{
    try {
        await AsyncStorage.setItem(key, value)
        console.log("token ",value)
    } catch(err) {
        console.log(err)
    }
}
export const readData=async(key)=>{
    try {
        const data=await AsyncStorage.getItem(key)
        return data
    } catch(err) {
        console.log(err)
    }
}
export const removeData=async(key)=>{
    try {
        await AsyncStorage.removeItem(key)
    } catch(err) {
        console.log(err)
    }
}