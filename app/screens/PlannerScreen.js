/*Planner page will show the degree planner details.
It will have a drop down for selecting which one the user wants to view.
It will show the courses in a table format.*/

import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CourseListButton from '../components/Planner/CourseListButton';
import BackButton from '../components/BackButton';
import degreePlanData from '../data/degree_plans.json'
import {useThemeText, useThemeBackground, useSecondColour, useThirdColour} from "../contexts/ThemeContext";
import {useWindowDimensions} from "react-native";
import DropdownList from '../components/Planner/DropdownList';
import AddButton from '../components/Planner/AddButton';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';



export default function PlannerScreen() {
    const [degreePlan, setDegreePlan] = useState(degreePlanData);

    const addYear = () => {
        setDegreePlan(prev => [...prev, {yearNumber: prev.length + 1, semesters: []}]);
    }
    const addSemester = (yearIndex) => {
        setDegreePlan(prev => prev.map((year, index) => {
            if(index !== yearIndex) return year;

            const newSemesterNumber = year.semesters.length > 0 
                ? Math.max(...year.semesters.map(s => s.semesterNumber)) + 1
                : 1;
            return {...year, semesters: [...year.semesters, {semesterNumber: newSemesterNumber, courses: []}]};

        }));
    }

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
                <FlatList style={{flex: 1, width: width*0.95, alignSelf: 'center'}}
                    data={degreePlan}
                    extraData={degreePlan}
                    keyExtractor={item => item.yearNumber.toString()}
                    renderItem={({item}) => 
                        <YearSection yearNumber={item.yearNumber} 
                                    semesterData={item.semesters}
                                    onAddSemester={addSemester}>
                                    </YearSection>}
                    ListFooterComponent={() => (
                        <AddButton onPress={() => addYear()} 
                                    height={50} width={'100%'} title="Add Year"></AddButton>
                    )}/>
            </SafeAreaView >
        </SafeAreaProvider>
    );
}

/**
 *  Adds a UI section with year information in the planner
 * @param {*} yearData Object with year data consisting of the year number and each semester courses
 * @returns 
 */
function YearSection({yearNumber, semesterData, onAddSemester}) {
    
    const themeText = useThemeText();
    const secondColour = useSecondColour();
    const thirdColour = useThirdColour();
    const navigation = useNavigation();
    
    const MAX_SEMESTERS = 3;

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
            <View style={[styles.yearHeader, secondColour]}>
                <Text style={[styles.yearText, themeText]}>Year {yearNumber}</Text>
                <AddButton onPress={() => onAddSemester(yearNumber-1)} 
                            height={40} width={40} title=" + "
                            disabled={semesterData.length >= MAX_SEMESTERS}></AddButton>
            </View>
            
            <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                {
                    semesterData.map(sem => (
                        <View key={sem.semesterNumber} style={{width: semesterWidth}}>
                            <Text style={[styles.semesterHeader, themeText, thirdColour]}>{GetSemesterTitle(sem.semesterNumber)}</Text>
                            <SemesterCourses courses={sem.courses}></SemesterCourses>
                            <AddButton onPress={() => {navigation.navigate('AddCourse',{yearIndex: yearNumber-1, semesterIndex: sem.semesterNumber-1})}} height={40} width={'100%'} title=" + " borderColour={"#000000"} borderWidth={1}></AddButton>
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
            <View>
                {
                    courses.map(c=>(
                        <View key={c.id}>
                            <CourseListButton course={c}></CourseListButton>
                        </View>
                    ))
                }
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    yearHeader:{
        padding: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
    },
    yearText: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
    },
    semesterHeader:{
        color: '#ffffffff',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        borderWidth: 1,
        height: 40,
        padding: 8,
    },
    semesterSection: {
        width: '50%'
    }
});
