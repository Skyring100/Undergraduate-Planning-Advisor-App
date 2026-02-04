/*Login page will have a section for email and password.
It will have two buttons one for login and one for signup. 
On clicking signup it will navigate to Register page.
On clicking login it will validate credentials and navigate to Dashboard page.*/

import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, StyleSheet, Alert, Button, } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



export default function LoginScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaProvider>
            <SafeAreaView >
                <Button title='press to go to Dashboard' onPress={()=>{navigation.navigate('Dashboard',{})}} />
            </SafeAreaView >
        </SafeAreaProvider>
    );
}

