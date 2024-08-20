import { createStackNavigator } from '@react-navigation/stack'
import AccountScreen from '../screens/account/AccountScreen'

const SettingStack = createStackNavigator()

export default function AccountStackScreen() {
    return (
        <SettingStack.Navigator screenOptions={{ headerShown: false }}>
            <SettingStack.Screen name="accountScreen" component={AccountScreen} />
        </SettingStack.Navigator>
    )
}
