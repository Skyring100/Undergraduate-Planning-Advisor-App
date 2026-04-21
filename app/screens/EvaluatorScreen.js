/*Evaluator page will show the degree evaluation details.*/


import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../contexts/UserContext';
import BackButton from '../components/BackButton';
import ProgressBar from '../components/Evaluator/ProgressBar';
import {useThemeText, useThemeBackground, useThemeShaded, useThemeGreyed, useFourthColour} from "../contexts/ThemeContext";
import {useWindowDimensions} from "react-native";
import AddCourseButton from "../components/Evaluator/AddCourseButton.js";
import Animated, {SlideInDown, SlideInLeft, Easing, useSharedValue, withTiming, useDerivedValue} from "react-native-reanimated";
import {ReText} from "react-native-redash";
import {getCourseById, getPrereqsOf, checkPrereqs, getAllCourses} from "../services/courseService";
import {prereqString} from "../services/courseService";
import {getDegreePlanByID} from "../services/degreePlannerService";
import {getUserProfileByID} from "../services/userService";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EvaluatorScreen() {
    const navigation = useNavigation();
    const [degreeCourses, setDegreeCourses] = useState([]);
    const [progressBarPercent, setProgressBarPercent] = useState(0);
    const [flag, setFlag] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const floatToColour = n => {
        let num2 = Math.min(Math.max(0, n ** 1.5), 1);
        let redComponent = Math.floor(0x66 + 0x55*(Math.cbrt(Math.cos (num2 * 3.5      * Math.PI / 3))));
        let grnComponent = Math.floor(0x66 + 0x55*(Math.cbrt(Math.cos((num2 * 3.5 - 2) * Math.PI / 3))));
        let bluComponent = Math.floor(0x66 + 0x55*(Math.cbrt(Math.cos((num2 * 3.5 + 2) * Math.PI / 3))));
        return (redComponent * 0x1000000) + (grnComponent * 0x10000) + (bluComponent * 0x100) + 0xFF;
    }

    const {setUser} = useUserStore();
    const themeText = useThemeText();
    const themeFourth = useFourthColour();
    const themeBg = useThemeBackground();
    const [completedCourses, setCompletedCourses] = useState([]);
    const themeShaded = useThemeShaded();
    const themeGreyed = useThemeGreyed();
    const {width} = useWindowDimensions();
    const [gpa, setGPA] = useState("-");
    
    // to find when the next courses are
    const nextCourseTime = (() => {
        let d = new Date(); 
        return ({
            year: d.getFullYear() + (d.getMonth() >= 9 ? 1 : 0), 
            semester: (Math.floor((d.getMonth()-1+4)/4)*4 + 1 )%12,
        });
    })();

    const gradePointOf = {
        "A+": 4.33,
        "A": 4.0,
        "A-": 3.67,
        "B+": 3.33,
        "B": 3.0,
        "B-": 2.67,
        "C+": 2.33,
        "C": 2.0,
        "C-": 1.67,
        "D+": 1.33,
        "D": 1.0,
        "D-": 0.67,
        "F": 0,
    }

    // TODO: make the user context supply these next few variables
    const number = useSharedValue(0);
    const percentageText = useDerivedValue(() => {return "" + number.value.toFixed(2) + "%";});
    const [semesterNumberText, setSemesterNumberText] = useState("");

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

    const creditCountText = useDerivedValue(() => {return "" + (number.value * degreeCourses.length/100 *3).toFixed(0) + "/" + degreeCourses.length * 3 + " credits"});
    const percentageColour = useDerivedValue(() => {
        let redComponent = Math.floor(0x77 + 0x55*(Math.cbrt(Math.cos(number.value/100 * 2 * Math.PI / 300))));
        let grnComponent = Math.floor(0x77 + 0x55*(Math.cbrt(Math.cos(number.value/100 * 2 * Math.PI / 3 - (2 * Math.PI / 3)))));
        let bluComponent = Math.floor(0x77 + 0x55*(Math.cbrt(Math.cos(number.value/100 * 2 * Math.PI / 3 + (2 * Math.PI / 3)))));
        return ((redComponent * 0x1000000) + (grnComponent * 0x10000) + (bluComponent * 0x100) + 0xFF);
    });
    
    useEffect(() => {
        number.value = withTiming(progressBarPercent, {
            duration: 2000,
            easing: Easing.out(Easing.exp),
        });
    });


    const nextCourses = degreeCourses.filter(course => {
        const notCompleted = !completedCourses.map(other => other.course_id).includes(course.course_id);
        const nextSemester = nextCourseTime.year == course.year_num && nextCourseTime.semester == course.semester_id;

        return notCompleted && nextSemester;
    });

    // function to make jsx out of a course list
    const courseToAnimatedView = (course, index, grade) => {
        console.log("SKIBIDI OHIO RIZZ: "+JSON.stringify(course));
        return (
            <View style={{
                flexDirection: "row",
                margin: 10,
                alignItems: "left",
                padding: 5,
                borderRadius: 10,
                gap: 10,
                ...themeBg,
                }}
                key={index}
            >
            {/* edit this JSX to change how the courses are displayed */}
                <View style={{...themeFourth, width: 10, borderRadius: 99, paddingLeft: 5,}} />
                <View style={{overflow: "hidden", flexGrow: 1,}}>
                    <Animated.View 
                        style={{
                            alignItems: "center", 
                            justifyContent: "space-between",
                            paddingRight: 5,
                            flexGrow: 1,
                            flexDirection: "row",
                        }}
                        entering={SlideInLeft.duration(1000).easing(Easing.out(Easing.exp)).delay(index*100)}
                    >
                        <View>
                            <Text style={[themeText, {fontWeight: "600"}]}>
                                {course.course_id}
                            </Text>
                            <Text style={[themeText]}>
                                {course.title.trim()}
                            </Text>
                            {(() => {if (grade === undefined) return (<>
                                <Text style={{color: course.matches ? 0x55BB55FF : "#bb5555", fontWeight: 600, fontSize: 12,}}>
                                    {course.matches ? "\u2713 You have all the prerequisites for this course" 
                                        : "\u2717 You are missing some prerequisites"}
                                </Text>
                                <View style={{flexDirection: "row", flexWrap: "wrap", gap: 10}}>
                                    {   (() => {
                                            if (course.prereq_string === undefined) return <></>;
                                            return (course.prereq_string).map(obj => {
                                                return (
                                                    <View style={{backgroundColor: obj.state == "have" ? "#55bb55" : "#bb5555", padding: 2, borderRadius: 18}}>
                                                        <Text style={{color: themeBg.backgroundColor, fontWeight: 700, top: obj.state == "have" ? -1.5 : 0,}}>
                                                            {(obj.state == "have" ? " \u2713 " : " \u2717 ") + obj.course + " "}
                                                        </Text>
                                                    </View>
                                                )
                                            })
                                        })()
                                    }
                                </View>
                            </>);})()}
                        </View>
                        {(() => {if (grade != undefined) return (<>
                            <Text style={[styles.bigGPAText, { lineHeight: "50", color: floatToColour((gradePointOf[grade]/4.33)) || themeText}]}>{grade}</Text>
                        </>);})() }

                {/* <AddCourseButton name={course.id + ": " + course.title} /> */}
                    </Animated.View>
               </View>
           </View>
        );
    };

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
                <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                    <View style={styles.containerSmall}>
                        <View style={[styles.progressBarHolder, themeShaded]}>
                            <View style={[styles.doubleSideTextHolder, {paddingLeft: 10, paddingRight: 10,}]}>
                                <Text style={[themeText]}>{semesterNumberText}</Text>
                                <ReText text={creditCountText} style={{color: percentageColour, flexShrink: 1, margin: 0, lineHeight: 1,}} />
                            </View>
                            <ProgressBar full={progressBarPercent} key={progressBarPercent}/>
                        </View>
                        <View style={[styles.doubleSideTextHolder, {width: 370}]}>
                            <View style={[styles.progressBarHolder, themeShaded, {flexShrink: 1, width: 170, flexDirection: "column", alignItems: "center", justifyContent: "space-evenly"}]}>
                                <Text style={themeText}>You're running a</Text>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", gap: 10,}}>
                                    
                                    {isLoading ? <Text style={[styles.bigGPAText, themeText]}>--</Text> : 
                                    <Text style={[styles.bigGPAText, {color: floatToColour(gpa / 4.33)}]}>{(+gpa).toFixed(2) /* TODO: make this pull from degree service */}</Text>
                                    }
                                    
                                    <Text style={themeText}>GPA</Text>
                                </View>
                            </View>
                            <View style={[styles.progressBarHolder, themeShaded, {flexShrink: 1, width: 170, flexDirection: "column", alignItems: "center", justifyContent: "space-evenly"}]}>
                                <Text style={themeText}>and taking</Text>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", gap: "10",}}>
                                    <Text style={[styles.bigGPAText, themeText]}>{completedCourses.filter((course) => (course.in_progress)).length}</Text>
                                    <Text style={themeText}>courses</Text>
                                </View>
                            </View>
                        </View>
                        {/*
                        <View style={styles.variableSizeTextHolder}>
                            <Text style={themeText}>You're</Text>
                            <ReText text={percentageText}style={[styles.bigPercentage, {color: percentageColour}]} />
                            <Text style={themeText}>of the way to your degree!</Text>
                        </View>
                        */}
                        <Text style={{...themeText, textAlign: "center", paddingBottom: 10,}}>{(() => {
                            let nextCourseTimeString = "" + nextCourseTime.year + " " + (nextCourseTime.semester == 1 ? "Winter" : (
                                nextCourseTime.semester == 5 ? "Spring" : "Fall"));
                            return (nextCourses.length == 0 ? "Looks like you have no courses next semester.\nTake a break and relax!"
                            : ("Here's how the " + nextCourseTimeString
                            + " semester looks."));
                        })()
                        }</Text>
                        {(() => {
                            if (isLoading) {return (<>
                                <Text style={{
                                    padding: 20, 
                                    alignSelf: "center", 
                                    color: "white", 
                                    fontWeight: "600",
                                }}>
                                    We had some trouble loading your next courses
                                </Text>
                            </>);}
                            let courseAnimationIterator = 0;
                            return (<>
                                {(() => {if (nextCourses.filter(c => c.matches).length > 0) 
                                        return (
                                            <>
                                                <Text style={[styles.enrollHeader, themeText, {margin: 5}]}>
                                                    You've got the prereqs for these:
                                                </Text>
                                            </>
                                        );}
                                )()}
                                <View style={[styles.courseBubbleBubble, themeShaded]}>
                                    {(() => {
                                        return nextCourses.filter(c => c.matches).map(c => courseToAnimatedView(c, ++courseAnimationIterator, undefined));
                                        })()
                                    }
                                </View>
                                {(() => {if (nextCourses.filter(c => !c.matches).length > 0) 
                                        return (
                                            <>
                                                <Text style={[styles.enrollHeader, themeText, {margin: 5}]}>
                                                    You're still missing some for these:
                                                </Text>
                                            </>
                                        );}
                                )()}
                                <View style={[styles.courseBubbleBubble, themeShaded]}>
                                    {(() => {
                                        return nextCourses.filter(c => !c.matches).map(c => courseToAnimatedView(c, ++courseAnimationIterator, undefined));
                                        })()
                                    }
                                </View>
                            </>);
                        })()}
                        {(() => {
                            if (isLoading) return (<><Text style={{padding: 20, alignSelf: "center", color: "white", fontWeight: "600",}}>We had some trouble loading your complete courses</Text></>); else
                            if (completedCourses.length > 0) {
                                let courseAnimationIterator = 0;
                                return (
                                    <>
                                        <Text style={[styles.enrollHeader, themeText, {margin: 5}]}>
                                            You've completed these:
                                        </Text>
                                        <View style={[styles.courseBubbleBubble, themeShaded]}>
                                            {(() => {
                                                console.log("SKIBIDI its this long: "+completedCourses.length);
                                                return completedCourses.map(c => {
                                                    console.log("the course youre getting is "+JSON.stringify(c));
                                                    const x = courseToAnimatedView(c, ++courseAnimationIterator, c.grade || ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"][Math.floor(Math.random() * 13)])
                                                    console.log(x);
                                                    return x;
                                                });
                                                })()
                                            }
                                        </View>
                                    </>
                                );
                            }
                        })()}
                    </View>
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
    containerSmall: {
        alignItems: "left",
    },
    courseBubbleBubble: {
        borderRadius: 10, 
        marginLeft: 10, 
        marginRight: 10, 
        marginTop: 10,
        marginBottom: 10,
    },
    doubleSideTextHolder: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    progressBarHolder: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
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
    enrollHeader: {
        fontWeight: 600,
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10,
    },
    bigGPAText: {
        fontWeight: 800,
        fontSize: 50
    },
});
