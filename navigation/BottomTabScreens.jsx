import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import HomeScreen from "../screens/HomeScreen"
import SettingScreen from "../screens/SettingScreen"
import TransactionScreen from "../screens/TransactionScreen"
import AccountScreen from "../screens/AccountScreen"
import Analysis from '../screens/Analysis'
import Icon from 'react-native-vector-icons/FontAwesome'

const Tab=createMaterialBottomTabNavigator()

export default function BottomTabScreens() {
    return (
        <Tab.Navigator 
            initialRouteName="homeScreen" 
            activeColor="#438883"
            inactiveColor="#AAAAAA"
            barStyle={{
                backgroundColor: "#FFF",
                height: 80
            }}
            shifting={false}
        >
            <Tab.Screen 
                name="homeScreen" component={HomeScreen}
                options={{
                tabBarLabel: null,
                tabBarIcon: ({ color }) => (
                    <Icon name="home" color={color} size={26} />
                ),
        }}
            />
            <Tab.Screen 
                name="settingScreen" component={SettingScreen}
                options={{
                    tabBarLabel: null,
                    tabBarIcon: ({ color }) => (
                        <Icon name="cog" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen 
                name="accountScreen" component={AccountScreen}
                options={{
                    tabBarLabel: null,
                    tabBarIcon: ({ color }) => (
                        <Icon name="credit-card" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen 
                name="transactionScreen" component={TransactionScreen}
                options={{
                    tabBarLabel: null,
                    tabBarIcon: ({ color }) => (
                        <Icon name="exchange" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen 
                name="analysis" component={Analysis}
                options={{
                    tabBarLabel: null,
                    tabBarIcon: ({ color }) => (
                        <Icon name="bar-chart" color={color} size={26} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}


