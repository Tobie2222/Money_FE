import { createStackNavigator } from '@react-navigation/stack'
import NotificationScreen from '../screens/admin/NotificationScreen'
import DashBroadScreen from '../screens/admin/DashBroadScreen'
import CreateUserScreen from '../screens/admin/CreateUserScreen'

const AdminStack = createStackNavigator()

export default function AdminStackScreen() {
    return (
        <AdminStack.Navigator screenOptions={{ headerShown: false }}>
            <AdminStack.Screen name="dashBroadScreen" component={DashBroadScreen} />
            <AdminStack.Screen name="createUserScreen" component={CreateUserScreen} />
            <AdminStack.Screen name="notificationScreen" component={NotificationScreen} />
        </AdminStack.Navigator>
    )
}
