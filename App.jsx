import {   View } from 'react-native'
import { Provider } from 'react-redux'
import store from './redux/store'
import StackTab from './navigation/StackTab'
import i18n from './i18n/i18n'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { useEffect } from 'react'


Notifications.setNotificationHandler({
  handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
  }),
})

export default function App() {
  //allow permission notification
  useEffect(() => {
    // Request permission and get token for notifications
    const getNotificationPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync()
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync()
      }
    }
    getNotificationPermissions()
    // Subscribe to notifications
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification)
    })
    return () => subscription.remove()
  }, [])
  return (  
    <Provider store={store}>
      <View className="flex-1">
        <StackTab/>
      </View>
    </Provider>
  )
}
