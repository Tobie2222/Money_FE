import {NavigationContainer} from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'
import StartScreen from "../screens/StartScreen"
import SelectLanguageScreen from "../screens/SelectLanguageScreen"
import LoginScreen from "../screens/auth/LoginScreen"
import RegisterScreen from "../screens/auth/RegisterScreen"
import ForgotPassword from "../screens/auth/ForgotPassword"
import VerifyCodeScreen from "../screens/auth/VerifyCodeScreen"
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen"
import BottomTabScreens from "./BottomTabScreens"
import AdminStackScreen from "./AdminStackScreen"

const Stack=createStackNavigator()

export default function StackTab() {

    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{ headerShown: false }}
            >
                <Stack.Group>
                    <Stack.Screen name="startScreen" component={StartScreen}/>
                    <Stack.Screen name="selectLanguageScreen" component={SelectLanguageScreen}/>
                    <Stack.Screen name="loginScreen" component={LoginScreen}/>
                    <Stack.Screen name="registerScreen" component={RegisterScreen}/>
                    <Stack.Screen name="verifyCodeScreen" component={VerifyCodeScreen}/>
                    <Stack.Screen name="forgotPassword" component={ForgotPassword}/>
                    <Stack.Screen name="resetPasswordScreen" component={ResetPasswordScreen}/>
                </Stack.Group>
                <Stack.Screen name="bottomTabScreen" component={BottomTabScreens}/>
                <Stack.Screen name="adminStackScreen" component={AdminStackScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

