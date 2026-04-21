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
import { useNavigation, useIsFocused, } from '@react-navigation/native';
import { useState, useEffect, } from 'react';
import { Picker } from '@react-native-picker/picker';
import { addCourseToDegreePlan, createDegreePlan, getDegreePlanByID } from '../services/degreePlannerService';
import AsyncStorage from '@react-native-async-storage/async-storage';

 

export default function PlannerScreen() {
    const [degreePlan, setDegreePlan] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [visible, setVisible] = useState(false);
    const [selectedYear, setSelectedYear] = useState(degreePlan.yearNumber ?? 1);
    const [studentID, setStudentID] = useState();
    const [degreeID, setDegreeID] = useState();
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [savePromptVisible, setSavePromptVisible] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);

    const isFocused = useIsFocused();

    // TODO: use "setCurrentUserDegreePlan" in userService to change the user's selected degree plan
    // Whenever you want to access selected degree plan, use "await AsyncStorage.getItem("current_degree_plan_id")"

    /*
    useEffect(() => {
        AsyncStorage.getItem("student_id").then((studentID) => {
            AsyncStorage.getItem("current_degree_plan_id").then((planID) => {
                // If there is no current plan, create a default plan for user
                if(!planID){
                    console.log("No exisitng current degree plan, making default plan...");
                    createDegreePlan("My Degree Plan", studentID, 0).then((apiResult) => {
                        if (apiResult.success){
                            setCurrentPlan(apiResult.data.lastInsertRowid);
                            console.log("generated new default degree plan with id "+apiResult.data.lastInsertRowid);
                        }else{
                            console.log("Unable to create default degree plan!");
                            setCurrentPlan(undefined);
                        }
                    });
                }else{
                    console.log("Default plan id detected: ");

                    setCurrentPlan(planID);
                }
            });
        });
        
    }, []);
    */
    /*
        useEffect(() => {  
            getStoredData();

            console.log(studentID);
            console.log(currentPlan);
            console.log(degreeID);
            // If there is no current plan, create a default plan for user
            if(!currentPlan){
                console.log("No exisitng current degree plan, making default plan...");
                createDegreePlan("My Degree Plan", studentID, degreeID).then((apiResult) => {
                    if (apiResult.success){
                        setCurrentPlan(apiResult.data.lastInsertRowid);
                        console.log("generated new default degree plan with id "+apiResult.data.lastInsertRowid);
                    }else{
                        console.log("Unable to create default degree plan!");
                        setCurrentPlan(undefined);
                    }
                });
            }else{
                console.log("Default plan id detected: ");
                setCurrentPlan(currentPlan);
            }
    }, []);

    const getStoredData = async () => {
        const studentID = await AsyncStorage.getItem("student_id");
        const planID = await AsyncStorage.getItem("current_degree_plan_id");
        const degreeID = await AsyncStorage.getItem("current_degree_id");
        setStudentID(studentID);
        setCurrentPlan(planID);
        setDegreeID(degreeID);
    };
    */

    useEffect(()=> {
        if(!isFocused) return;

        const refreshPlan = async () => {
            try{
                const planId = await AsyncStorage.getItem('current_plan_id');
                if(!planId) return;

                const raw = await AsyncStorage.getItem(`degree_plan_${planId}`);
                if (!raw) return;

                const plan = JSON.parse(raw);

                const mapped = plan.years.map(year => ({
                    yearNumber: year.year_number,
                    semesters: year.semesters.map(sem => ({
                        semesterNumber: sem.semester_number,
                        courses: sem.courses,
                    }))
                }));
                setDegreePlan(mapped);
                setCurrentPlan(planId);
                setHasUnsavedChanges(true);
            } catch (e) {
                console.error('Failed to refresh plan: ', e);
            }
        };

        refreshPlan();
    }, [isFocused]);
    

    const handlePlanSelect = async (plan) => {
        setDegreePlan([]);
        setCurrentPlan(plan.degree_plan_id);
        await AsyncStorage.setItem('current_plan_id', String(plan.degree_plan_id));

        const existing = await AsyncStorage.getItem(`degree_plan_${plan.degree_plan_id}`);
        if(!existing){
            const newPlan = {degree_ids: [plan.degree_plan_id], years: []};
            await AsyncStorage.setItem(`degree_plan_${plan.degree_plan_id}`, JSON.stringify(newPlan));
        } else {
            const parsed = JSON.parse(existing);
            const mapped = parsed.years.map(year => ({
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
        setHasUnsavedChanges(true);
        setDegreePlan(prev => [...prev, {yearNumber: prev.length + 1, semesters: []}]);
    };
    const addSemester = (yearIndex) => {
        setHasUnsavedChanges(true);
        setDegreePlan(prev => prev.map((year, index) => {
            if(index !== yearIndex) return year;

            const newSemesterNumber = year.semesters.length > 0 
                ? Math.max(...year.semesters.map(s => s.semesterNumber)) + 1
                : 1;
            setVisible(false);

            return {...year, semesters: [...year.semesters, {semesterNumber: newSemesterNumber, courses: []}]};

        }));
    };

    

    const handleSave = async () => {
        try{
            const planId = await AsyncStorage.getItem('current_plan_id');
            const raw = await AsyncStorage.getItem(`degree_plan_${planId}`);
            if(!raw) return;

            const plan = JSON.parse(raw);

            for(const year of plan.years){
                for(const semester of year.semesters){
                    for(const course of semester.courses){
                        const courseID = typeof course === 'object' ? course.id : course;
                        await addCourseToDegreePlan(
                            planId,
                            year.year_number,
                            semester.semester_number,
                            courseID
                        );
                    }
                }
            }
            setHasUnsavedChanges(false);
            alert('Plan saved!');
        } catch (e) {
            console.error('Failed to save plan: ', e);
        }
    }
    
    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const firstColour = useFirstColour();
    const themeShade = useThemeShaded();
    const {width} = useWindowDimensions();

    return(
        <SafeAreaProvider>
            <SafeAreaView style={{...themeBg, flexDirection: 'column', padding: 10, flex: 1, gap: 10, paddingTop: 15}}>
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
            <Modal 
                visible={savePromptVisible} 
                transparent={true} 
                animationType="fade">
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={[styles.modalView, themeBg]}>
                        <Text style={[themeText, {marginBottom: 10, fontSize: 20}]}>Would you like to save your degree plans?</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <AddButton onPress={async () => {
                                await handleSave();
                                setSavePromptVisible(false);
                                setHasUnsavedChanges(false);
                                pendingAction && pendingAction(); 
                            }} 
                                height={'auto'} width={'45%'} title=" Save "
                                backgroundColor={firstColour.backgroundColor} color={themeText.color}></AddButton>
                            <AddButton onPress={() => {
                                setSavePromptVisible(false);
                                setHasUnsavedChanges(false);
                                pendingAction && pendingAction();
                            }} 
                                    height={40} width={'45%'} title="Don't Save"
                                    color={themeText.color} backgroundColor={firstColour.backgroundColor}></AddButton>
                        </View>
                        
                        
                    </View>
                </View>
                </Modal>
                <View style={{alignItems: 'center', justifyContent: 'center'}}> 
                    <View style={{height: 10}}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <DropdownList onPlanSelect={handlePlanSelect}/>
                        <AddButton onPress={async () => {
                                await handleSave();
                                setSavePromptVisible(false);
                                setHasUnsavedChanges(false);
                                pendingAction && pendingAction(); 
                            }} 
                                height={50} width={'auto'} title=" Save "
                                backgroundColor={firstColour.backgroundColor} color={themeText.color}
                                padding={5} marginRight={-6} marginLeft={-25}></AddButton>
                    </View>
                    
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
                            height={50} width={width*0.45} title="+ Semester"
                            backgroundColor={'#ffffff'} color={firstColour.backgroundColor}
                            borderWidth={2} borderColour={firstColour.backgroundColor}
                            opacity={0.4}></AddButton>
                    <AddButton onPress={() => addYear()} 
                            height={50} width={width*0.45} title="+ Year"
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
    const colour = useFirstColour();
    const shade = useThemeShaded();
    const themebg = useThemeBackground();
    const navigation = useNavigation();
    

    // var semesterWidth;

    // switch(semesterData.length){
    //     case 2:
    //         semesterWidth = '50%'
    //         break;
    //     case 3:
    //         semesterWidth = '33.333%'
    //         break;
    //     case 1:
    //         semesterWidth = '100%'
    //         break;
    // }

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
        <View style={{marginVertical: 5}}>
            <View style={[styles.yearHeader, colour]}>
                <Text style={styles.yearText}>Year {yearNumber}</Text>
            </View>
            
            <View style={[styles.yearContainer, shade]}>
                {
                    semesterData.map(sem => (
                        <View key={sem.semesterNumber} style={{width: '100%'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 2}}>
                                <Text style={[styles.semesterHeader, themeText, shade]}>{GetSemesterTitle(sem.semesterNumber)}</Text>
                                <AddButton onPress={() => {navigation.navigate('AddCourse',{yearIndex: yearNumber-1, semesterIndex: sem.semesterNumber-1, degreePlanID: currentPlan})}} height={'auto'} width={'auto'} title=" + " marginTop={5} color={themeText.color}></AddButton>
                            </View>
                            <View style={[styles.line, {borderColor: colour.backgroundColor}]}/>
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
            <View>
                {
                    courses.map(c=>(
                        <View key={c}>
                            <CourseListButton course={{id: c}}></CourseListButton>
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
        paddingLeft: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        zIndex: 1,
    },
    yearText: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        color: '#ffffff',
    },
    semesterHeader:{
        color: '#ffffffff',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left',
        height: 40,
        padding: 8,
        width: 'auto',
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
    yearContainer:{
        justifyContent: 'center', 
        paddingTop: 45, 
        marginTop: -40,
        borderRadius: 20,
        padding: 10,
        
    },
    line:{
        height: 21,
        width: '89%',
        borderBottomWidth: 4,
        borderStyle: 'dotted',
        zIndex: 1,
        marginTop: -38,
        marginBottom: 20,
        marginHorizontal: 15,
    }
});
