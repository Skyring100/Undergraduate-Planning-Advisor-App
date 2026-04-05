/*Dashboard will have 4 buttons: Degree Evaluator, Degree Planner, Courses, Schedule.
Degree Evaluator will show a pie chart of their degree progress.
On clicking each button it will navigate to respective pages.*/

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, Text, View, Dimensions, Image, Pressable } from "react-native"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CourseButton from '../components/Dashboard/RequistesButton';
import PlannerButton from '../components/Dashboard/PlannerButton';
import ScheduleButton from '../components/Dashboard/ScheduleButton';
import EvaluatorButton from '../components/Dashboard/EvaluatorButton';
import RequistesButton from '../components/Dashboard/RequistesButton';
import AllCoursesButton from '../components/Dashboard/AllCoursesButton';
import { useThemeBackground, useThemeShaded } from '../contexts/ThemeContext';
import { TouchableIcon } from '../components/BottomBar';

const backHeight = Dimensions.get('window').height - 110;
const boxHeight = backHeight*0.22;
const topHeight = backHeight*0.29;
const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen (){
    const bg2 = useThemeBackground();
    const boxColour = useThemeShaded();
    const navigation = useNavigation();

    return(
        <SafeAreaView style={[styles.background, bg2]}>
            <View style={styles.top}>
                <EvaluatorButton/>
                <View style={[styles.topBox, boxColour]}>
                    <Pressable onPress={() => navigation.navigate("CourseList")}>
                        <Image style={styles.image} source={require('../assets/navbar-icons/checklist.png')} />
                    </Pressable>
                </View>
            </View>
            
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
        background: {
            flexDirection: 'column',
            flex: 1
        },
        top:{
            height: topHeight,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
        },
        topBox:{
            height: boxHeight,
            width: boxHeight,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
        bottom: {},
        image: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'center',
        height: 100,
        width: 100,
        resizeMode: 'contain',
    }
});
