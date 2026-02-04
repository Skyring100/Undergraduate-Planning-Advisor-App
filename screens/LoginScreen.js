/*Login page will have a section for email and password.
It will have two buttons one for login and one for signup. 
On clicking signup it will navigate to Register page.
On clicking login it will validate credentials and navigate to Dashboard page.*/

import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, StyleSheet, TouchableOpacity, StatusBar, } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



export function LoginScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flexDirection: 'column', padding: 10, flex: 1}}>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Dashboard',{})}}>
                    <Text style={styles.buttonText}>Press Here to go to Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Register',{})}}>
                    <Text style={styles.buttonText}>Press here to go to the Register page</Text>
                </TouchableOpacity>
            </SafeAreaView >
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0088ff',
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