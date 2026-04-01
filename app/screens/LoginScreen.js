/*Login page will have a section for email and password.
It will have two buttons one for login and one for signup. 
On clicking signup it will navigate to Register page.
On clicking login it will validate credentials and navigate to Dashboard page.*/

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, StyleSheet, Dimensions, View, useWindowDimensions } from 'react-native';
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

        const result = await loginUser(emailInput, password);
        if(result.success){
            alert("Success");

            /*
            setUser(user => ({
                ...user,
                email: emailInput,
            }));
            */

            navigation.navigate('Dashboard',{})            
        }else{
            alert(result.message)
        }
        
    }




    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, {width: width}]}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title]}>Login</Text>
                </View>
                <TextInput
                    style={[styles.input]}
                    placeholderTextColor="#777"
                    placeholder="Enter your email"
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
                    value={password}
                    onChangeText={setPassword}
                />

                <LoginButton handlePress={handleLogin} />

                <RegisterButton />
                
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
        padding: 80
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
