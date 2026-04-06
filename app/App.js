import 'react-native-get-random-values';
import { useEffect, useState } from 'react';
import { View, BackHandler, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppHeader from './components/Header/AppHeader';


import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import BottomBar from './components/BottomBar';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import SettingsScreen from './screens/SettingsScreen';
import PlannerScreen from './screens/PlannerScreen';
import EvaluatorScreen from './screens/EvaluatorScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import RequiredCoursesScreen from './screens/RequiredCoursesScreen';
import CourseListScreen from './screens/CourseListScreen';
import AddSectionScreen from './screens/AddSectionScreen';
import AddCourseScreen from './screens/AddCourseScreen';
import { ScheduleProvider } from './contexts/ScheduleContext';


const Stack = createNativeStackNavigator();
const hideBar = ['Login', 'Register'];

export default function App() {

    const [currentRoute, setCurrentRoute] = useState('Login');

    useEffect(() => {

        const onBackPress = () => {

            Alert.alert('Exit App', 'Do you want to exit?', [
                { text: 'Cancel', onPress: () => null, style: 'cancel' },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
            ]);

            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        );

        return () => backHandler.remove();
    }, []);




    return (
        
        <AuthProvider>
            <UserProvider>
                <ThemeProvider>
                    <ScheduleProvider>
                        <SafeAreaProvider>
                            <NavigationContainer
                                onReady={() => setCurrentRoute('Login')}
                                onStateChange={(state) => {
                                    const route = state?.routes[state.index]?.name;
                                    if(route) setCurrentRoute(route);
                                }}>
                                <Stack.Navigator 
                                    initialRouteName="Login" 
                                    screenOptions={{
                                        header: (props) => <AppHeader {...props}/>,
                                    }}>
                                    <Stack.Screen name="Login" component={LoginScreen} />
                                    <Stack.Screen name="Register" component={RegisterScreen} />
                                    <Stack.Screen name="Dashboard" component={DashboardScreen} />
                                    <Stack.Screen name="Settings" component={SettingsScreen} />
                                    <Stack.Screen name="Planner" component={PlannerScreen} />
                                    <Stack.Screen name="Schedule" component={ScheduleScreen} />
                                    <Stack.Screen name="Requisites" component={RequiredCoursesScreen} />
                                    <Stack.Screen name="Evaluator" component={EvaluatorScreen} />
                                    <Stack.Screen name="CourseList" component={CourseListScreen} />
                                    <Stack.Screen name="AddSection" component={AddSectionScreen}/>
                                    <Stack.Screen name="AddCourse" component={AddCourseScreen}/>
                                </Stack.Navigator>
                                {!hideBar.includes(currentRoute) && <BottomBar/>}
                            </NavigationContainer>
                        </SafeAreaProvider>
                    </ScheduleProvider>
                </ThemeProvider>
            </UserProvider>
        </AuthProvider>
)
}
