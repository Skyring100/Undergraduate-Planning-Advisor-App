/*Evaluator page will show the degree evaluation details.*/


import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, StyleSheet, Dimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../contexts/UserContext';
import BackButton from '../components/BackButton';
import ProgressBar from '../components/ProgressBar';
import possibleCourses from '../data/possible_courses.json'
import completedCourses from '../data/completed_courses.json'

export default function EvaluatorScreen() {
    const navigation = useNavigation();

    const {setUser} = useUserStore();

    // TODO: make the user context supply these next few variables
    const progressBarPercent = (completedCourses.length/possibleCourses.length)*100;
    const [percentage, setPercentage] = useState(progressBarPercent+"%");

    // take all the courses the user has every prerequisite for completed
    const nextCourses = possibleCourses.filter(
                                course => course.prereqs.map(prereq => (
                                    completedCourses.map(course => course.id).includes(prereq)
                                    )
                                ).every(Boolean) && course.prereqs.length != 0
                                && !completedCourses.map(other => other.id).includes(course.id)
                            );
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
                <Text style={{textAlign: "center"}}>{
                    nextCourses.length == 0 ? "Looks like none of your courses have a next step."
                    : "Now try tackling these courses here:"
                }</Text>
                <View style={styles.listContainer}>
                        {
                            nextCourses.map(course => (
                                <View key={course.id}>
                                {/* edit this JSX to change how the courses are displayed */}
                                    <Text>
                                        &bull;  {course.title} ({course.id})
                                    </Text>
                               </View>
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
