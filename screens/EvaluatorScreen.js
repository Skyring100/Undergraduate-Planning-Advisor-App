/*Evaluator page will show the degree evaluation details.*/


import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Course } from '../data_models/Course';
import { Text, TextInput, StyleSheet, Dimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../contexts/UserContext';
import BackButton from '../components/BackButton';
import ProgressBar from '../components/ProgressBar';


export default function EvaluatorScreen() {
    const navigation = useNavigation();

    const {setUser} = useUserStore();

    // TODO: make the user context supply these next few variables
    const [percentage, setPercentage] = useState("67%");
    const possibleCourses = [
        new Course("CPSC100", "Computer Programming", "Learn basic programmin", []),
        new Course("CPSC141", "Discrete Mathematics", "Comp sci math", []),
        new Course("CPSC101", "Computer Programming 2", "Learn object oriented stuff in Java", ["CPSC100"]),
        new Course("CPSC242", "Discrete Math 2", "Even more comp sci math", ["CPSC141"]),
        new Course("FUN101", "Intro to Funology", "Learn to have fun", []),
    ]

    const completedCourses = [
        possibleCourses[0],
        possibleCourses[1],
    ]


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <BackButton/>
                <Text style={styles.titleText}>
                    Let's see where you're at
                </Text>
        
                <ProgressBar full={percentage}/>
                <View style={styles.variableSizeTextHolder}>
                    <Text>You're </Text>
                    <Text style={styles.bigPercentage}>{percentage}</Text> 
                    <Text> of the way to your degree!</Text>
                </View>
                <Text style={{textAlign: "center"}}>Here are some courses you might want to look into tackling next:</Text>
                <View style={styles.listContainer}>
                        {
                            // this behemoth of a list returns names for all the courses
                            // you have every prerequisite for completed
                            possibleCourses.filter(
                                course => course.prereqs.map(prereq => (
                                    completedCourses.map(course => course.id).includes(prereq)
                                    )
                                ).every(Boolean) && course.prereqs.length != 0
                            ).map(course => (
                                <>
                                {/* edit this JSX to change how the courses are displayed */}
                                    <Text>
                                        &bull;  {course.name} ({course.id})
                                    </Text>
                                </>
                                )
                            )
                        }
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        margin: 'auto',
    },
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
    },
    titleText: {
        textAlign: "center",
        color: "black",
        fontWeight: "200",
        fontSize: 30,
        width: "100%",
    },
    variableSizeTextHolder: {
        flexDirection: "row",
        alignItems: "center",
        flexShrink: 1,
    },
    bigPercentage: {
        fontWeight: 300,
        fontSize: 23,
    }
});
