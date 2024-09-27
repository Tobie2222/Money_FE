import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data to AsyncStorage
export const saveData = async (key, data) => {
    try {
        const jsonData = JSON.stringify(data); // Convert data to a JSON string
        await AsyncStorage.setItem(key, jsonData);
    } catch (err) {
        console.log(err);
    }
};
// Read data from AsyncStorage
export const readData = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : null; // Parse the string into JSON if it exists
    } catch (err) {
        console.log(err);
    }
};

// Remove data from AsyncStorage
export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log(`${key} đã bị xóa khỏi AsyncStorage`);
        return true;
    } catch (err) {
        console.log(err);
    }
};

// Clear all data from AsyncStorage
export const removeAllData = async () => {
    try {
        await AsyncStorage.clear();
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};