import AsyncStorage from '@react-native-async-storage/async-storage'


export const saveData = async (key,data) => {
    try {
        await AsyncStorage.setItem(key,data)
    } catch (err) {
        console.log(err)
    }
}
export const readData = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key)
        return data ? JSON.parse(data) : null
    } catch (err) {
        console.log(err)
    }
}
export const removeData=async(key)=>{
    try {
        await AsyncStorage.removeItem(key)
        console.log(`${key} đã bị xóa khỏi AsyncStorage`);
    } catch(err) {
        console.log(err)
    }
}