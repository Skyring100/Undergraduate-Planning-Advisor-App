/*Register page will have sections for name, email, password, and confirm password.
Degree program and start year will be dropdowns.
On clicking register it will validate inputs and navigate to Dashboard page.*/

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function RegisterScreen() {

    const navigation = useNavigation();

    return(
        <SafeAreaProvider>
            <SafeAreaView style={{flexDirection: 'column', padding: 10, flex: 1}}>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Login',{})}}>
                    <Text style={styles.buttonText}>
                        Go back to Login page (Submit button)
                    </Text>
                </TouchableOpacity>
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


