/*Dashboard will have 4 buttons: Degree Evaluator, Degree Planner, Courses, Schedule.
Degree Evaluator will show a pie chart of their degree progress.
On clicking each button it will navigate to respective pages.*/

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from "react-native"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CourseButton from '../components/CourseButton';
import PlannerButton from '../components/PlannerButton';
import ScheduleButton from '../components/ScheduleButton';
import EvaluatorButton from '../components/EvaluatorButton';

const backHeight = Dimensions.get('window').height;
const middleHeight = backHeight*0.25;
const topHeight = backHeight*0.29;

export default function DashboardScreen (){

    const navigation = useNavigation();

    return(
        <SafeAreaProvider>
            <SafeAreaView style={{flexDirection: 'column',flex: 1}}>
                <View style={styles.backView}>
                    <CourseButton/>
                    <PlannerButton/>
                </View>
                <View style={styles.middleView}>
                    <ScheduleButton/>
                </View>
                <View style={styles.topView}>
                    <EvaluatorButton/>
                </View>
                
            </SafeAreaView >
        </SafeAreaProvider>
    )
}



const styles = StyleSheet.create({
    backView: {
        position: 'relative',
        flex: 1,
        zIndex: 0
    },
    middleView: {
        position: 'absolute',
        flex: 1,
        zIndex: 1,
        alignSelf: 'flex-end',
        marginTop: middleHeight
    },
    topView: {
        position: 'absolute',
        flex: 1, 
        zIndex: 2,
        alignItems: 'center',
        marginTop: topHeight
    },
});