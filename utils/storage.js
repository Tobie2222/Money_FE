import AsyncStorage from '@react-native-async-storage/async-storage'


export const saveData=async(data)=>{
    try {
        //console.log("data save", data)
        await await AsyncStorage.multiSet(data)
    } catch(err) {
        console.log(err)
    }
}
export const readData=async(keys)=>{
    try {
        const data=await AsyncStorage.multiGet(keys)
        //console.log("data read", data)
        return data.reduce((acc,[key,value])=>{
            acc[key]=value!==null?value:null
            return acc
        },[])
    } catch(err) {
        console.log(err)
    }
}
export const removeData=async()=>{
    try {
        await AsyncStorage.clear()
    } catch(err) {
        console.log(err)
    }
}