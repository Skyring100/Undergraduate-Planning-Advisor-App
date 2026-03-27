/*Planner page will show the degree planner details.
It will have a drop down for selecting which one the user wants to view.
It will show the courses in a table format.*/

import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CourseListButton from '../components/Planner/CourseListButton';
import BackButton from '../components/BackButton';
import degreePlanData from '../data/degree_plans.json'
import {useThemeText, useThemeBackground, useSecondColour, useThirdColour} from "../contexts/ThemeContext";
import {useWindowDimensions} from "react-native";
import DropdownList from '../components/Planner/DropdownList';


export default function PlannerScreen() {

    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const {width} = useWindowDimensions();
    return(
        <SafeAreaProvider>
            <SafeAreaView style={{...themeBg, flexDirection: 'column', padding: 10,flex: 1, gap: 10}}>
                
                <View style={{alignItems: 'center', justifyContent: 'center'}}> 
                    <BackButton/>
                    <View style={{height: 10}}></View>
                    <DropdownList/>
                </View>
                <View style={{flex: 1, width: width*0.9, alignSelf: 'center', marginTop: 10}}>
                    {
                        degreePlanData.map(y => (
                            <View key={y.yearNumber}>
                                <YearSection yearNumber={y.yearNumber} semesterData={y.semesters}></YearSection>
                            </View>
                        ))
                    }
                </View>
            </SafeAreaView >
        </SafeAreaProvider>
    );
}

/**
 *  Adds a UI section with year information in the planner
 * @param {*} yearData Object with year data consisting of the year number and each semester courses
 * @returns 
 */
function YearSection({yearNumber, semesterData}) {
    
    const themeText = useThemeText();
    const secondColour = useSecondColour();
    const thirdColour = useThirdColour();
    var semesterWidth;

    switch(semesterData.length){
        case 2:
            semesterWidth = '50%'
            break;
        case 3:
            semesterWidth = '33.333%'
            break;
        case 1:
            semesterWidth = '100%'
            break;
    }

    function GetSemesterTitle(semNum){
        switch(semNum){
            case 1:
                return "Fall"
            case 2:
                return "Winter"
            case 3:
                return "Summer"
        }
    }

    return (
        <View>
            <Text style={[styles.yearHeader, secondColour, themeText]}>Year {yearNumber}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                {
                    semesterData.map(sem => (
                        <View key={sem.semesterNumber} style={{width: semesterWidth}}>
                            <Text style={[styles.semesterHeader, themeText, thirdColour]}>{GetSemesterTitle(sem.semesterNumber)}</Text>
                            <SemesterCourses courses={sem.courses}></SemesterCourses>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

function SemesterCourses({courses}){
    return (
        <View>
            <ScrollView>
                {
                    courses.map(c=>(
                        <View key={c.id}>
                            <CourseListButton course={c}></CourseListButton>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    yearHeader:{
        color: '#060a03ff',
        fontWeight: 'bold',
        fontSize: 25,
        width: '100%',
        textAlign: 'center'
    },
    semesterHeader:{
        color: '#ffffffff',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        borderRightWidth: 1,
        borderLeftWidth: 1
    },
    semesterSection: {
        width: '50%'
    }
});
