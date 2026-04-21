
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, StyleSheet, Dimensions, View, useWindowDimensions } from 'react-native';
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

const screenWidth = Dimensions.get('window').width;
const inputWidth = screenWidth * 0.85; // 85% of screen



export default function AccountScreen() {
    const [passwordResetText, setPasswordResetText] = useState('');
    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const {width} = useWindowDimensions();

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

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, themeBg, {width: width}]}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, themeText]}>Account</Text>
                </View>
                <View>
                    <GeneralMenuButton handlePress={resetPassword} text={"Reset password"}></GeneralMenuButton>
                </View>
                <Text>
                    {passwordResetText}
                </Text>
                <View style={{alignItems: 'center', justifyContent: 'center',}}>
                    <DarkLightButton/>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <ColourButton colour={'Green'} index={0}/>
                    <ColourButton colour={'Red'} index={1}/>
                    <ColourButton colour={'Blue'} index={2}/>
                    <ColourButton colour={'Pink'} index={3}/>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <ColourButton colour={'Purple'} index={4}/>
                    <ColourButton colour={'Yellow'} index={5}/>
                    <ColourButton colour={'Orange'} index={6}/>
                    <ColourButton colour={'Grey'} index={7}/>
                </View>
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
