/*Planner page will show the degree planner details.
It will have a drop down for selecting which one the user wants to view.
It will show the courses in a table format.*/

import { View, StyleSheet, Text, ScrollView, FlatList, Modal } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CourseListButton from '../components/Planner/CourseListButton';
import BackButton from '../components/BackButton';
import degreePlanData from '../data/degree_plans.json'
import {useThemeText, useThemeBackground, useSecondColour, useThirdColour, useFirstColour, useThemeShaded} from "../contexts/ThemeContext";
import {useWindowDimensions} from "react-native";
import DropdownList from '../components/Planner/DropdownList';
import AddButton from '../components/Planner/AddButton';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { getDegreePlanByID } from '../services/degreePlannerService';

export default function PlannerScreen() {
    const [degreePlan, setDegreePlan] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [visible, setVisible] = useState(false);
    const [selectedYear, setSelectedYear] = useState(degreePlan.yearNumber ?? 1);

    const handlePlanSelect = async (plan) => {
        setCurrentPlan(plan.degree_plan_id);
        const result = await getDegreePlanByID(plan.degree_plan_id);
        if(result.success){
            const mapped = result.data.years.map(year => ({
                yearNumber: year.year_number,
                semesters: year.semesters.map(sem => ({
                    semesterNumber: sem.semester_number,
                    courses: sem.courses, 
                }))
            }));
            setDegreePlan(mapped);
        }
    };

    const addYear = () => {
        setDegreePlan(prev => [...prev, {yearNumber: prev.length + 1, semesters: []}]);
    }
    const addSemester = (yearIndex) => {
        setDegreePlan(prev => prev.map((year, index) => {
            if(index !== yearIndex) return year;

            const newSemesterNumber = year.semesters.length > 0 
                ? Math.max(...year.semesters.map(s => s.semesterNumber)) + 1
                : 1;
            setVisible(false);

            return {...year, semesters: [...year.semesters, {semesterNumber: newSemesterNumber, courses: []}]};

        }));
    }
    
    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const firstColour = useFirstColour();
    const themeShade = useThemeShaded();
    const {width} = useWindowDimensions();

    return(
        <SafeAreaProvider>
            <SafeAreaView style={{...themeBg, flexDirection: 'column', padding: 10, flex: 1, gap: 10}}>
                <Modal 
                visible={visible} 
                transparent={true} 
                animationType="slide">
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={[styles.modalView, themeBg]}>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <AddButton onPress={() => setVisible(false)} 
                            height={'auto'} width={'100%'} title=" < "
                            backgroundColor={'transparent'} color={themeText.color}></AddButton>
                            <Text style={[themeText, {marginBottom: 10, fontSize: 20}]}>Add Semester</Text>
                        </View>
                        
                        <View style = {{width: '100%', height: 'auto', marginBottom: 10}}>
                            <Picker
                            mode='dropdown'
                            style={[themeShade, themeText]}
                            selectedValue={selectedYear}
                            onValueChange={(itemValue) =>
                                setSelectedYear(itemValue)
                            }>
                            {degreePlan.map((year) => (
                                <Picker.Item
                                key={year.yearNumber}
                                label={`Year ${year.yearNumber}`}
                                value={year.yearNumber}
                                />
                            ))}
                            </Picker>
                        </View>
                        <AddButton onPress={() => addSemester(selectedYear-1)} 
                                height={40} width={width*0.4} title="Submit"
                                color={themeText.color} backgroundColor={firstColour.backgroundColor}></AddButton>
                    </View>
                </View>
            </Modal>
                <View style={{alignItems: 'center', justifyContent: 'center'}}> 
                    <View style={{height: 10}}></View>
                    <DropdownList onPlanSelect={handlePlanSelect}/>
                </View>
                <FlatList style={{flex: 1, width: width*0.95, alignSelf: 'center'}}
                    data={degreePlan}
                    extraData={degreePlan}
                    keyExtractor={item => item.yearNumber.toString()}
                    renderItem={({item}) => 
                        <YearSection yearNumber={item.yearNumber} 
                                    semesterData={item.semesters}
                                    currentPlan={currentPlan}>
                                    </YearSection>}
                />
                <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                          
                    <AddButton onPress={() => setVisible(true)} 
                            height={50} width={width*0.45} title="+ Add Semester"
                            backgroundColor={'#ffffff'} color={firstColour.backgroundColor}
                            borderWidth={2} borderColour={firstColour.backgroundColor}
                            opacity={0.4}></AddButton>
                    <AddButton onPress={() => addYear()} 
                            height={50} width={width*0.45} title="+ Add Year"
                            backgroundColor={'#ffffff'} color={firstColour.backgroundColor}
                            borderWidth={2} borderColour={firstColour.backgroundColor}
                            opacity={0.4}></AddButton>

                </View>
                <View>
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
function YearSection({yearNumber, semesterData, currentPlan}) {
    
    const themeText = useThemeText();
    const secondColour = useSecondColour();
    const thirdColour = useThirdColour();
    const navigation = useNavigation();
    

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
            </View>
            
            <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                {
                    semesterData.map(sem => (
                        <View key={sem.semesterNumber} style={{width: semesterWidth}}>
                            <Text style={[styles.semesterHeader, themeText, thirdColour]}>{GetSemesterTitle(sem.semesterNumber)}</Text>
                            <SemesterCourses courses={sem.courses}></SemesterCourses>
                            <AddButton onPress={() => {navigation.navigate('AddCourse',{yearIndex: yearNumber-1, semesterIndex: sem.semesterNumber-1, degreePlan: currentPlan})}} height={40} width={'100%'} title=" + " borderColour={"#000000"} borderWidth={1}></AddButton>
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
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
});
