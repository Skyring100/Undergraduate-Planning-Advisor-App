import { TouchableOpacity, Text, StyleSheet, Modal, Pressable, View } from 'react-native';
import {useState} from 'react';
import { useFirstColour, useThemeBackground, useThemeText, useThirdColour } from '../../contexts/ThemeContext';


export default function CourseListButton({course}) {
    const [modalVisible, setModalVisible] = useState(false);
    const handlePress = () => {
        setModalVisible(true);
    }
    const themeText = useThemeText();
    const colour = useFirstColour();
    const themeBg = useThemeBackground();
    const courseID = course.id.slice(0, 4) + ' ' + course.id.slice(4);
    const buttonText = (course.id != null) ? courseID : "----";

    return (
        <TouchableOpacity
            style={[styles.courseButton, themeBg]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View style={{flexDirection: 'row', marginLeft: 15, alignItems: 'center'}}>
                <View style={[styles.line, colour]}/>
                <Text style={[styles.buttonText, themeText]}>{buttonText}</Text>
            </View>
            
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
                            <Text style={styles.modalText}>{course.id}: {course.title}</Text>
                            <Text style={styles.modalText}>{course.desc}</Text>
                            <Text style={styles.modalText}>{course.prereq}</Text>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Pressable onPress={() => setModalVisible(!modalVisible)} style={[styles.buttonClose, colour]}>
                                <Text style={styles.textStyle}>Back</Text>
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
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 18,
        height: 40,
        marginBottom: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        padding: 5,
        marginLeft: 5,
    },popupBackground: {
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
    },
    line:{
        height: '80%',
        width: 5,
        borderRadius: 5,
    }
});