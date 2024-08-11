import {NavigationContainer} from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from "../screens/HomeScreen"
import StartScreens from "../screens/StartScreen"
import SelectLanguageScreen from "../screens/SelectLanguageScreen"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import VerifyCodeScreen from "../screens/VerifyCodeScreen"
import ForgotPassword from "../screens/ForgotPassword"
import ResetPasswordScreen from "../screens/ResetPasswordScreen"
import BottomTabScreens from "./BottomTabScreens"
const Stack=createStackNavigator()

export default function StackTab() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Group>
                    <Stack.Screen name="startScreen" component={StartScreens}/>
                    <Stack.Screen name="selectLanguageScreen" component={SelectLanguageScreen}/>
                    <Stack.Screen name="loginScreen" component={LoginScreen}/>
                    <Stack.Screen name="registerScreen" component={RegisterScreen}/>
                    <Stack.Screen name="verifyCodeScreen" component={VerifyCodeScreen}/>
                    <Stack.Screen name="forgotPassword" component={ForgotPassword}/>
                    <Stack.Screen name="resetPasswordScreen" component={ResetPasswordScreen}/>
                </Stack.Group>

                <Stack.Screen name="homeScreen" component={HomeScreen}/>
                <Stack.Screen name="bottomTabScreen" component={BottomTabScreens}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

