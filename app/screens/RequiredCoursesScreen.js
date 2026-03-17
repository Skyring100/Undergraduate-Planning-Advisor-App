/*RequiredCourses page will show the list of courses the user is required to take for their degree program.
It will also show what electives they have chosen for each degree planner.
It will have a dropdown to select different degree planners and view the courses accordingly.
There will be a button that will navigate to the CourseList page.*/ 

import { View, StyleSheet, FlatList, Text, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import degreePlanData from '../data/degree_plans.json'
import BackButton from '../components/BackButton';
import { useThemeText, useThemeBackground } from "../contexts/ThemeContext";
import AllCoursesButton from '../components/Requistes/AllCoursesButton';

export default function RequiredCoursesScreen() {
    // when this is added, use these as style components for text colour instead of #fff and #000
        const themeText = useThemeText();
        const themeBg = useThemeBackground();
        const {width, height} = useWindowDimensions();
    
        return (
            <SafeAreaProvider>
                <SafeAreaView style={[{width: width, height: height}, themeBg]}>
                    <View style={[themeBg, {alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row', marginRight: 20}]}>
                        <BackButton/>
                        <AllCoursesButton/>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        )
}