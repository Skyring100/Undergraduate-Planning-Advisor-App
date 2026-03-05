/*Schedule page will show the weekly schedule of the user.
It will display the courses in a calendar format with time slots.
Users can click on each course to view more details about it or add times to their selected courses.*/
import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, CalendarList, WeekCalendar } from 'react-native-calendars';
// import { CalendarBody, CalendarContainer, CalendarHeader } from '@howljs/calendar-kit';
import BackButton from '../components/BackButton';
import completedCourse from '../data/UNBC_course_data.json';


import { useThemeText, useThemeBackground, useThemeStore } from "../contexts/ThemeContext";
import { useWindowDimensions } from "react-native";

export default function ScheduleScreen() {

    const [selected, setSelected] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

    const sampleSchedule = [
        { 'start': '2026-03-05', 'time': '01:00', 'duration': '00:20:00', 'note': 'CPSC 100' },
        { 'start': '2026-03-05', 'time': '10:30', 'duration': '01:00:00', 'note': 'Math 100' },
        { 'start': '2026-03-05', 'time': '2:40', 'duration': '00:30:00', 'note': 'Anth 100' },
        { 'start': '2026-03-08', 'time': '3:20', 'duration': '02:00:00', 'note': 'Pysch 100' }
    ]

    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const { isDarkMode } = useThemeStore();
    const { width, height } = useWindowDimensions();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ ...themeBg, minHeight: height }}>

                <View style={{ alignItems: 'center', justifyContent: 'center', ...themeBg, width: width }}>
                    <BackButton />
                </View>

                <View style={styles.scheduleHeader}>

                </View>

                <Calendar
                    key={isDarkMode} // to allow it to rerender every time isDarkMode changes
                    onDayPress={day => {
                        setIsVisible(true);
                        setSelected(day.dateString);
                        setSelectedDay(day.dateString);
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
        const classes = [];
        //Mateus: I know I'll need something better later, probably a datastructure that will allow for quick search, maybe a hashtable, but for now this helps to get the idea
        for (let i = 0; i < sampleSchedule.length; i++) {
            if (selectedDay == sampleSchedule[i].start) {
                classes.push(sampleSchedule[i].note + " " + sampleSchedule[i].time + "\n") //how do I show a list/array of things in JSX??
            }
        }

        if (isVisible) {
            return (
                <View style={styles.agendaView}>
                    <ScrollView>
                        <View style={styles.agenda}>
                            <Text style={{ ...themeText }}>
                                {selectedDay}
                                {/* {sampleSchedule.length} */}
                                {/* {completedCourse.all_courses[0].id} */}
                            </Text>
                            <Text style={{ ...themeText }}>
                                {/* {selectedDay} */}
                                {classes}
                            </Text>
                        </View>
                    </ScrollView>
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
    agendaView: {
        flex: 1,
    },
    agenda: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
