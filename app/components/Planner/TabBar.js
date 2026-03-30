import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RequiredCoursesScreen from '../../screens/RequiredCoursesScreen';
import CourseListScreen from '../../screens/CourseListScreen'; 
import { View, Animated } from 'react-native';
import { PlatformPressable } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';

function TabBar({ state, descriptors, navigation, position }) {

    const { buildHref } = useLinkBuilder();
    
    return (
        <View style={{ flexdirection: 'row' }}>
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

export default function PlannerTabs() {
    return (
        <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
            <Tab.Screen name="Requirements" component={RequiredCoursesScreen} />
            <Tab.Screen name="All Courses" component={CourseListScreen} />
        </Tab.Navigator>
    );
}