/*Planner page will show the degree planner details.
It will have a drop down for selecting which one the user wants to view.
It will show the courses in a table format.*/

import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CourseButton from '../components/CourseListButton';
import { Course } from '../data_models/Course';
import CourseListButton from '../components/CourseListButton';
import BackButton from '../components/BackButton';


export default function PlannerScreen() {

    const degreePlanData = [
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
                },
                {
                    semesterNumber: 3,
                    courses: [
                        new Course("FUN101", "Intro to Funology", "Learn to have fun", [])
                    ]
                }
            ]
        },
        {
            yearNumber: 3,
            semesters: [
                {
                    semesterNumber: 1,
                    courses: [
                        new Course("GEOG204", "Intro to GIS", "Learn basics of GIS", []),
                        new Course("MATH100", "Calculus 1", "Derivatives, integrals", []),
                        new Course("CPSC200", "Algorithm analysis", "Runtime and storage complexity", ["CPSC101"])
                    ]
                }
            ]
        },
        {
            yearNumber: 4,
            semesters: [
                {
                    semesterNumber: 2,
                    courses: [
                        new Course("CPSC444", "Computer Networks", "Protocols like TCP and UDP and also learning about OSI model", []),
                    ]
                }
            ]
        },
    ]

    return(
        <SafeAreaProvider>
            <SafeAreaView style={{flexDirection: 'column', padding: 10,flex: 1}}>
                
                <View style={{alignItems: 'center', justifyContent: 'center', }}> 
                    <BackButton/>
                    {
                        degreePlanData.map(y => (
                            <View key={y.yearNumber}>
                                <YearSection yearNumber={y.yearNumber} semesterData={y.semesters}></YearSection>
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
function YearSection({yearNumber, semesterData}) {
    
    var semesterWidth;

    switch(semesterData.length){
        case 2:
            semesterWidth = '50%'
            break;
        case 3:
            semesterWidth = '33.333%'
            break;
        case 1:
            semesterWidth = '100%'
            break;
    }

    return (
        <View>
            <Text style={styles.yearHeader}>Year {yearNumber}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                {
                    semesterData.map(sem => (
                        <View key={sem.semesterNumber} style={{width: semesterWidth}}>
                            <Text style={styles.semesterHeader}>Semester {sem.semesterNumber}</Text>
                            <SemesterCourses courses={sem.courses}></SemesterCourses>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

function SemesterCourses({courses}){
    return (
        <View>
            <ScrollView>
                {
                    courses.map(c=>(
                        <View key={c.id}>
                            <CourseListButton course={c}></CourseListButton>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    );
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
