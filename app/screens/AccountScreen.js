
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, StyleSheet, Dimensions, View, useWindowDimensions, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../contexts/UserContext';
import BackButton from '../components/BackButton';
import DarkLightButton from '../components/Settings/DarkLightButton';
import ColourButton from '../components/Settings/ColourButton';
import { ThemeProvider, useThemeStore, useThemeText, useThemeBackground } from "../contexts/ThemeContext";
import LogoutButton from '../components/Settings/LogoutButton';
import GeneralMenuButton from '../components/GeneralMenuButton';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../services/authService';
import { updateFirstName, updateLastName } from '../services/userService';

const screenWidth = Dimensions.get('window').width;
const inputWidth = screenWidth * 0.85; // 85% of screen



export default function AccountScreen() {
    const [passwordResetText, setPasswordResetText] = useState('');
    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const {width} = useWindowDimensions();
    const [modal, setModal] = useState({ visible: false, title: '', onConfirm: null, input: '' });

    const resetPassword = async () =>{
        const email = await AsyncStorage.getItem("email");
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setPasswordResetText("Password reset email has been sent! Check your email at "+email);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Firebase Password Reset Error: "+errorCode+" "+errorMessage)
            setPasswordResetText("Email could not be sent, try again later");
        });
    }

    const handleUpdateFirstName = async () => {
        const studentID = await AsyncStorage.getItem('student_id');
        setModal({ visible: true, title: 'Update First Name', onConfirm: (val) => updateFirstName(studentID, val), input: '' });
    };

    const handleUpdateLastName = async () => {
        const studentID = await AsyncStorage.getItem('student_id');
        setModal({ visible: true, title: 'Update Last Name', onConfirm: (val) => updateLastName(studentID, val), input: '' });
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, themeBg, {width: width}]}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, themeText]}>Account</Text>
                </View>
                <View>
                    <GeneralMenuButton handlePress={handleUpdateFirstName} text={"Update First Name"} />
                </View>
                <View>
                    <GeneralMenuButton handlePress={handleUpdateLastName} text={"Update Last Name"} />
                </View>
                <View>
                    <GeneralMenuButton handlePress={resetPassword} text={"Reset password"}></GeneralMenuButton>
                </View>
                <Text>
                    {passwordResetText}
                </Text>
                
                <Modal transparent visible={modal.visible} onRequestClose={() => setModal(m => ({ ...m, visible: false }))}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 24, width: '80%', gap: 12 }}>
                            <Text style={{ fontSize: 17, fontWeight: '600' }}>{modal.title}</Text>
                            <TextInput
                                autoFocus
                                value={modal.input}
                                onChangeText={(val) => setModal(m => ({ ...m, input: val }))}
                                style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8 }}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                                <TouchableOpacity onPress={() => setModal(m => ({ ...m, visible: false }))}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { 
                                    if (!modal.input.trim()) return;
                                    modal.onConfirm(modal.input);
                                    setModal(m => ({ ...m, visible: false }));
                                    }}>
                                    <Text style={{ fontWeight: '600' }}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                
            </SafeAreaView >
        </SafeAreaProvider>
    );
}



const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        padding: 80
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        margin: 'auto',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    buttonText: {
        color: '#fff',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        marginTop: 10,
        width: inputWidth
    },
});
