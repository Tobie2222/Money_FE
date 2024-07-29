import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import StartScreens from './screens/StartScreen';

export default function App() {
  return (  
    <Provider store={store}>
      <View className="flex-1">
        <StartScreens/>
      </View>
    </Provider>
  );
}


