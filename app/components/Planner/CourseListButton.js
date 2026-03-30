import { TouchableOpacity, Text, StyleSheet, Modal, Pressable, View } from 'react-native';
import {useState} from 'react';
import { useThemeBackground, useThemeText } from '../../contexts/ThemeContext';


export default function CourseListButton({course}) {
    const [modalVisible, setModalVisible] = useState(false);
    const handlePress = () => {
        setModalVisible(true);
    }

    const buttonText = (course.id != null) ? course.id : "----";
    const bgColour = useThemeBackground();
    const textColour = useThemeText();

    return (
        <TouchableOpacity
            style={[styles.courseButton, bgColour]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={[styles.buttonText, textColour]}>{buttonText}</Text>
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
                        </View>
                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    courseButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderBlockColor: '#00000',
        height: 40,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        padding: 5
    },popupBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000ff',
        opacity: 0.65,
    },
    buttonClose: {
        width: 50,
        marginTop: 35,
        backgroundColor: '#2196F3',
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
        backgroundColor: '#ffffffff'
    }
});