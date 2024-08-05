import {NavigationContainer} from "@react-navigation/native"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import HomeScreen from "../screens/HomeScreen"
import SettingScreen from "../screens/SettingScreen"
import TransactionScreen from "../screens/TransactionScreen"
import AccountScreen from "../screens/AccountScreen"

const Tab=createMaterialBottomTabNavigator()

export default function BottomTabScreens() {
    return (
        <NavigationContainer>
            <Tab.Navigator >
                <Tab.Screen name="homeScreen" component={HomeScreen}/>
                <Tab.Screen name="settingScreen" component={SettingScreen}/>
                <Tab.Screen name="transactionScreen" component={TransactionScreen}/>
                <Tab.Screen name="accountScreen" component={AccountScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

