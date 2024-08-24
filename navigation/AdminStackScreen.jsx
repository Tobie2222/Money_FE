import { createStackNavigator } from '@react-navigation/stack'
import DashBroad from '../screens/admin/DashBroad'
import Notification from '../screens/admin/Notification'

const AdminStack = createStackNavigator()

export default function AdminStackScreen() {
    return (
        <AdminStack.Navigator screenOptions={{ headerShown: false }}>
            <AdminStack.Screen name="dashBroad" component={DashBroad} />
            <AdminStack.Screen name="notification" component={Notification} />
        </AdminStack.Navigator>
    )
}
