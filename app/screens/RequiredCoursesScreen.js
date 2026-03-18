/*RequiredCourses page will show the list of courses the user is required to take for their degree program.
It will also show what electives they have chosen for each degree planner.
It will have a dropdown to select different degree planners and view the courses accordingly.
There will be a button that will navigate to the CourseList page.*/ 
import { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import degreePlanData from '../data/degree_plans.json'
import BackButton from '../components/BackButton';
import { useThemeText, useThemeBackground } from "../contexts/ThemeContext";
import AllCoursesButton from '../components/Requistes/AllCoursesButton';
import CourseListButton from '../components/Planner/CourseListButton';
import { createDegree } from '../services/degreeService';


const DummyData = [
    {
        levelNumber: 100,
        courselist: [
            {
                courseCode: "CPSC 100",
                courseName: "Introduction to Computer Science"
            },
            {
                courseCode: "CPSC 101",
                courseName: "Introduction to Computer Science"
            },
            {
                courseCode: "CPSC 141",
                courseName: "Computational Mathematics"
            },
        ]
    },
    {
        levelNumber: 200,
        courselist: [
            {
                courseCode: "CPSC 230",
                courseName: "XXXX"
            },
            {
                courseCode: "CPSC 231",
                courseName: "XXXX"
            },
            {
                courseCode: "ENGL 270",
                courseName: "XXXX"
            },
        ]
    },
    {
        levelNumber: 300,
        courselist: [
            {
                courseCode: "CPSC 300",
                courseName: "XXXX"
            },
            {
                courseCode: "CPSC 320",
                courseName: "XXXX"
            },
            {
                courseCode: "CPSC 321",
                courseName: "XXXX"
            },
        ]
    },
    {
        levelNumber: 400,
        courselist: [
            {
                courseCode: "CPSC 444",
                courseName: "XXXX"
            }
        ]
    },]

const newDegree = {
    name: 'Computer Science',
    is_minor: false,
    course_reqs: [
        "CPSC100", "CPSC101", "CPSC141", "CPSC230", "CPSC231"
    ],
    credit_reqs : []
}

export default function RequiredCoursesScreen() {
    // when this is added, use these as style components for text colour instead of #fff and #000
    const [requirements, setRequirements] = useState(null);
    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const {width, height} = useWindowDimensions();

    useEffect(() => {
        createDegree(newDegree).then((apiResult) => {
            if (apiResult.success){
                setRequirements(apiResult.data);
            }else{
                alert("API call was unsuccessful");
                setSchedule([]);
            }
        });

    }, []);
    
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[{width: width, height: height}, themeBg]}>
                <View style={[themeBg, {alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row', marginRight: 20, marginBottom: 10}]}>
                    <BackButton/>
                    <AllCoursesButton/>
                </View>
                <FlatList
                    data={DummyData}
                    ListHeaderComponent={<Text style={[styles.header, themeText]}>Required Courses</Text>}
                    renderItem={({item: l}) => (
                        <View key={l.levelNumber}>
                            <LevelSection levelNumber={l.levelNumber} courseData={l.courselist}></LevelSection>
                        </View>
                    )}
                    keyExtractor={(l) => l.levelNumber.toString()}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

function LevelSection({levelNumber, courseData}) {
    const themeText = useThemeText();
    
    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                <Text style={styles.levelHeader}>Level {levelNumber}</Text>
                <Text style={styles.done}>Done</Text>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'center',}}>
                {
                    courseData.map(course => (
                        <View key={course.courseCode} style={{flexDirection: 'row', justifyContent: 'center',}}>
                            <Text style={[styles.courseHeader, themeText]}>{course.courseCode}</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    header: {
        color: '#060a03ff',
        fontWeight: 'bold',
        fontSize: 25,
        backgroundColor: '#3cceac',
        width: '100%',
        textAlign: 'center'
    },
    levelHeader:{
        color: '#060a03ff',
        fontWeight: 'bold',
        fontSize: 25,
        backgroundColor: '#3cceac',
        width: '70%',
        textAlign: 'center'
    },
    courseHeader:{
        color: '#ffffffff',
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: '#078d6e',
        textAlign: 'center',
        width: '100%',
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
