/*RequiredCourses page will show the list of courses the user is required to take for their degree program.
It will also show what electives they have chosen for each degree planner.
It will have a dropdown to select different degree planners and view the courses accordingly.
There will be a button that will navigate to the CourseList page.*/ 

import { View, StyleSheet, FlatList, Text, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import { useThemeText, useThemeBackground,
    useFirstColour, useSecondColour, useThirdColour} from "../contexts/ThemeContext";
import AllCoursesButton from '../components/Requistes/AllCoursesButton';
import CourseCompletedButton from '../components/Requistes/CourseCompletedButton';

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

export default function RequiredCoursesScreen() {
    // when this is added, use these as style components for text colour instead of #fff and #000
        const themeText = useThemeText();
        const themeBg = useThemeBackground();
        const firstColour = useFirstColour();
        const {width, height} = useWindowDimensions();
    
        return (
            <SafeAreaProvider>
                <SafeAreaView style={[{width: width, height: height}, themeBg]}>
                    <View style={[themeBg, {alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row', marginRight: 20, marginBottom: 10}]}>
                        <BackButton/>
                        <AllCoursesButton/>
                    </View>
                    <FlatList
                        data={DummyData}
                        ListHeaderComponent={<Text style={[styles.header, themeText, firstColour]}>Required Courses</Text>}
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
                        <View key={course.courseCode} style={{flexDirection: 'row', justifyContent: 'center',}}>
                            <Text style={[styles.courseHeader, themeText, thirdColour]}>{course.courseCode}</Text>
                            <CourseCompletedButton/>
                        </View>
                    ))
                }
            </View>
        </View>
    )
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
