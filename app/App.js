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
import AccountScreen from './screens/AccountScreen';
import AgendaScreen from './screens/AgendaScreen';
import EditDegreeReqScreen from './screens/EditDegreeReqScreen';
import { ScheduleProvider } from './contexts/ScheduleContext';
import DrawerNav from './components/Header/DrawerNav';
import { DrawerProvider, useDrawer } from './contexts/DrawerContext';


const Stack = createNativeStackNavigator();
const hideBar = ['Login', 'Register'];
const hideHeader = ['Login', 'Register', 'Dashboard'];

function AppContent({currentRoute}) {
        const { isDrawerOpen, setIsDrawerOpen } = useDrawer();

        return (
            <>
                {!hideBar.includes(currentRoute) && 
                    <DrawerNav 
                        isOpen={isDrawerOpen}
                        onClose={() => setIsDrawerOpen(false)}/>
                }
                    
                <Stack.Navigator 
                    initialRouteName="Login" 
                    screenOptions={{
                        header: (props) => <AppHeader {...props}/>,
                    }}>
                    <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="Dashboard" component={DashboardScreen} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                    <Stack.Screen name="Planner" component={PlannerScreen} />
                    <Stack.Screen name="Schedule" component={AgendaScreen} />
                    <Stack.Screen name="Requisites" component={RequiredCoursesScreen} />
                    <Stack.Screen name="Evaluator" component={EvaluatorScreen} />
                    <Stack.Screen name="CourseList" component={CourseListScreen} />
                    <Stack.Screen name="AddSection" component={AddSectionScreen}/>
                    <Stack.Screen name="AddCourse" component={AddCourseScreen}/>
                    <Stack.Screen name="Account" component={AccountScreen}/>
                    <Stack.Screen name="EditDegreeReqs" component={EditDegreeReqScreen}/>
                </Stack.Navigator>
                {!hideBar.includes(currentRoute) && <BottomBar/>}
            </>
        );
}


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
                        <DrawerProvider>
                            <SafeAreaProvider>
                                <NavigationContainer
                                    onReady={() => setCurrentRoute('Login')}
                                    onStateChange={(state) => {
                                        const route = state?.routes[state.index]?.name;
                                        if(route) setCurrentRoute(route);
                                    }}>
                                        <AppContent currentRoute={currentRoute} />
                                </NavigationContainer>
                            </SafeAreaProvider>
                        </DrawerProvider>
                    </ScheduleProvider>
                </ThemeProvider>
            </UserProvider>
        </AuthProvider>
    );
}
