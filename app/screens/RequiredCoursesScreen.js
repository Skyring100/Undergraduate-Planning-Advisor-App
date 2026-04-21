/*RequiredCourses page will show the list of courses the user is required to take for their degree program.
It will also show what electives they have chosen for each degree planner.
It will have a dropdown to select different degree planners and view the courses accordingly.
There will be a button that will navigate to the CourseList page.*/
import { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import { useThemeText, useThemeBackground, useThemeShaded,
    useFirstColour, useSecondColour, useThirdColour} from "../contexts/ThemeContext";
import CourseListButton from '../components/Planner/CourseListButton';
import CoursePopUp from '../components/Requistes/CoursePopUp';
import { createDegree, getDegreeByID } from '../services/degreeService';
import all_courses from '../data/UNBC_course_data.json';
import CourseCompletedButton from '../components/Requistes/CourseCompletedButton';
import { useRoute } from '@react-navigation/native';
import AddButton from '../components/Planner/AddButton';
import { useNavigation } from '@react-navigation/native';
import {getCourseById, getPrereqsOf, checkPrereqs, getAllCourses} from "../services/courseService";
import {prereqString} from "../services/courseService";
import {getDegreePlanByID} from "../services/degreePlannerService";
import {getUserProfileByID} from "../services/userService";
import AsyncStorage from '@react-native-async-storage/async-storage';


const DummyData = [
    {
        levelNumber: 100,
        courselist: [
            {
                id: "CPSC100",
                title: "Computer Programming I",
            },
            {
                id: "CPSC101",
                title: "Computer Programming II",
            },
            {
                id: "CPSC141",
                title: "Discrete Computational Mathematics",
            },
        ]
    },
    {
        levelNumber: 200,
        courselist: [
            {
                id: "CPSC230",
                title: "Introduction to Logic Design"
            },
            {
                id: "CPSC231",
                title: "Computer Organization and Architecture"
            },
            {
                id: "ENGL270",
                title: "Expository Writing"
            },
        ]
    },
    {
        levelNumber: 300,
        courselist: [
            {
                id: "CPSC300",
                title: "Software Engineering"
            },
            {
                id: "CPSC320",
                title: "Programming Languages"
            },
            {
                id: "CPSC321",
                title: "Operating Systems"
            },
        ]
    },
    {
        levelNumber: 400,
        courselist: [
            {
                id: "CPSC444",
                title: "Computer Networks"
            }
        ]
    },]

const DummyElectives = [
    {
        levelNumber: 100,
        courselist: [
            {
                id: "FUN100",
                title: "Introduction to Fun"
            },
            {
                id: "COMM100",
                title: "Introduction to Canadian Business"
            },
        ]
    },
    {
        levelNumber: 200,
        courselist: [
            {
                id: "ANTH203",
                title: "XXXX"
            },
            {
                id: "ANTH213",
                title: "XXXX"
            },
            {
                id: "NURS205",
                title: "XXXX"
            },
        ]
    },
    {
        levelNumber: 300,
        courselist: [
            {
                id: "WMST303",
                title: "XXXX"
            },

        ]
    },
    {
        levelNumber: 400,
        courselist: [
            {
                id: "CPSC450",
                title: "XXXX"
            },
            {
                id: "CPSC475",
                title: "XXXX"
            },
            {
                id: "CPSC499",
                title: "XXXX"
            }
        ]
    },]
    
const newDegree = {
    name: 'Computer Science',
    is_minor: false,
    course_reqs: [
        "CPSC100", "CPSC101", "CPSC141", "CPSC230", "CPSC231", "ENGL270", "CPSC300", "CPSC320", "CPSC321", "CPSC444"
    ],
    credit_reqs: []
}

export default function RequiredCoursesScreen() {
    // when this is added, use these as style components for text colour instead of #fff and #000
    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const themeShaded = useThemeShaded();
    const firstColour = useFirstColour();
    const { width, height } = useWindowDimensions();
    const [requirements, setRequirements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    const [degreeCourses, setDegreeCourses] = useState([]);

    useEffect(() => {
        const pullAsync = async () => {
            const studentID = await AsyncStorage.getItem("student_id");
            // TODO: change this line in prod
            const user = (await getUserProfileByID(studentID)).data;
            const curDegree = (await getDegreeByID(user.current_degree_id)).data.data;

            // get degree course time town epic poggers yippee
            let degreeCoursesToCopy = [];
            let allCoursesList = await Promise.all(
                curDegree.map(async c => {
                    console.log("processing course "+c.course_id);
                    const courseObj = (await getCourseById(c.course_id)).data;
                    console.log("got title "+courseObj.title);
                    return {
                        id: c.course_id,
                        title: courseObj.title.trim(),
                        nesting: c.nesting
                    };
                })
            );
            for (let j=0; j<allCoursesList.length; j++) {
                console.log("flattening at "+j+" ("+allCoursesList[j].id+") ");
                while (allCoursesList[j].nesting == 2 && j < allCoursesList.length - 1) {
                    let entry2 = allCoursesList[j + 1];
                    allCoursesList[j].id = allCoursesList[j].id + "\n\u1D52\u02B3 " + entry2.id;
                    allCoursesList[j].title = allCoursesList[j].title + "\n\u1D52\u02B3 " + entry2.title;
                    allCoursesList[j].nesting = entry2.nesting;
                    allCoursesList.splice(j + 1, 1); // remove the other entry
                    j--;
                }
                allCoursesList[allCoursesList.length - 1].nesting = 1;
                console.log("length is now "+allCoursesList.length+" (next is iteration "+(j + 1)+") ");
                console.log("now working with "+JSON.stringify(allCoursesList.map(y => y.id))+" ");
            }
            console.log("got here");
            for (let i=1; i<=4; i++) {
                console.log("pushing courses at year "+i);
                degreeCoursesToCopy.push({
                    levelNumber: i * 100,
                    courselist: allCoursesList.filter(x => +(x.id[4]) == i)
                });
            }
            setDegreeCourses(degreeCoursesToCopy);
            setIsLoading(false);
        };
        try {
            pullAsync();
        } catch (error) {
            console.error(error);
        }
    }, []);


    // const themeBg = useThemeBackground();
    // TODO: use "setCurrentUserDegree" in userService to change the user's selected degree
    // Whenever you want to access selected degree, use "await AsyncStorage.getItem("current_degree_id")"
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[themeBg]}>
                <FlatList
                    data={degreeCourses}
                    renderItem={({item: l}) => (isLoading ? <><Text>Loading</Text></> :
                        <View key={l.levelNumber} style={{padding: 10, paddingBottom: 0, ...themeShaded, margin: 10, borderRadius: 20,}}>
                            <LevelSection levelNumber={l.levelNumber} courseData={l.courselist}></LevelSection>
                        </View>
                    )}
                    keyExtractor={(l) => l.levelNumber.toString()}
                />
                    {/*ListFooterComponent={
                        <SafeAreaView style={{marginBottom: 50}}>
                            <Text style={[styles.header, themeText, firstColour]}>Breadth</Text>
                            {DummyElectives.map(l => (
                                <View key={l.levelNumber} style={{padding: 10, paddingBottom: 0, ...themeShaded, margin: 10, borderRadius: 20,}}>
                                    <LevelSection levelNumber={l.levelNumber} courseData={l.courselist}></LevelSection>
                                </View>
                            ))}
                        </SafeAreaView>
                    }*/}

        </SafeAreaView>
    </SafeAreaProvider>
    )
}


function LevelSection({ levelNumber, courseData }) {
    const themeText = useThemeText();
    const themeShaded = useThemeShaded();
    const themeBg = useThemeBackground();
    const firstColour = useSecondColour();
    const secondColour = useSecondColour();
    const thirdColour = useThirdColour();
    const route = useRoute();
    const { yearIndex, semesterIndex, degreePlanID } = route.params;
    return (
        <View>
            <View style={{flexDirection: 'column', alignItems: 'left'}}>
                <Text style={[styles.levelHeader, themeShaded, themeText]}>{levelNumber} Level</Text>
                <View style={[styles.horizontalLine, firstColour]}></View>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'center', gap: 10, padding: 10, }}>
                {
                    courseData.map(course => (
                        
                        <View key={Math.random()} style={{
                            flexDirection: 'row', 
                            justifyContent: 'space-between',
                            borderRadius: 10,
                            alignItems: "center",
                            padding: 5,
                            paddingRight: 10,
                            ...themeBg,
                        }}>
                            {//<Text style={[styles.courseHeader, thirdColour, themeText]}>{course.id}</Text> 
                            }
                            <View style={{flexDirection: "row", alignItems: "center",}}>
                                <View style={[styles.verticalLine, firstColour]}></View>
                                <CoursePopUp course={course}></CoursePopUp>
                            </View>
                            <CourseCompletedButton/>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

function groupByLevel(courseList) {
    const groups = {};
    courseList.forEach(course => {
        const level = Math.floor(parseInt(course.id) / 100) * 100;
        if (!groups[level]) {
            groups[level] = [];
        }
        groups[level].push(course);
    });
    return Object.entries(groups).map(([level, courses]) => ({
        levelNumber: parseInt(level),
        courselist: courses
    }));
}

const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        fontSize: 25,
        width: '100%',
        padding: 10,
        textAlign: 'center',
    },
    verticalLine: {
        padding: 4,
        borderRadius: 10,
        width: 8,
        marginLeft: 5,
        marginRight: 5,
        height: 40,
    },
    horizontalLine: {
        padding: 4,
        margin: 5,
        borderRadius: 10,
        height: 8,
        flex: 1,
    },
    levelHeader:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    courseHeader: {
        color: '#ffffffff',
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: '#078d6e',
        textAlign: 'center',
        width: '70%',
    },
    done: {
        color: '#060a03ff',
        fontWeight: 'bold',
        fontSize: 25,
        backgroundColor: '#3cceac',
        width: '30%',
        textAlign: 'center'
    }
});
