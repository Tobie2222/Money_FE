import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import  HomeStackScreen  from './HomeStackScreen'
import Icon from 'react-native-vector-icons/FontAwesome'
import TransactionStackScreen from './TransactionStackScreen'
import SettingStackScreen from './SettingStackScreen'

const Tab=createMaterialBottomTabNavigator()



export default function BottomTabScreens() {
    return (
        <Tab.Navigator 
            initialRouteName="homeScreen" 
            activeColor="#438883"
            inactiveColor="#AAAAAA"
            barStyle={{
                backgroundColor: "#FFF",
                borderTopColor: "#DCDFE3",
                borderTopWidth: 1,
                height: 70,
            }}
            shifting={false}
            screenOptions={{
                tabBarColor: 'red'
            }}
        >
            <Tab.Screen 
                name="homeStack" 
                component={HomeStackScreen}
                options={{
                    tabBarLabel: null,
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="transactionStack" component={TransactionStackScreen}
                options={{
                    tabBarLabel: null,
                    tabBarIcon: ({ color }) => (
                        <Icon name="exchange" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen 
                name="settingStack" component={SettingStackScreen}
                options={{
                    tabBarLabel: null,
                    tabBarIcon: ({ color }) => (
                        <Icon name="cog" color={color} size={26} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}


