import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View, Pressable } from 'react-native';
import { useThemeStore, useFirstColour, useZerothColour, mainDark, mainLight, useThemeText, borderColour} from '../../contexts/ThemeContext';
import React, { useState } from 'react';
import OutlinedText from '@kdn0325/react-native-outlined-text';
import possibleCourses from '../../data/possible_courses.json'
import completedCourses from '../../data/completed_courses.json'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useEffect } from 'react';

const screenHeight = Dimensions.get('window').height - 110;
const buttonHeight = screenHeight *0.25;
const buttonWidth = buttonHeight;//screenWidth * 0.60;
const chartSize = buttonHeight;

export default function EvaluatorButton() {
    const navigation = useNavigation();
    const textColour = useThemeText();
    const firstColour = useFirstColour().backgroundColor;
    const zerothColour = useZerothColour().backgroundColor;
    
    const [progressBarPercent, setProgressBarPercent] = useState(0);
    const [completedCourses, setCompletedCourses] = useState([]);

    useEffect(() => {
        const pullAsync = async () => {
            const studentID = await AsyncStorage.getItem("student_id");
            // TODO: change this line in prod
            const resp = await getDegreePlanByID(studentID);
            const userprofileHolder = await getUserProfileByID(studentID);
            const userprofile = userprofileHolder.data || {};
            const compcrs = await (async () => {
                const original = userprofile.completed_courses;
                const newC = await Promise.all(
                    original.map(
                        async course => {
                            console.log("THE COURSE: " + JSON.stringify(course))
                            let courseObj = await getCourseById(course.course_id);
                            console.log("THE OBJECT: " + JSON.stringify(courseObj.data))
                            courseObj.data = {...courseObj.data, ...course}
                            console.log("AND TOGETHER THEY ARE: " + JSON.stringify(courseObj.data))
                            courseObj.data.year_num = course.year;
                            courseObj.data.semester_id = course.semester_id;
                            courseObj.data.matches = true;
                            let pqString = await prereqString(
                                completedCourses.map(comp => comp.course_id),
                                course.course_id
                            );
                            courseObj.data.prereq_string = pqString.data;
                            return courseObj.data;
                            }
                    )
                );
                return newC;
            })();
            setCompletedCourses(compcrs);
            console.log("first useEffect over");
        };
        try {
            pullAsync();
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        console.log("second useEffect now happening");
        const pullAsync = async () => {
            const studentID = await AsyncStorage.getItem("student_id");
            const resp = await getDegreePlanByID(studentID);
            const userprofileHolder = await getUserProfileByID(studentID);
            const userprofile = userprofileHolder.data || {};
            setGPA(userprofile.gpa);
            const data = await (async () => {
                const d = await Promise.all(
                    resp.data.data.map(
                        async course => {
                            let courseObj = await getCourseById(course.course_id);
                            courseObj.data.year_num = course.year;
                            courseObj.data.semester_id = course.year;
                            let matchData = await checkPrereqs(
                                completedCourses.map(comp => comp.course_id), 
                                course.course_id);
                            courseObj.data.matches = matchData.data;
                            let pqString = await prereqString(
                                completedCourses.map(comp => comp.course_id),
                                course.course_id
                            );
                            courseObj.data.prereq_string = pqString.data;
                            return courseObj;
                        }
                    ));
                const e = d.filter(course => course.success).map(course => course.data).sort(course => course.course_id);
                console.log(e[0]);
                setProgressBarPercent((completedCourses.length/e.length)*100);
                setSemesterNumberText("Year " + (nextCourseTime.year - (e[0].year_num) + ((nextCourseTime.semester - 4) < 9 ? 1 : 0))
                    + " - " + ((nextCourseTime.semester - 4) == 1 ? "Winter" : (
                    nextCourseTime.semester - 4 == 5 ? "Spring" : "Fall")) + " Semester");
                setIsLoading(false);
                return e;
            })();
            setDegreeCourses(data);
        };
        try {
            pullAsync();
        } catch (error) {
            console.error(error);
        }
    }, [completedCourses])
    

    const handlePress = () => {
        navigation.navigate('Evaluator',{})
    };
    
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
            activeOpacity={1}
        >   
                <AnimatedCircularProgress
                    size={chartSize}
                    width={30}
                    fill={progressBarPercent}
                    tintColor={firstColour}
                    backgroundColor={zerothColour}
                    rotation={0}
                    duration={1500}
                    lineCap='round'
                >
                    {
                        (fill) => (
                        <Text style={[styles.buttonText, textColour]}>
                            { progressBarPercent.toFixed(0) }%
                        </Text>
                        )
                    }               
                </AnimatedCircularProgress>
            {/* <Text style={[styles.buttonText, {color: isDarkMode ? fourthLight[indexColour] : mainDark[indexColour]}]}>Evaluator</Text> */}  
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: buttonHeight/2,
        marginTop: buttonHeight*0.08,
        width: buttonWidth,
        height: buttonHeight,
        borderWidth: 5,
        padding: 0,
        backgroundColor: 'transparent',
    },
    buttonText: {
        fontSize: buttonHeight*0.20,
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Bold',
    },
});
