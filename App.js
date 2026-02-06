
import { StyleSheet, Text, View } from 'react-native';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { DashboardScreen } from './screens/DashboardScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" 
          component={LoginScreen}
          options={{
            headerBackVisible: false
          }} 
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Dashboard"
          component={DashboardScreen}
          options={{
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
