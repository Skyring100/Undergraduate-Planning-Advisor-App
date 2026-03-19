/*CourseList page will show the list of all courses.
It will have a search bar to filter courses by name or CRN.
Each course will have an 'Add to Planner' button that allows users to add the course to their degree planner.*/

import { View, StyleSheet, FlatList, Text, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import degreePlanData from '../data/degree_plans.json'
import BackButton from '../components/BackButton';
import { useThemeText, useThemeBackground } from "../contexts/ThemeContext";
import Collapsible from 'react-native-collapsible';
import { useEffect, useState } from 'react';
import CollapsibleView from '../components/CollapsibleView';
import { getCourses } from '../services/courseService';

export default function CourseListScreen() {

    // when this is added, use these as style components for text colour instead of #fff and #000
    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const {width, height} = useWindowDimensions();

    const [courses, setCourses] = useState(null);
    
    useEffect(() => {
        getCourses().then((apiResult) => {
            alert("API call was good");

            if (apiResult.success){
                setCourses(apiResult.data);
            }else{
                alert("API call was unsuccessful");
                setCourses([]);
            }
        });

    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[{width: width, minHeight: height}, themeBg]}>
                
                <View style={[themeBg, {alignItems: 'center', justifyContent: 'center'}]}>
                    <BackButton/>

                    <CollapsibleView>
                        <Text>Math</Text>
                        <Text>Science</Text>
                    </CollapsibleView>
                </View>

                <View style={[themeBg, {alignItems: 'center', justifyContent: 'center'}]}>
                    <FlatList

                    />
                </View>
                

            </SafeAreaView>
        </SafeAreaProvider>
    )
}
