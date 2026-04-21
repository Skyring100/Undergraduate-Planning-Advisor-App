import { TouchableOpacity, Text, StyleSheet, Modal, Pressable, View, Dimensions } from 'react-native';
import {useState} from 'react';
import { useThemeText, useThirdColour} from '../../contexts/ThemeContext';
import { addCourseToDegreePlan } from '../../services/degreePlannerService';
import { useNavigation } from '@react-navigation/native';

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
        console.log('Adding course with: ', {
            degreePlanID,
            yearIndex,
            semesterIndex,
            course_id: course.id
        });

        const result = await addCourseToDegreePlan(
            degreePlanID,
            yearIndex+1,
            semesterIndex+1,
            course.id
        );

        console.log('Add course result: ', JSON.stringify(result));

        if(result.success){
            setModalVisible(false);
            navigation.goBack();
        } else {
            console.error('Failed to add course');
        }
    }

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
                            <Text style={styles.modalText}>{course.id.replace(/\n/g, ' ')}: {course.title}</Text>
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
