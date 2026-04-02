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
import {getCourseById, getPrereqsOf, checkPrereqs, getAllCourses} from "../services/courseService";
import {getDegreePlanByID} from "../services/degreePlannerService";
import {getUserProfileByID} from "../services/userService";

export default function EvaluatorScreen() {
    const navigation = useNavigation();
    const [degreeCourses, setDegreeCourses] = useState([]);
    const [progressBarPercent, setProgressBarPercent] = useState(0);
    const [flag, setFlag] = useState(false);
    

    const {setUser} = useUserStore();
    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const {width} = useWindowDimensions();
    
    // to find when the next courses are
    const nextCourseTime = (() => {
        let d = new Date(); 
        /* TODO: uncomment this when using the actual date in the future
        return ({
            year: d.getFullYear() + (d.getMonth >= 9 ? 1 : 0), 
            semester: (Math.floor((d.getMonth()-1+4)/4)*4 + 1 )%12,
        });
        */
        return ({year: 2028, semester: 9});
    })();


    // TODO: make the user context supply these next few variables
    const number = useSharedValue(0);
    const percentageText = useDerivedValue(() => {return "" + number.value.toFixed(2) + "%";});

    useEffect(() => {(async () => {
        // TODO: change this line in prod
        const resp = await getDegreePlanByID("H8RSahsD9sRKayfDPGV6pnBxU6n1");
        const userprofile = await getUserProfileByID("H8RSahsD9sRKayfDPGV6pnBxU6n1");
        console.log(userprofile);
        const data = await (async () => {
            const d = await Promise.all(
                resp.data.data.map(
                    async course => {
                        let courseObj = await getCourseById(course.course_id);
                        courseObj.data.year_num = course.year_num;
                        courseObj.data.semester_id = course.semester_id;
                        console.log(completedCourses.map(comp => comp.course_id));
                        let matchData = await checkPrereqs(
                            completedCourses.map(comp => comp.course_id), 
                            course.course_id);
                        courseObj.data.matches = matchData.data;
                        console.log(`${completedCourses.map(comp => comp.course_id)}: ${matchData.message} ${course.course_id}`);
                        return courseObj;
                    }
                ));
            const e = d.filter(course => course.success).map(course => course.data).sort(course => course.course_id);
            setProgressBarPercent((completedCourses.length/e.length)*100);
            console.log("got here");
            return e;
        })();
        setDegreeCourses(data);
        console.log("and processed:");
        console.log(data);
        console.log(number);
    })()}, [])
    
    useEffect(() => {
        number.value = withTiming(progressBarPercent, {
            duration: 2000,
            easing: Easing.out(Easing.exp),
        });
    });


    // take all the courses the user has everyprerequisite for completed
    /*
    const nextCourses = degreeCourses.filter(
                                course => checkIfPrereqsMatchCourse(
                                    completedCourses.map(comp => comp.id), course.id
                                ) && course.prereqs.length != 0
                                && !completedCourses.map(other => other.id).includes(course.id)
                            );
                            */
    const nextCourses = degreeCourses.filter(course => {
        // const matches = checkPrereqs(completedCourses.map(comp => comp.course_id), course.course_id);
        const notCompleted = !completedCourses.map(other => other.id).includes(course.course_id);
        const nextSemester = nextCourseTime.year == course.year_num && nextCourseTime.semester == course.semester_id;
        console.log(`nextSemester: ${nextSemester}`);
        console.log(`this course's year: ${course.year_num}`);
        console.log(`this course's semester: ${course.semester_id}`);

        return notCompleted && nextSemester;
    });

    /*
     * we need to check:
     * - is course in the user's degree plan?
     * - is the course next semester?
     * - does user have all the prereqs? (have a function for that)
     * - if not, what are they missing? (come up with something for that)
     * - has user not yet finished the course?
     */

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, themeBg, {width: width}]}>
                <BackButton/>
                <Text style={[styles.titleText, themeText]}>
                    Let's see where you're at
                </Text>
        
                <ProgressBar full={progressBarPercent} key={progressBarPercent}/>
                <View style={styles.variableSizeTextHolder}>
                    <Text style={themeText}>You're </Text>
                    <ReText text={percentageText}style={[styles.bigPercentage, themeText]} />
                    <Text style={themeText}> of the way to your degree!</Text>
                </View>
                <Text style={{...themeText, textAlign: "center", paddingBottom: 10,}}>{(() => {
                    let nextCourseTimeString = "" + nextCourseTime.year + " " + (nextCourseTime.semester == 1 ? "Winter" : (
                        nextCourseTime.semester == 5 ? "Spring" : "Fall"));
                    return (nextCourses.length == 0 ? "Looks like you have no courses next semester.\nTake a break and relax!"
                    : ("Your courses in the " + nextCourseTimeString
                    + " semester will be:"));
                })()
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
                                        <Text style={{flexGrow: 1, paddingTop: 5, ...themeText}}>
                                            {course.course_id}
                                        </Text>
                                        <Text style={[styles.courseTitle, themeText]}>
                                            {course.title}
                                        </Text>
                                        <Text style={{color: course.matches ? "#66BB66" : "#DD7777", fontWeight: 600, fontSize: 12,}}>
                                            {course.matches ? "\u2713 You have all the prerequisites for this course" 
                                                : "\u2717 You are missing some prerequisites:"}
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
