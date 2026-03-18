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
import { useThemeText, useThemeBackground, useThemeStore } from "../contexts/ThemeContext";
import { useWindowDimensions } from "react-native";
import PopUp from '../components/Header/PopUp';

import { getSectionsOnDayOfWeek } from '../services/sectionService';


export default function ScheduleScreen() {
    const [schedule, setSchedule] = useState(null);
 

    const [selected, setSelected] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedWeekDay, setSelectedWeekDay] = useState('');

    const getWeekDays = (day) => {
        const date = new Date(day)
        const days = ['M', 'T', 'W', 'R', 'F', 'S', 'Y'];
        const dayIndex = date.getDay();
        const weekDay = days[dayIndex];
        return weekDay;
    }

    useEffect(() => {
        getSectionsOnDayOfWeek(getWeekDays(selectedDay)).then((apiResult) => {
            alert("API call was good");

            if (apiResult.success){
                setSchedule(apiResult.data);
            }else{
                alert("API call was unsuccessful");
                setSchedule([]);
            }
        });

    }, []);
    
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
                        //if selected day is different from current date string, erase everything and set it again
                        setIsVisible(true);
                        setSelected(day.dateString);
                        setSelectedDay(day.dateString);
                        setSelectedWeekDay();
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
                <View style={styles.agendaView}>

                    <View style={styles.agenda}>

                      <Text>{schedule}</Text>

                    </View>

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
    },
    agendaText: {
        fontSize: '60%',
        fontWeight: 'bold',
        alignContent: 'space-around',
        borderWidth: 2,
        borderColor: 'black',
    }
})
