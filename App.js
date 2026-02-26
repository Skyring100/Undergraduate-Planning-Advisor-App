
import { StyleSheet, Button, Text } from 'react-native';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppHeader from './components/AppHeader';
import { UserProvider } from './contexts/UserContext';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import SettingsScreen from './screens/SettingsScreen';
import PlannerScreen from './screens/PlannerScreen';
import EvaluatorScreen from './screens/EvaluatorScreen';
import { ThemeProvider } from './contexts/ThemeContext';
import ScheduleScreen from './screens/ScheduleScreen';
import CourseListScreen from './screens/CourseListScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{
              header: (props) => <AppHeader {...props}/>,
            }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Planner" component={PlannerScreen} />
            <Stack.Screen name="Schedule" component={ScheduleScreen} />
            <Stack.Screen name="Courses" component={CourseListScreen} />
            <Stack.Screen name="Evaluator" component={EvaluatorScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </ThemeProvider>
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
