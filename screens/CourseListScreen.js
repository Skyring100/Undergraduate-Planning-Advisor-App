/*CourseList page will show the list of all available courses.
It will have a search bar to filter courses by name or code.
Each course will have an 'Add to Planner' button that allows users to add the course to their degree planner.*/

import { View, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import degreePlanData from '../data/degree_plans.json'

export default function CourseListScreen() {

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View>
                    <Text>Course List Screen</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}