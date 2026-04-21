/*Login page will have a section for email and password.
It will have two buttons one for login and one for signup. 
On clicking signup it will navigate to Register page.
On clicking login it will validate credentials and navigate to Dashboard page.*/

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, StyleSheet, Dimensions, View, useWindowDimensions, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LoginButton from '../components/LoginRegister/LoginButton';
import RegisterButton from '../components/LoginRegister/RegisterButton';
import { useUserStore } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from '../services/authService';


const screenWidth = Dimensions.get('window').width;
const inputWidth = screenWidth * 0.85; // 85% of screen



export default function LoginScreen() {

    const navigation = useNavigation();
    
    const {width} = useWindowDimensions();

    const { setUser } = useUserStore();
    const { login } = useAuth();
    const [emailInput, setEmailInput] = useState('test@test.com');
    const [password, setPassword] = useState('test123');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {

        if (!emailInput || !password) {
            alert('Error', 'Please fill in all fields');
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            alert('Error', 'Please enter a valid email address');
            return;
        }

        setLoading(true);
        const result = await loginUser(emailInput, password);
        setLoading(false);

        result.success ? navigation.navigate('Dashboard',{}) : alert(result.message);
    }




    return (
        <SafeAreaProvider>
        <SafeAreaView style={[styles.screen]}>
            <Image source={require('../assets/white-main-logo.png')} style={styles.logoImage} />

            <View style={{marginBottom: 24, marginLeft: 28}}>
                <Text style={{color: '#fff', fontSize: 34, fontWeight: 'bold', marginTop: 8,}}>Hello!</Text>
                <Text style={{color: '#cde8d8', fontSize: 20,}}>Welcome Student</Text>
            </View>
            

            <View style={[styles.card]}>
                <Text style={styles.title}>Login</Text>
            
                <TextInput
                    style={[styles.input]}
                    placeholderTextColor="#777"
                    placeholder="Eemail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={emailInput}
                    onChangeText={setEmailInput}
                />
                <TextInput
                    style={[styles.input]}
                    placeholderTextColor="#777"
                    placeholder="Password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
                    <Text style={styles.registerButtonText}> Don't have an account? <Text style={styles.registerButtonTextBold}>Sign Up</Text></Text>
                </TouchableOpacity>
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
        paddingBottom: 110,
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
    registerButton: {
        alignItems: 'center'
    },
    registerButtonText: { 
        color: '#555',
        fontSize: 14
    },
    registerButtonTextBold: {
        fontWeight: 'bold',
        color: '#1B4D3E'
    },
    logoImage: {
        resizeMode: 'contain',
        width: 230,
        height: 150,
        marginBottom: 10
    },
});
