import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/home/HomeScreen'
import NotificationScreen from "../screens/home/NotificationScreen"

const HomeStack = createStackNavigator()

export default function HomeStackScreen() {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="homeScreen" component={HomeScreen} />
            <HomeStack.Screen name="notificationScreen" component={NotificationScreen} />
        </HomeStack.Navigator>
    );
}
