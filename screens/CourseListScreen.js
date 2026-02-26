/*CourseList page will show the list of all available courses.
It will have a search bar to filter courses by name or code.
Each course will have an 'Add to Planner' button that allows users to add the course to their degree planner.*/

import { View, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function CourseListScreen() {

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
        }
    ]

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