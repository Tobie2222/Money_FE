import { createStackNavigator } from '@react-navigation/stack'
import SettingScreen from '../screens/setting/SettingScreen'
import ProfileScreen from '../screens/setting/ProfileScreen'

const SettingStack = createStackNavigator()

export default function SettingStackScreen() {
    return (
        <SettingStack.Navigator screenOptions={{ headerShown: false }}>
            <SettingStack.Screen name="settingScreen" component={SettingScreen} />
            <SettingStack.Screen name="profileScreen" component={ProfileScreen} />
        </SettingStack.Navigator>
    )
}
