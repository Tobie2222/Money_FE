import { createStackNavigator } from '@react-navigation/stack'
import TransactionScreen from '../screens/transaction/TransactionScreen'

const SettingStack = createStackNavigator()

export default function TransactionStackScreen() {
    return (
        <SettingStack.Navigator screenOptions={{ headerShown: false }}>
            <SettingStack.Screen name="transactionScreen" component={TransactionScreen} />
        </SettingStack.Navigator>
    )
}
