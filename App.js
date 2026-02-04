
import { StyleSheet, Text, View } from 'react-native';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { DashboardScreen } from './screens/DashboardScreen';

const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: LoginScreen,
      options: {title: 'Login Page'},
    },
    Dashboard: {
      screen: DashboardScreen,
      options: {title: 'Dashboard'},
    },
    Register: {
      screen: RegisterScreen,
      options: {title: 'Registration'},
    },
  },
});

const Navigation=createStaticNavigation(RootStack);

export default function App() {
  return( <Navigation /> );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
