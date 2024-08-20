import {NavigationContainer, useNavigation} from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'

import StartScreens from "../screens/StartScreen"
import SelectLanguageScreen from "../screens/SelectLanguageScreen"
import LoginScreen from "../screens/auth/LoginScreen"
import RegisterScreen from "../screens/auth/RegisterScreen"
import VerifyCodeScreen from "../screens/auth/VerifyCodeScreen"
import ForgotPassword from "../screens/auth/ForgotPassword"
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen"
import BottomTabScreens from "./BottomTabScreens"
import {  useSelector } from "react-redux"
import { selectIsAuthenticated } from "../redux/authSlice"

const Stack=createStackNavigator()

export default function StackTab() {
    const isAuthenticated=useSelector(selectIsAuthenticated)
    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{ headerShown: false }}
                initialRouteName={isAuthenticated===true?"bottomTabScreen":"startScreen"}
            >
                <Stack.Group>
                    <Stack.Screen name="startScreen" component={StartScreens}/>
                    <Stack.Screen name="selectLanguageScreen" component={SelectLanguageScreen}/>
                    <Stack.Screen name="loginScreen" component={LoginScreen}/>
                    <Stack.Screen name="registerScreen" component={RegisterScreen}/>
                    <Stack.Screen name="verifyCodeScreen" component={VerifyCodeScreen}/>
                    <Stack.Screen name="forgotPassword" component={ForgotPassword}/>
                    <Stack.Screen name="resetPasswordScreen" component={ResetPasswordScreen}/>
                </Stack.Group>
                <Stack.Screen name="bottomTabScreen" component={BottomTabScreens}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

