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
import { useThemeBackground, useThemeShaded, useThemeText } from '../contexts/ThemeContext';
import { TouchableIcon } from '../components/BottomBar';
import DailyAgenda from '../components/Schedule/DailyAgenda';
import { useSchedule } from '../contexts/ScheduleContext';

const screenHeight = Dimensions.get('window').height - 110;
const topBoxH = screenHeight*0.22;
const topHeight = screenHeight*0.29;
const bottomBH = screenHeight*0.40;
const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen (){
    const bg2 = useThemeBackground();
    const boxColour = useThemeShaded();
    const textColour = useThemeText();
    const navigation = useNavigation();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const dayName = days[today.getDay()];

    function TodaySchedule() {
        const { schedule, loading } = useSchedule();
        if(loading) return <Text style={[styles.text, textColour]}>Loading...</Text>;
        return <DailyAgenda variant = "card" schedule={schedule}/>;
    }

    return(
        <SafeAreaView style={[styles.background, bg2]}>
            <View style={styles.top}>
                <EvaluatorButton/>
                <View style={[styles.topBox, boxColour]}>
                    <Pressable onPress={() => navigation.navigate("CourseList")}>
                        <Image style={[styles.topImage, {tintColor: textColour.color}]} source={require('../assets/courseList.png')} />
                    </Pressable>
                </View>
            </View>
            <View style={[styles.bottomBox, boxColour]}>
                <Pressable onPress={() => navigation.navigate("CourseList") } style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={[styles.bottomImage, {tintColor: '#035642'}]} source={require('../assets/navbar-icons/calendar.png')} />
                    <Text style={[styles.text, textColour]}>Today - {dayName}</Text>
                </Pressable>
                <TodaySchedule/>                
            </View>
        </SafeAreaView>
    )
}




export const styles = StyleSheet.create({
        background: {
            flexDirection: 'column',
            flex: 1
        },
        top:{
            height: topHeight,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            marginTop: -30,
        },
        topBox:{
            height: topBoxH,
            width: topBoxH,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
        bottomBox: {
            height: 'auto',
            width: screenWidth*0.9,
            borderRadius: 20,
            alignItems: 'flex-start',
            justifyContent: 'center',
            alignSelf: 'center',
            padding: 10,
        },
        topImage: {
            justifyContent: 'center',
            alignItems: 'center',
            resizeMode: 'center',
            height: 200,
            width: 100,
            resizeMode: 'contain',
        },
        bottomImage: {
            justifyContent: 'center',
            alignItems: 'center',
            resizeMode: 'center',
            height: 30,
            width: 30,
            resizeMode: 'contain',
        },
        text: {
            fontSize: 25,
            fontWeight: 'bold',
            fontFamily: 'Montserrat',
            paddingLeft: 10,
        }
});
