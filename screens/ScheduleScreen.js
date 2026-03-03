/*Schedule page will show the weekly schedule of the user.
It will display the courses in a calendar format with time slots.
Users can click on each course to view more details about it or add times to their selected courses.*/
import { useState } from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, CalendarList, WeekCalendar } from 'react-native-calendars';
// import { CalendarBody, CalendarContainer, CalendarHeader } from '@howljs/calendar-kit';
import BackButton from '../components/BackButton';
import completedCourse from '../data/UNBC_course_data.json';


import {useThemeText, useThemeBackground, useThemeStore} from "../contexts/ThemeContext";
import {useWindowDimensions} from "react-native";

export default function ScheduleScreen() {

    const [selected, setSelected] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [selectedId, setSelectedId] = useState();

    const sampleSchedule = [
        { 'start': '2026-03-23 09:00:00', 'duration': '00:20:00', 'note': 'Walk my dog' },
        { 'start': '2026-03-24 14:00:00', 'duration': '01:00:00', 'note': 'Doctor\'s appointment' },
        { 'start': '2026-03-25 08:00:00', 'duration': '00:30:00', 'note': 'Morning exercise' },
        { 'start': '2026-03-25 14:00:00', 'duration': '02:00:00', 'note': 'Meeting with client' }
    ]

    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const {isDarkMode} = useThemeStore();
    const {width, height} = useWindowDimensions();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{...themeBg, minHeight: height}}>

                <View style={{alignItems: 'center', justifyContent: 'center', ...themeBg, width: width}}>
                        <BackButton/>
                </View>

                <View style={styles.scheduleHeader}>

                </View>

                <Calendar
                    key={isDarkMode} // to allow it to rerender every time isDarkMode changes
                    onDayPress={day => {
                        setIsVisible(true);
                        setSelected(day.dateString);
                    }}
                    markedDates={
                        {
                            [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: "#078d6e" }
                        }
                    }
                    theme={{
                        calendarBackground: isDarkMode ? "#000" : "#fff",
                        textSectionTitleColor: isDarkMode ? "#fff" : "#000",
                        dayTextColor: "#777",
                        monthTextColor: "#777",
                        textDisabledColor: "#777",
                    }}
                />

                <DailyAgenda>

                </DailyAgenda>

            </SafeAreaView>
        </SafeAreaProvider>
    );

    function DailyAgenda() {
        if (isVisible) {
            return (
                <View style={styles.agenda}>
                    <Text >
                        {completedCourse.all_courses[0].id}
                        
                    </Text>
                    <Text>
                        {completedCourse.all_courses[0].title}
                    </Text>
                </View>
            )
        }
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scheduleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: '#3cceac'
    },
    days: {
        fontSize: 20,
    },
    agenda:{
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
