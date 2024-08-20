import { createStackNavigator } from '@react-navigation/stack'
import AnalysisScreen from '../screens/analysis/AnalysisScreen'

const SettingStack = createStackNavigator()

export default function AnalysisStackScreen() {
    return (
        <SettingStack.Navigator screenOptions={{ headerShown: false }}>
            <SettingStack.Screen name="analysisScreen" component={AnalysisScreen} />
        </SettingStack.Navigator>
    )
}
