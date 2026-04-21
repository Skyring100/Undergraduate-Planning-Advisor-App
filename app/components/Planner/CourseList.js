
/*CourseList page will show the list of all courses.
It will have a search bar to filter courses by name or CRN.
Each course will have an 'Add to Planner' button that allows users to add the course to their degree planner.*/

import { View, StyleSheet, FlatList, Text, ScrollView, useWindowDimensions, TouchableOpacity, TextInput, Button, Modal, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import degreePlanData from '../data/degree_plans.json'
import BackButton from '../components/BackButton';
import { useThemeText, useThemeBackground,
    useFirstColour, useSecondColour, useThirdColour} from "../contexts/ThemeContext";
import Collapsible from 'react-native-collapsible';
import { useEffect, useState } from 'react';
import CollapsibleView from '../components/CollapsibleView';
import { getAllCourses } from '../services/courseService';
import CoursePopUp from '../components/CoursePopUp';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addCourseToDegreePlan } from '../services/degreePlannerService';




export default function CourseList() {

    // when this is added, use these as style components for text colour instead of #fff and #000
    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const firstColour = useFirstColour();
    const {width, height} = useWindowDimensions();

    const [courses, setCourses] = useState(null);
    const [filteredCourseTypes, setFilteredCourseTypes] = useState([]);
    const [activeType, setActiveType] = useState("All");

    const [selectedCourse, setSelectedCourse] = useState(null);

    const route = useRoute();
    const navigation = useNavigation();
    const {yearIndex, semesterIndex, degreePlanID} = route.params;

    const handleAddToPlanner = async() =>{
        console.log('Adding course with: ', {
            degreePlanID,
            yearIndex,
            semesterIndex,
            course_id: selectedCourse.course_id
        })
        const result = await addCourseToDegreePlan(
            degreePlanID,
            yearIndex+1,
            semesterIndex+1,
            selectedCourse.course_id
        );

        console.log('Add course result: ', JSON.stringify(result));

        if(result.success){
            setSelectedCourse(null);
            navigation.goBack();
        } else {
            console.error('Failed to add course');
        }
    }

    useEffect(() => {
        getAllCourses().then((apiResult) => {
            if (apiResult.success){
                setCourses(apiResult.data);
                setFilteredCourseTypes([...new Set(apiResult.data.map(course => course.course_id.slice(0,4)))].sort());
                
            }else{
                alert("API call was unsuccessful");
                setCourses([]);
            }
        });

    }, []);

    const course_type = ["All"].concat(filteredCourseTypes);

    const filteredCourses = activeType === "All"
        ? courses
        : courses.filter(course => course.course_id.trim().startsWith(activeType));
        
        
    

    return (
        <SafeAreaProvider>
        <SafeAreaView style={[{width: width, minHeight: height, }, themeBg]}>
            
            <View style={[{alignItems: 'center', justifyContent: 'center', backgroundColor: '#4b4b4b'}]}>

                <CollapsibleView>
                    <ScrollView style={styles.filterScrollView}>
                        <View style={styles.filterRow}>
                            {course_type.map(type => (
                                <TouchableOpacity
                                    key={type}
                                    onPress={() => setActiveType(type)}
                                    style={[styles.filter, activeType === type && styles.filterActive]}
                                >
                                    <Text style={[styles.filterText, activeType === type && styles.filterTextActive]}>
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </CollapsibleView>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={selectedCourse !== null}
                onRequestClose={() => setSelectedCourse(null)}>
                <View style={styles.popupBackground}>
                    <View style={styles.mainContent}>
                        {selectedCourse && (
                        <View>
                            <Text style={styles.modalText}>{selectedCourse.course_id.replace(/\n/g, ' ')}: {selectedCourse.title}</Text>
                            <Text style={styles.modalText}>{selectedCourse.description}</Text>
                            <Text style={styles.modalText}>{selectedCourse.prereq}</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Pressable onPress={() => setSelectedCourse(null)} style={[styles.buttonClose]}>
                            <Text style={styles.textStyle}>Back</Text>
                            </Pressable>
                            <Pressable onPress={() => {}} style={[styles.buttonClose]}>
                            <Pressable onPress={handleAddToPlanner} style={[styles.buttonClose]}>
                                <Text style={styles.textStyle}>Add to Planner</Text>
                            </Pressable>
                            </View>
                        </View>
                        )}
                    </View>
                </View>
            </Modal>

            <FlatList style={styles.FlatList}
                data={filteredCourses}
                renderItem={({item}) => (

                    <TouchableOpacity
                        onPress={() => setSelectedCourse(item)} 
                        activeOpacity={0.7}
                    >
                        <View course={item} style={styles.contentBackground}>
                            <View >
                                <View style={{backgroundColor: firstColour.backgroundColor, height: 5, width: 'auto'}}/>
                                <Text style={styles.courseTitle}>{item.course_id}</Text>
                                <Text style={styles.courseText}>{item.title}</Text>
                                <Text style={styles.courseText}>{item.prereq}</Text>
                                <View  style={{flexDirection:'row', flex:1}}>
                                    <View style={{flex:1}}/>
                                    <Button style={{flex:1}} title='+'/>
                                </View>
                                
                            </View>

                        </View >
                        
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.course_id}
                ListFooterComponent={
                    <SafeAreaView style={{marginBottom: 470}}>
                    </SafeAreaView>
                }
            />
        </SafeAreaView>
        </SafeAreaProvider>
    )
}








const styles = StyleSheet.create({
    
    courseTitle: {
        color: '#ffffff',
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    courseText: {
        color: '#ffffff',
        marginBottom: 10,
        textAlign: 'center',
    },
    contentBackground: {
        backgroundColor: '#4b4b4b',
        borderRadius: 14,
        borderColor: '#6f6f6f',
        borderWidth: 3,
        margin: 5,
        overflow: 'hidden'
    },
    FlatList: {
        backgroundColor: '#1a1a1a',
    },
    filterRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    filter: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#6f6f6f',
        backgroundColor: '#2b2b2b',
        alignItems: 'center',
        width: 'auto'
    },
    filterActive: {
        backgroundColor: '#008cff',
    },
    filterText: {
        fontSize: 13,
        color: '#aaa',
    },
    filterTextActive: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '500',
    },
    filterScrollView: {
        height: 150
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonClose: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 10,
        borderRadius: 18,
        width: '45%',
        height: 45,
    },
    popupBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContent: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#fff',
    }
});
