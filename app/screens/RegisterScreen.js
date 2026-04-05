/*Register page will have sections for name, email, password, and confirm password.
Degree program and start year will be dropdowns.
On clicking register it will validate inputs and navigate to Dashboard page.*/

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, View, TextInput, Dimensions } from "react-native"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../contexts/UserContext';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/LoginRegister/SubmitButton';
import {useWindowDimensions} from "react-native";
import {registerUser} from '../services/authService';

const screenWidth = Dimensions.get('window').width;
const inputWidth = screenWidth * 0.85; // 85% of screen

const alert = (title, message) => {
    if (typeof window !== 'undefined' && window.alert) {
        window.alert(`${title}: ${message}`);
    }
};

export default function RegisterScreen() {

    const navigation = useNavigation();
    
    const { setUser } = useUserStore();
    const [emailInput, setEmailInput] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);

    const {width} = useWindowDimensions();

    const handleSubmit = async () => {
        if (!emailInput || !password || !confirmedPassword || !firstName) {
            alert('Error', 'Please fill in all fields');
            return;
        }
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            alert('Error', 'Please enter a valid email address');
            return;
        }
        // Length validation: min 5, max 20 characters
        if (emailInput.length < 5 || emailInput.length > 20) {
            alert('Error', 'Email must be between 5 and 20 characters');
            return;
        }
        if (password.length < 6 || password.length > 20) {
            alert('Error', 'Password must be between 6 and 20 characters');
            return;
        }
        if (password != confirmedPassword) {
            alert('Error', 'Passwords dont match');
            return;
        }
        
        setLoading(true);
        const result = await registerUser(emailInput, password, firstName, lastName);

        if (result.success){
            setLoading(false);
            // Navigate to MainTabs (bottom tab navigator)
            navigation.navigate('Login');
            // Reset form
            setEmailInput('');
            setPassword('');
            setConfirmedPassword('');
            setFirstName('');
            setLastName('');
        }else{
            setLoading(false);
            alert('Error', result.message);
        }

    };


    
    return(
        <SafeAreaProvider>
        <SafeAreaView style={[styles.container, {width: width}]}>
            <BackButton/>
            <View style={styles.titleContainer}>
                <Text style={[styles.title]}>Register</Text>
            </View>

            <Text  style={{fontSize: 16, fontWeight: '600'}}>Please fill out all boxes</Text>

            <TextInput
                style={[styles.input]}
                placeholderTextColor="#777"
                placeholder="Enter your first name"
                autoCapitalize="none"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={[styles.input]}
                placeholderTextColor="#777"
                placeholder="Enter your last name (optional)"
                autoCapitalize="none"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={[styles.input]}
                placeholderTextColor="#777"
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={emailInput}
                onChangeText={setEmailInput}
            />
            <TextInput
                style={[styles.input]}
                placeholderTextColor="#777"
                placeholder="Enter your password"
                secureTextEntry={true}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={[styles.input]}
                placeholderTextColor="#777"
                placeholder="Re-enter your password"
                secureTextEntry={true}
                autoCapitalize="none"
                value={confirmedPassword}
                onChangeText={setConfirmedPassword}
            />
            

            <SubmitButton onPress={handleSubmit}/>
            {loading ? <Text>Loading...</Text> : <View></View>}
        </SafeAreaView >
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        margin: 'auto',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        padding: 10
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


