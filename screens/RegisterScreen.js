/*Register page will have sections for name, email, password, and confirm password.
Degree program and start year will be dropdowns.
On clicking register it will validate inputs and navigate to Dashboard page.*/

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, View, TextInput, Dimensions } from "react-native"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../contexts/UserContext';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';

const screenWidth = Dimensions.get('window').width;
const inputWidth = screenWidth * 0.85; // 85% of screen

export default function RegisterScreen() {

    const navigation = useNavigation();
    
    const { setUser } = useUserStore();
    const [emailInput, setEmailInput] = useState('');
    const [password, setPassword] = useState('');

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Register</Text>
                </View>

                <View style={{alignContent:'flex-start'}}>
                    <BackButton onPress={()=>{navigation.navigate('Login',{})}}/>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={emailInput}
                    onChangeText={setEmailInput}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <SubmitButton onPress={()=>{navigation.navigate('Login',{})}}/>

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


