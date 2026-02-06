/*Login page will have a section for email and password.
It will have two buttons one for login and one for signup. 
On clicking signup it will navigate to Register page.
On clicking login it will validate credentials and navigate to Dashboard page.*/

import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, StyleSheet, TouchableOpacity, } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LoginButton from '../components/LoginButton';
import RegisterButton from '../components/RegisterButton';



export function LoginScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flexDirection: 'column', padding: 10, flex: 1}}>
                <LoginButton onPress={()=>{navigation.navigate('Dashboard',{})}}/>
                <RegisterButton onPress={()=>{navigation.navigate('Register',{})}}/>
                
            </SafeAreaView >
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#035642',
        padding: 10,
        margin: 'auto',
        borderRadius: 20,
        width: 'auto',
        height: 'auto',
    },
    buttonText: {
        color: '#fff',
    },
});