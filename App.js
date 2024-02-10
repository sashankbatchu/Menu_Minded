import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './Screens/Welcome';
import Camera from './Screens/Camera';
import Test from './Screens/Test';
import Categories from './Screens/Categories';



const Stack = createNativeStackNavigator();
const App = () => {
  const handleCodeFilled = code => {
    Alert.alert('Code entered', code);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
      headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="Camera" component={Camera}/>
        <Stack.Screen name="Test" component={Test}/>
        <Stack.Screen name="Categories" component={Categories}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
