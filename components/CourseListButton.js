import { TouchableOpacity, Text, StyleSheet, Modal, Pressable, View } from 'react-native';
import {useState} from 'react';


export default function CourseListButton({course}) {
    const [modalVisible, setModalVisible] = useState(false);
    const handlePress = () => {
        setModalVisible(true);
    }

    const buttonText = (course.id != null) ? course.id : "----";

    return (
        <TouchableOpacity
            style={styles.courseButton}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}>{buttonText}</Text>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>
                <View style={styles.popupBackground}>
                    <View style={styles.mainContent}>
                        <Text style={styles.modalText}>Hello World!</Text>
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
        backgroundColor: '#035642',
        borderWidth: 1,
        borderBlockColor: '#00000'
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
        backgroundColor: '#ffffffff',
        opacity: 1.0
    }
});