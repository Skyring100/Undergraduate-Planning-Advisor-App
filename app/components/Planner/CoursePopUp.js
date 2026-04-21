import { TouchableOpacity, Text, StyleSheet, Modal, Pressable, View, Dimensions } from 'react-native';
import {useState} from 'react';
import { useThemeText, useThirdColour} from '../../contexts/ThemeContext';
import { addCourseToDegreePlan } from '../../services/degreePlannerService';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CoursePopUPButton({course, yearIndex, semesterIndex, degreePlanID}) {
    const [modalVisible, setModalVisible] = useState(false);
    const handlePress = () => {
        setModalVisible(true);
    }
    const themeText = useThemeText();
    const thirdColour = useThirdColour();
    const buttonText = (course.id != null) ? course.id : "----";
    const buttonText2 = (course.title != null) ? course.title : "----";
    const navigation = useNavigation();

    const handleAddToPlanner = async() =>{
        try{
            const key = `degree_plan_${degreePlanID}`;
            const raw = await AsyncStorage.getItem(key);
            const plan = raw ? JSON.parse(raw) : {degree_ids: [], years: []};

            let year = plan.years.find(y => y.year_number === yearIndex + 1);
            if (!year){
                    year = {year_number: yearIndex+1, semesters:[]};
                    plan.years.push(year);
            }

            let semester = year.semesters.find(s => s.semester_number === semesterIndex + 1);
            if (!semester){
                semester = {semester_number: semesterIndex+1, courses:[]};
                year.semesters.push(semester);
            }

            if (!semester.courses.includes(course.id)){
                semester.courses.push(course.id);
            }

            await AsyncStorage.setItem(key, JSON.stringify(plan));
            console.log('Degree Plan: ', JSON.stringify(plan));
            //setSelectedCourse(null);
            //navigation.goBack();
        } catch (e) {
            console.error('Failed to add course: ', e);
        }
    };

    return (
        <TouchableOpacity
            style={[styles.courseButton]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={[styles.buttonText, themeText]}>{buttonText}</Text>
            <Text style={[styles.buttonTextLight, themeText]}>{buttonText2}</Text>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>
                <View style={styles.popupBackground}>
                    <View style={styles.mainContent}>
                        <View>
                            <Text style={styles.modalText}>{buttonText}: {buttonText2}</Text>
                            <Text style={styles.modalText}>{course.desc}</Text>
                            <Text style={styles.modalText}>{course.prereq}</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Pressable onPress={() => setModalVisible(!modalVisible)} style={[styles.buttonClose, thirdColour]}>
                                <Text style={styles.textStyle}>Back</Text>
                            </Pressable>
                            <Pressable onPress={handleAddToPlanner} style={[styles.buttonClose, thirdColour]}>
                                <Text style={styles.textStyle}>Add to Planner</Text>
                            </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
}

export const styles = StyleSheet.create({
    courseButton: {
        color: '#ffffffff',
        fontWeight: 'bold',
        fontSize: 20,
        //backgroundColor: '#078d6e',
        textAlign: 'center',
        width: '70%',
        flexDirection: "row",
        alignItems: "center",
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        padding: 5
    },
    buttonTextLight: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        padding: 5
    },
    popupBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        // margin: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    mainContent: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#fff',
    }
});
