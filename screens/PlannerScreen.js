/*Planner page will show the degree planner details.
It will have a drop down for selecting which one the user wants to view.
It will show the courses in a table format.*/

import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CourseButton from '../components/CourseButton';
import { Course } from '../data_models/Course';


export default function PlannerScreen() {

    const courseData = [
        {
            yearNumber: 1,
            semesters: [
                {
                    semesterNumber: 1,
                    courses: [
                        new Course("CPSC100", "Computer Programming", "Learn basic programmin", []),
                        new Course("CPSC141", "Discrete Mathematics", "Comp sci math", []),
                    ]
                },
                {
                    semesterNumber: 2,
                    courses: [
                        new Course("CPSC101", "Computer Programming 2", "Learn object oriented stuff in Java", ["CPSC100"]),
                        new Course("CPSC242", "Discrete Math 2", "Even more comp sci math", ["CPSC141"])
                    ]
                }
            ]
        },
        {
            yearNumber: 2,
            semesters: [
                {
                    semesterNumber: 1,
                    courses: [
                        new Course("CPSC100", "Computer Programming", "Learn basic programmin", []),
                        new Course("CPSC141", "Discrete Mathematics", "Comp sci math", []),
                    ]
                },
                {
                    semesterNumber: 2,
                    courses: [
                        new Course("CPSC101", "Computer Programming 2", "Learn object oriented stuff in Java", ["CPSC100"]),
                        new Course("CPSC242", "Discrete Math 2", "Even more comp sci math", ["CPSC141"])
                    ]
                }
            ]
        }
    ]

    return(
        <SafeAreaProvider>
            <SafeAreaView style={{flexDirection: 'column', padding: 10,flex: 1}}>
                <View> 
                    {
                        courseData.map(y => (
                            <View id={y.yearNumber}>
                                <YearSection yearNumber={y.yearNumber} sem1Courses={y.semesters[0].courses} sem2Courses={y.semesters[1].courses}></YearSection>
                            </View>
                        ))
                    }
                </View>
            </SafeAreaView >
        </SafeAreaProvider>
    );
}

/**
 *  Adds a UI section with year information in the planner
 * @param {*} yearData Object with year data consisting of the year number and each semester courses
 * @returns 
 */
function YearSection({yearNumber, sem1Courses, sem2Courses, summerCourses}) {
    
    const semesterWidth = (summerCourses == null) ? '50%' : '33.333%'

    return (
        <View>
            <Text style={styles.yearHeader}>Year {yearNumber}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                <View style={{width: semesterWidth}}>
                    <Text style={styles.semesterHeader}>Semester 1</Text>
                    <ScrollView>
                        {
                            sem1Courses.map(c=>(
                                <View key={c.id}>
                                    <CourseButton course={c}></CourseButton>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
                <View style={{width: semesterWidth}}>
                    <Text style={styles.semesterHeader}>Semester 2</Text>
                    <ScrollView>
                        {
                            sem2Courses.map(c=>(
                                <View key={c.id}>
                                    <CourseButton course={c}></CourseButton>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    yearHeader:{
        color: '#060a03ff',
        fontWeight: 'bold',
        fontSize: 25,
        backgroundColor: '#3cceac',
        width: '100%',
        textAlign: 'center'
    },
    semesterHeader:{
        color: '#ffffffff',
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: '#078d6e',
        textAlign: 'center',
        borderRightWidth: 1,
        borderLeftWidth: 1
    },
    semesterSection: {
        width: '50%'
    }
});