/*Schedule page will show the weekly schedule of the user.
It will display the courses in a calendar format with time slots.
Users can click on each course to view more details about it or add times to their selected courses.*/
import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, CalendarList, WeekCalendar } from 'react-native-calendars';
// import { CalendarBody, CalendarContainer, CalendarHeader } from '@howljs/calendar-kit';
import BackButton from '../components/BackButton';
import completedCourse from '../data/UNBC_course_data.json';
import { useThemeText, useThemeBackground, useThemeStore, useFirstColour } from "../contexts/ThemeContext";
import { useWindowDimensions } from "react-native";
import PopUp from '../components/Header/PopUp';

import { getSectionsOnDayOfWeek } from '../services/sectionService';


export default function ScheduleScreen() {
    const [schedule, setSchedule] = useState([]);
    const [classInfo, setClassInfo] = useState([]);
    const [selected, setSelected] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedWeekDay, setSelectedWeekDay] = useState('');
    const firstColour = useFirstColour();

    const getWeekDays = (day) => {
        const date = new Date(day)
        const days = ['M', 'T', 'W', 'R', 'F', 'S', 'Y'];
        const dayIndex = date.getDay();
        const weekDay = days[dayIndex];
        return weekDay;
    }

    // const themeText = useThemeText();

    async function getDayOfWeek(selectedWeekD) {
        // if selectedWeekDay == y OR s, set schedule to nothing, else:
        const days = [];
        try {
            await getSectionsOnDayOfWeek(selectedWeekD).then((classData) => {
                console.log(classData);

                if (classData != null) {

                    for (let i = 0; i < classData.data[0].course_id.length; i++) {
                        setSchedule(classData.data[i].course_id + " " + classData.data[i].days_of_week + " " + " " + classData.data[i].start_time + " " + classData.data[i].end_time);
                        setClassInfo(classData.data[i].start_date + " " + classData.data[i].end_date);
                    }

                } else {
                    alert("API call was unsuccessful");
                    setSchedule([]);
                }
            })

        } catch (e) {
            // alert(e);
        }
    }

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
                    onDayPress={async (day) => {
                        //if selected day is different from current date string, erase everything and set it again
                        setIsVisible(true);
                        setSelected(day.dateString);
                        setSelectedDay(day.dateString);
                        // setSelectedWeekDay(getWeekDays(day.dateString));
                        await getDayOfWeek(getWeekDays(day.dateString));
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

                <ClassInfo></ClassInfo>

            </SafeAreaView>
        </SafeAreaProvider>
    );

    function ClassInfo() {
        // alert(classInfo)
        if (isInfoVisible) {
            // alert(classInfo)
            return (

                <View>
                    <Text>{classInfo}</Text>
                </View>

            )
        }
    }

    function DailyAgenda() {

        if (isVisible) {
            return (
                <View style={styles.agendaView}>
                    <TouchableOpacity onPress={() => alert(classInfo)}>
                        <View style={[styles.agenda, { borderColor: firstColour.backgroundColor }]}>
                            <Text style={[themeText, styles.agendaText]}>{selectedWeekDay}</Text>
                            <Text style={[themeText, styles.agendaText]}>{schedule}</Text>
                        </View>
                    </TouchableOpacity>

                </View >
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
        paddingTop: 10,
    },
    agenda: {
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 5,
    },
    agendaText: {
        // fontSize: '60%',
        fontWeight: 'bold',
        // justifyContent: 'space-around',
        // alignItems: 'center',
        // borderWidth: 2,
        // borderColor: 'black',
        fontSize: 20,
    }
})
