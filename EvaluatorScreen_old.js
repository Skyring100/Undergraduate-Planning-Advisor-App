/*Evaluator page will show the degree evaluation details.*/


import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../contexts/UserContext';
import BackButton from '../components/BackButton';
import ProgressBar from '../components/Evaluator/ProgressBar';
import completedCourses from '../data/completed_courses.json'
import {useThemeText, useThemeBackground} from "../contexts/ThemeContext";
import {useWindowDimensions} from "react-native";
import AddCourseButton from "../components/Evaluator/AddCourseButton.js";
import Animated, {SlideInDown, Easing, useSharedValue, withTiming, useDerivedValue} from "react-native-reanimated";
import {ReText} from "react-native-redash";
import {getPrereqsOf, checkPrereqs, getAllCourses} from "../services/courseService";

export default function EvaluatorScreen() {
    const navigation = useNavigation();
    const [possibleCourses, setPossibleCourses] = useState([]);
    const [progressBarPercent, setProgressBarPercent] = useState(0);
    

    const {setUser} = useUserStore();
    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const {width} = useWindowDimensions();

    // TODO: make the user context supply these next few variables
    const number = useSharedValue(0);
    const percentageText = useDerivedValue(() => {return "" + number.value.toFixed(4) + "%";});

    useEffect(() => {(async () => {
        console.log("WE'RE CALLING THIS FUCNTION GUys");
        const resp = await getAllCourses();
        const data = resp.data;
        console.log("Here is the data");
        console.log(data);
        setPossibleCourses(data);
        setProgressBarPercent((completedCourses.length/data.length)*100);
        console.log(number);
        setTimeout(() => {
            number.value = withTiming(progressBarPercent, {
                duration: 2000,
                easing: Easing.out(Easing.exp),
        })}, 10000);
    })()}, [])


    // take all the courses the user has every prerequisite for completed
    /*
    const nextCourses = possibleCourses.filter(
                                course => checkIfPrereqsMatchCourse(
                                    completedCourses.map(comp => comp.id), course.id
                                ) && course.prereqs.length != 0
                                && !completedCourses.map(other => other.id).includes(course.id)
                            );
                            */
    const nextCourses = possibleCourses.filter(course => {
        const matches = checkPrereqs(completedCourses.map(comp => comp.id), course.id);
        return matches && !completedCourses.map(other => other.id).includes(course.id);
    });

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, themeBg, {width: width}]}>
                <BackButton/>
                <Text style={[styles.titleText, themeText]}>
                    Let's see where you're at
                </Text>
        
                <ProgressBar full={progressBarPercent}/>
                <View style={styles.variableSizeTextHolder}>
                    <Text style={themeText}>You're </Text>
                    <ReText text={percentageText}style={[styles.bigPercentage, themeText]} />
                    <Text style={themeText}> of the way to your degree!</Text>
                </View>
                <Text style={{...themeText, textAlign: "center", paddingBottom: 10,}}>{
                    nextCourses.length == 0 ? "Looks like none of your courses have a next step."
                    : "Now try tackling these courses here:"
                }</Text>
                <ScrollView contentContainerStyle={styles.listContainer}>
                        {
                            nextCourses.map(course => (
                                <Animated.View key={course.id} style={{
                                    width: width * 0.8,
                                    alignItems: "left",
                                    borderWidth: 1,
                                    borderColor: "#777777",
                                    padding: 5,
                                    borderRadius: 10,
                                    }}
                                    entering={SlideInDown.duration(1000).easing(Easing.out(Easing.exp)) }
                                >
                                {/* edit this JSX to change how the courses are displayed */}
                                    <Animated.View 
                                        style={{
                                            flexGrow: 1, 
                                            alignItems: "center", 
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text style={{color: "#777777", fontWeight: 600, fontSize: 12,}}>
                                            {course.course_id}
                                        </Text>
                                        <Text style={[styles.courseTitle, themeText]}>
                                            {course.title}
                                        </Text>
                                        <Text style={{flexGrow: 1, paddingTop: 5, ...themeText}}>
                                            {course.description}
                                        </Text>
                                {/* <AddCourseButton name={course.id + ": " + course.title} /> */}
                                    </Animated.View>
                               </Animated.View>
                                )
                            )
                        }
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const prereqGetter = async (course) => {
    const data = await getPrereqsOf(course);
    return data.json().data;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        margin: 'auto',
    },
    listContainer: {
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
    },
    bigPercentage: {
        fontWeight: 300,
        fontSize: 23,
    },
    courseTitle: {
        fontWeight: 300,
        fontSize: 20,
        textAlign: 'center'
    }
});
