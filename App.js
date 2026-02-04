
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from './screens/LoginScreen';

const Stack = createNativeStackNavigator() ;

export default function App() {
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name="LoginScreen"
        component={LoginView}
      />
    </Stack.Navigator>
  </NavigationContainer>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
