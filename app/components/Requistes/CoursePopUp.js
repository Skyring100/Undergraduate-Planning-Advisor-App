import { TouchableOpacity, Text, StyleSheet, Modal, Pressable, View } from 'react-native';
import {useState} from 'react';
import { useThemeText, useThirdColour} from '../../contexts/ThemeContext';


export default function CoursePopUPButton({course}) {
    const [modalVisible, setModalVisible] = useState(false);
    const handlePress = () => {
        setModalVisible(true);
    }
    const themeText = useThemeText();
    const thirdColour = useThirdColour();
    const buttonText = (course.id != null) ? course.id : "----";

    return (
        <TouchableOpacity
            style={[styles.courseButton, thirdColour]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={[styles.buttonText, themeText]}>{buttonText}</Text>
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
                            <Pressable onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                        
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    courseButton: {
        color: '#ffffffff',
        fontWeight: 'bold',
        fontSize: 20,
        //backgroundColor: '#078d6e',
        textAlign: 'center',
        width: '70%',
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