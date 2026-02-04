/*Dashboard will have 4 buttons: Degree Evaluator, Degree Planner, Courses, Schedule.
Degree Evaluator will show a pie chart of their degree progress.
On clicking each button it will navigate to respective pages.*/

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, Text } from "react-native"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export function DashboardScreen (){

    const navigation = useNavigation();

    return(
        <SafeAreaProvider>
            <SafeAreaView style={{flexDirection: 'column', padding: 10,flex: 1}}>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Login',{})}}>
                    <Text style={styles.buttonText}>
                        Press to go to the Login page
                    </Text>
                </TouchableOpacity>
            </SafeAreaView >
        </SafeAreaProvider>
    )
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