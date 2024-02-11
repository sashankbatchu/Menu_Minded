import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './Screens/Welcome';
import Cam from './Screens/Cam';
import Categories from './Screens/Categories';
import AllergenPage from './Screens/AllergenPage';
import RestrictionsPage from './Screens/RestrictionsPage';
import NutritionalGoalsPage from './Screens/NutritionalGoalsPage';
import Results from './Screens/Results';
import Test from './Screens/Test';

const Stack = createNativeStackNavigator();
const App = () => {
  const handleCodeFilled = code => {
    Alert.alert('Code entered', code);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
        <Stack.Screen name="Cam" component={Cam} options={{ headerShown: false }}/>
        <Stack.Screen name="NutritionalGoalsPage" component={NutritionalGoalsPage} options={{ headerShown: false }}/>
        <Stack.Screen name="AllergenPage" component={AllergenPage} options={{ headerShown: false }}/>
        <Stack.Screen name="RestrictionsPage" component={RestrictionsPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }}/>
        <Stack.Screen name="Results" component={Results} options={{ headerShown: false }}/>
        <Stack.Screen name="Test" component={Test} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
