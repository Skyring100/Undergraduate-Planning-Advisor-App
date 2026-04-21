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
    const navigation = useNavigation();


    // const themeBg = useThemeBackground();
    // TODO: use "setCurrentUserDegree" in userService to change the user's selected degree
    // Whenever you want to access selected degree, use "await AsyncStorage.getItem("current_degree_id")"
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[themeBg]}>
                <FlatList
                    data={DummyData}
                    renderItem={({item: l}) => (
                        <View key={l.levelNumber} style={{padding: 10, paddingBottom: 0, ...themeShaded, margin: 10, borderRadius: 20,}}>
                            <LevelSection levelNumber={l.levelNumber} courseData={l.courselist}></LevelSection>
                        </View>
                    )}
                    keyExtractor={(l) => l.levelNumber.toString()}
                    ListFooterComponent={
                        <SafeAreaView style={{marginBottom: 50}}>
                            <Text style={[styles.header, themeText, firstColour]}>Breadth</Text>
                            {DummyElectives.map(l => (
                                <View key={l.levelNumber} style={{padding: 10, paddingBottom: 0, ...themeShaded, margin: 10, borderRadius: 20,}}>
                                    <LevelSection levelNumber={l.levelNumber} courseData={l.courselist}></LevelSection>
                                </View>
                            ))}
                        </SafeAreaView>

                }
            />

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
                        
                        <View key={course.id} style={{
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
