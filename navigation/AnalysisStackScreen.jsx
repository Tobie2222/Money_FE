import { createStackNavigator } from '@react-navigation/stack'
import AnalysisScreen from '../screens/analysis/AnalysisScreen'
import TranDepositScreen from '../screens/analysis/TranDepositScreen'
import TranIncome from '../screens/analysis/TranIncomeScreen'
import TranExpenseScreen from '../screens/analysis/TranExpenseScreen'
import FunScreen from '../screens/analysis/FunScreen'

const SettingStack = createStackNavigator()

export default function AnalysisStackScreen() {
    return (
        <SettingStack.Navigator screenOptions={{ headerShown: false }}>
            <SettingStack.Screen name="funScreen" component={FunScreen} />
            <SettingStack.Screen name="analysisScreen" component={AnalysisScreen} />
            <SettingStack.Screen name="tranDepositScreen" component={TranDepositScreen} />
            <SettingStack.Screen name="tranIncome" component={TranIncome} />
            <SettingStack.Screen name="tranExpenseScreen" component={TranExpenseScreen} />
        </SettingStack.Navigator>
    )
}
