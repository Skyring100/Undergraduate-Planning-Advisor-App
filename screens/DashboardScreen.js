/*Dashboard will have 4 buttons: Degree Evaluator, Degree Planner, Courses, Schedule.
Degree Evaluator will show a pie chart of their degree progress.
On clicking each button it will navigate to respective pages.*/

import { useNavigation } from '@react-navigation/native';
import { Button } from "react-native"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export function DashboardScreen (){

    const navigation = useNavigation();

    return (
        <SafeAreaProvider>
            <SafeAreaView >
                <Button title='Press to go to login' onPress={()=>{navigation.navigate('Login',{})}} />
            </SafeAreaView >
        </SafeAreaProvider>
    )
}