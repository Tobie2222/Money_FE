import { createStackNavigator } from '@react-navigation/stack'
import AccountScreen from '../screens/account/AccountScreen'
import AccountDetailScreen from '../screens/account/AccountDetailScreen'
import CreateAccountScreen from '../screens/account/CreateAccountScreen'
import CreateSaving from '../screens/account/CreateSaving'
import DepositMoneySavingScreen from '../screens/account/DepositMoneySavingScreen'
import SavingDetailScreen from '../screens/account/SavingDetailScreen'

const SettingStack = createStackNavigator()

export default function AccountStackScreen() {
    return (
        <SettingStack.Navigator screenOptions={{ headerShown: false }}>
            <SettingStack.Screen name="accountScreen" component={AccountScreen} />
            <SettingStack.Screen name="accountDetailScreen" component={AccountDetailScreen} />
            <SettingStack.Screen name="createAccountScreen" component={CreateAccountScreen} />
            <SettingStack.Screen name="createSavingScreen" component={CreateSaving} />
            <SettingStack.Screen name="depositMoneySavingScreen" component={DepositMoneySavingScreen} />
            <SettingStack.Screen name="savingDetailScreen" component={SavingDetailScreen} />
        </SettingStack.Navigator>
    )
}
