/*RequiredCourses page will show the list of courses the user is required to take for their degree program.
It will also show what electives they have chosen for each degree planner.
It will have a dropdown to select different degree planners and view the courses accordingly.
There will be a button that will navigate to the CourseList page.*/ 
import { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import { useThemeText, useThemeBackground,
    useFirstColour, useSecondColour, useThirdColour} from "../contexts/ThemeContext";
import CourseListButton from '../components/Planner/CourseListButton';
import CoursePopUp from '../components/Requistes/CoursePopUp';
import { createDegree, getDegreeByID } from '../services/degreeService';
import all_courses from '../data/UNBC_course_data.json';
import CourseCompletedButton from '../components/Requistes/CourseCompletedButton';

const DummyData = [
    {
        levelNumber: 100,
        courselist: [
            {
                id: "CPSC 100",
                title: "Introduction to Computer Science"
            },
            {
                id: "CPSC 101",
                title: "Introduction to Computer Science"
            },
            {
                id: "CPSC 141",
                title: "Computational Mathematics"
            },
        ]
    },
    {
        levelNumber: 200,
        courselist: [
            {
                id: "CPSC 230",
                title: "XXXX"
            },
            {
                id: "CPSC 231",
                title: "XXXX"
            },
            {
                id: "ENGL 270",
                title: "XXXX"
            },
        ]
    },
    {
        levelNumber: 300,
        courselist: [
            {
                id: "CPSC 300",
                title: "XXXX"
            },
            {
                id: "CPSC 320",
                title: "XXXX"
            },
            {
                id: "CPSC 321",
                title: "XXXX"
            },
        ]
    },
    {
        levelNumber: 400,
        courselist: [
            {
                id: "CPSC 444",
                title: "XXXX"
            }
        ]
    },]

const DummyElectives = [
    {
        levelNumber: 100,
        courselist: [
            {
                id: "Fun 100",
                title: "Introduction to Computer Science"
            },
            {
                id: "COMM 100",
                title: "Introduction to Computer Science"
            },
        ]
    },
    {
        levelNumber: 200,
        courselist: [
            {
                id: "ANTH 203",
                title: "XXXX"
            },
            {
                id: "ANTH 213",
                title: "XXXX"
            },
            {
                id: "NURS 205",
                title: "XXXX"
            },
        ]
    },
    {
        levelNumber: 300,
        courselist: [
            {
                id: "WMST 303",
                title: "XXXX"
            },
            
        ]
    },
    {
        levelNumber: 400,
        courselist: [
            {
                id: "CPSC 450",
                title: "XXXX"
            },
            {
                id: "CPSC 475",
                title: "XXXX"
            },
            {
                id: "CPSC 499",
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
    credit_reqs : []
}

export default function RequiredCoursesScreen() {
    // when this is added, use these as style components for text colour instead of #fff and #000
    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const firstColour = useFirstColour();
    const {width, height} = useWindowDimensions();
    const [requirements, setRequirements] = useState([]);

    /*
    useEffect(() => {
        createDegree(newDegree).then((apiResult) => {
            if (apiResult.success){
                const reqs = newDegree.course_reqs;
                const matchedCourses = all_courses.all_courses.filter(course => reqs.includes(course.id));
                const grouped = groupByLevel(matchedCourses);
                setRequirements(grouped);
            }else{
                alert("API call was unsuccessful");
                setRequirements([]);
            }
        });

    }, []);
    
    useEffect(() => {
        getDegreeByID(1).then((apiResult) => {
            if (apiResult.success){
                console.log(apiResult.data);
            }else{
                alert("API call was unsuccessful");
                setRequirements([]);
            }
        });

    }, []);
    */
    
    
        return (
            <SafeAreaProvider>
                <SafeAreaView style={[{width: width, height: height}, themeBg]}>
                    <FlatList
                        data={DummyData}
                        ListHeaderComponent={<Text style={[styles.header, themeText, firstColour]}>Required Courses</Text>}
                        renderItem={({item: l}) => (
                            <View key={l.levelNumber}>
                                <LevelSection levelNumber={l.levelNumber} courseData={l.courselist}></LevelSection>
                            </View>
                        )}
                        keyExtractor={(l) => l.levelNumber.toString()}
                        ListFooterComponent={
                            <SafeAreaView style={{marginBottom: 50}}>
                                <Text style={[styles.header, themeText, firstColour]}>Breadth</Text>
                                {DummyElectives.map(l => (
                                    <View key={l.levelNumber}>
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

function LevelSection({levelNumber, courseData}) {
    const themeText = useThemeText();
    const secondColour = useSecondColour();
    const thirdColour = useThirdColour();

    

    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                <Text style={[styles.levelHeader, secondColour, themeText]}>Level {levelNumber}</Text>
                <Text style={[styles.done, secondColour, themeText]}>Done</Text>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'center',}}>
                {
                    courseData.map(course => (
                        
                        <View key={course.id} style={{flexDirection: 'row', justifyContent: 'center',}}>
                            {//<Text style={[styles.courseHeader, thirdColour, themeText]}>{course.id}</Text>
}
                            <CoursePopUp course={course}></CoursePopUp>
                            <CourseCompletedButton/>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

function groupByLevel(courseList){
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
    levelHeader:{
        fontWeight: 'bold',
        fontSize: 25,
        width: '70%',
        textAlign: 'center'
    },
    courseHeader:{
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
