/*Dashboard will have 4 buttons: Degree Evaluator, Degree Planner, Courses, Schedule.
Degree Evaluator will show a pie chart of their degree progress.
On clicking each button it will navigate to respective pages.*/

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from "react-native"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CourseButton from '../components/Dashboard/RequistesButton';
import PlannerButton from '../components/Dashboard/PlannerButton';
import ScheduleButton from '../components/Dashboard/ScheduleButton';
import EvaluatorButton from '../components/Dashboard/EvaluatorButton';
import RequistesButton from '../components/Dashboard/RequistesButton';
import AllCoursesButton from '../components/Dashboard/AllCoursesButton';

const backHeight = Dimensions.get('window').height - 110;
const middleHeight = backHeight*0.22;
const topHeight = backHeight*0.29;
const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen (){

    const navigation = useNavigation();

    return(
        <View style={{flexDirection: 'column',flex: 1}}>
            <View style={styles.backView}>
                <RequistesButton/>
                <PlannerButton/>
            </View>
            <View style={styles.middleView}>
                <AllCoursesButton/>
                <ScheduleButton/>
            </View>
            <View style={styles.topView}>
                <EvaluatorButton/>
            </View>
            
        </View >
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
        marginTop: middleHeight,
        paddingLeft: screenWidth * 0.30,
    },
    topView: {
        position: 'absolute',
        flex: 1, 
        zIndex: 2,
        alignItems: 'center',
        marginTop: topHeight
    },
});
