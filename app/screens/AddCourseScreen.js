import { View, Text, Pressable, Animated } from 'react-native';
import BackButton from '../components/BackButton';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
<<<<<<< HEAD
import PlannerTabs from '../components/Planner/TabBar';
=======
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import RequiredCoursesScreen from './RequiredCoursesScreen';
import CourseListScreen from './CourseListScreen';
import { useLinkBuilder } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
>>>>>>> 789787a83c3f9a058436c419a3910b09ed5b562f


function TabBar({ state, descriptors, navigation, position }) {

    const { buildHref } = useLinkBuilder();
    
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                        
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const inputRange = state.routes.map((_, i) => i);
                const opacity = position.interpolate({
                    inputRange,
                    outputRange: inputRange.map((i) => (i === index ? 1 : 0.5)),
                });

                return (
                    <PlatformPressable
                        key={route.key}
                        href={buildHref(route.name, route.params)}
                        aria-label={options.tabBarAccessibilityLabel}
                        aria-selected={isFocused}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, padding: 16, alignItems: 'center' }}
                    >
                        <Animated.Text style={{ opacity, color: isFocused ? '#673ab7' : '#222' }}>
                        {label}
                        </Animated.Text>
                    </PlatformPressable>
                );
            })}
        </View>
    );
}

const Tab = createMaterialTopTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
            <Tab.Screen name="Required Courses" component={RequiredCoursesScreen} />
            <Tab.Screen name="All Courses" component={CourseListScreen} />
        </Tab.Navigator>
    )
}
   
export default function AddCourseScreen() {
    const navigation = useNavigation();
    

    return (
        <SafeAreaProvider>
<<<<<<< HEAD
            <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <PlannerTabs/>
                <BackButton/>
                <Text>Add Course Screen</Text>
=======
            <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
                <Tabs />

>>>>>>> 789787a83c3f9a058436c419a3910b09ed5b562f
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
