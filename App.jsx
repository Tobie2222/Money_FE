import {   View } from 'react-native'
import { Provider } from 'react-redux'
import store from './redux/store'
import StackTab from './navigation/StackTab'

export default function App() {
  return (  
    <Provider store={store}>
      <View className="flex-1">
        <StackTab/>
      </View>
    </Provider>
  )
}
