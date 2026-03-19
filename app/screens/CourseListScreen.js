/*CourseList page will show the list of all courses.
It will have a search bar to filter courses by name or CRN.
Each course will have an 'Add to Planner' button that allows users to add the course to their degree planner.*/

import { View, StyleSheet, FlatList, Text, ScrollView, useWindowDimensions, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import degreePlanData from '../data/degree_plans.json'
import BackButton from '../components/BackButton';
import { useThemeText, useThemeBackground,
    useFirstColour, useSecondColour, useThirdColour} from "../contexts/ThemeContext";
import Collapsible from 'react-native-collapsible';
import { useEffect, useState } from 'react';
import CollapsibleView from '../components/CollapsibleView';
import { getCourses } from '../services/courseService';
import CoursePopUp from '../components/Requistes/CoursePopUp';

import all_courses from '../data/UNBC_course_data.json'




export default function CourseListScreen() {

    // when this is added, use these as style components for text colour instead of #fff and #000 -- no lol
    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const firstColour = useFirstColour();
    const {width, height} = useWindowDimensions();

    const [courses, setCourses] = useState(null);
    const [filteredCourseTypes, setFilteredCourseTypes] = useState([]);
    const [activeType, setActiveType] = useState("All");

    


    useEffect(() => {
        getCourses().then((apiResult) => {
            alert("API call was good");

            if (apiResult.success){
                setCourses(apiResult.data);
                setFilteredCourseTypes([...new Set(courses.map(course => course.id.slice(0)))].sort());
                
            }else{
                alert("API call was unsuccessful");
                setCourses([]);
            }
        });

    }, []);

    const course_type = ["All"].concat(filteredCourseTypes);

    const filteredCourses = activeType === "All"
        ? courses
        : courses.filter(course => course.id.trim().startsWith(activeType));
        
        
    

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[{width: width, minHeight: height}, themeBg]}>
                
                <View style={[{alignItems: 'center', justifyContent: 'center', backgroundColor: '#4b4b4b'}]}>
                    <BackButton/>

                    <CollapsibleView>
                        <ScrollView style={styles.filterScrollView}>
                            <View style={styles.filterRow}>
                                {course_type.map(type => (
                                    <TouchableOpacity
                                        key={type}
                                        onPress={() => setActiveType(type)}
                                        style={[styles.filter, activeType === type && styles.filterActive]}
                                    >
                                        <Text style={[styles.filterText, activeType === type && styles.filterTextActive]}>
                                            {type}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </CollapsibleView>
                </View>

                <FlatList style={styles.FlatList}
                    data={filteredCourses}
                    renderItem={({item}) => (
                        <View style={styles.contentBackground}>
                            <View style={{backgroundColor: firstColour.backgroundColor, height: 5, width: 'auto'}}/>
                            <Text style={styles.courseTitle}>{item.id}</Text>
                            <Text style={styles.courseText}>{item.title}</Text>
                            <Text style={styles.courseText}>{item.prereq}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={
                        <SafeAreaView style={{marginBottom: 310}}>
                        </SafeAreaView>

                    }
                />
                

            </SafeAreaView>
        </SafeAreaProvider>
    )
}








const styles = StyleSheet.create({
    
    courseTitle: {
        color: '#ffffff',
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    courseText: {
        color: '#ffffff',
        marginBottom: 10,
        textAlign: 'center',
    },
    contentBackground: {
        backgroundColor: '#4b4b4b',
        borderRadius: 14,
        borderColor: '#6f6f6f',
        borderWidth: 3,
        margin: 5,
        overflow: 'hidden'
    },
    FlatList: {
        backgroundColor: '#1a1a1a',
    },
    filterRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    filter: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#6f6f6f',
        backgroundColor: '#2b2b2b',
        alignItems: 'center',
        width: 'auto'
    },
    filterActive: {
        backgroundColor: '#008cff',
    },
    filterText: {
        fontSize: 13,
        color: '#aaa',
    },
    filterTextActive: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '500',
    },
    filterScrollView: {
        height: 150
    }
});