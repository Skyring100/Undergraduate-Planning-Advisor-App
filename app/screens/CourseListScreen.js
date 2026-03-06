/*CourseList page will show the list of all available courses.
It will have a search bar to filter courses by name or code.
Each course will have an 'Add to Planner' button that allows users to add the course to their degree planner.*/

import { View, StyleSheet, FlatList, Text, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import degreePlanData from '../data/degree_plans.json'
import BackButton from '../components/BackButton';
import { useThemeText, useThemeBackground } from "../contexts/ThemeContext";

export default function CourseListScreen() {

    // when this is added, use these as style components for text colour instead of #fff and #000
    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const {width, height} = useWindowDimensions();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[{width: width, minHeight: height}, themeBg]}>
                <View style={[themeBg, {alignItems: 'center', justifyContent: 'center'}]}>
                    <BackButton/>
                    <Text style={themeText}>Course List Screen</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
