import {   View } from 'react-native'
import { Provider } from 'react-redux'
import store from './redux/store'
import StackTab from './navigation/StackTab'
import i18n from './i18n/i18n'

export default function App() {
  return (  
    <Provider store={store}>
      <View className="flex-1">
        <StackTab/>
      </View>
    </Provider>
  )
}
