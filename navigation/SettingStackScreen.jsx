import { createStackNavigator } from '@react-navigation/stack'
import SettingScreen from '../screens/setting/SettingScreen.jsx'
import ProfileScreen from '../screens/setting/ProfileScreen'
import ChangePasswordScreen from '../screens/setting/ChangePasswordScreen'
import ExpenseTypeScreen from '../screens/setting/ExpenseTypeScreen'
import SelectLanguageScreen from '../screens/setting/SelectLanguageScreen'
import CreateExpenseTypeScreen from '../screens/setting/CreateExpenseTypeScreen'
import CreateIncomeTypeScreen from '../screens/setting/CreateIncomeTypeScreen'
import IncomeTypeScreen from '../screens/setting/IncomeTypeScreen.jsx'

const SettingStack = createStackNavigator()

export default function SettingStackScreen() {
    return (
        <SettingStack.Navigator screenOptions={{ headerShown: false }}>
            <SettingStack.Screen name="settingScreen" component={SettingScreen} />
            <SettingStack.Screen name="profileScreen" component={ProfileScreen} />
            <SettingStack.Screen name="changePasswordScreen" component={ChangePasswordScreen} />
            <SettingStack.Screen name="expenseTypeScreen" component={ExpenseTypeScreen} />
            <SettingStack.Screen name="incomeTypeScreen" component={IncomeTypeScreen} />
            <SettingStack.Screen name="selectLanguageScreen" component={SelectLanguageScreen} />
            <SettingStack.Screen name="createExpenseTypeScreen" component={CreateExpenseTypeScreen} />
            <SettingStack.Screen name="createIncomeTypeScreen" component={CreateIncomeTypeScreen} />
        </SettingStack.Navigator>
    )
}
