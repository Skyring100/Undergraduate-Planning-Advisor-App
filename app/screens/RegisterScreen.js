/*Register page will have sections for name, email, password, and confirm password.
Degree program and start year will be dropdowns.
On clicking register it will validate inputs and navigate to Dashboard page.*/

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, View, TextInput, Dimensions, ScrollView } from "react-native"
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
            navigation.navigate('Dashboard');
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
        <SafeAreaView style={[styles.screen]}>

            <View style={styles.card}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backWrap}>
                    <Text style={styles.backText}>◀ Back to login</Text>
                </TouchableOpacity>
                    
                <Text style={styles.title}>Sign Up</Text>

                <ScrollView showsVerticalScrollIndicator={false}>

                    <TextInput
                        autoFocus
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

                    <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Submit'}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView >
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#1B4D3E',
        justifyContent: 'flex-end',
    },
    card: {
        backgroundColor: '#EFEFEF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 28,
        paddingTop: 28,
        paddingBottom: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#111'
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 15,
        marginBottom: 12,
        color: '#333',
    },
    button: {
        height: 52,
        backgroundColor: '#1B4D3E',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },
    
    backWrap: {
        marginBottom: 10
    },
    backText: {
        color: '#1B4D3E',
        fontSize: 14,
        fontWeight: '500'
    },
});


