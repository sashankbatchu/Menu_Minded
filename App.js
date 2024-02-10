import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './Screens/Welcome';
import AllergenPage from './Screens/AllergenPage';
import RestrictionsPage from './Screens/RestrictionsPage';
import NutritionalGoalsPage from './Screens/NutritionalGoalsPage';

const Stack = createNativeStackNavigator();
const App = () => {
  const handleCodeFilled = code => {
    Alert.alert('Code entered', code);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="NutritionalGoalsPage" component={NutritionalGoalsPage}/>
        <Stack.Screen name="AllergenPage" component={AllergenPage}/>
        <Stack.Screen name="RestrictionsPage" component={RestrictionsPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;