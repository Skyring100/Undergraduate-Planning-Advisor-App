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
import { useThemeText, useThemeBackground, useThemeStore, useFirstColour, borderColour } from "../contexts/ThemeContext";
import { useWindowDimensions } from "react-native";
import PopUp from '../components/Header/PopUp';

import { getSectionsOnDayOfWeek } from '../services/sectionService';
import AddSectionButton from '../components/Schedule/AddSectionButton';
// import jsonData from 'data.json';


export default function ScheduleScreen() {
    const [schedule, setSchedule] = useState([]);
    const [selected, setSelected] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    let classes = [];

   


    const getWeekDays = (day) => {
        const date = new Date(day)
        const days = ['M', 'T', 'W', 'R', 'F', 'S', 'Y'];
        const dayIndex = date.getDay();
        const weekDay = days[dayIndex];
        return weekDay;
    }

    async function getDayOfWeek(selectedWeekD) {
        if (selectedWeekD === "Y") {
            setSchedule("")
        } else {

            try {
                await getSectionsOnDayOfWeek(selectedWeekD).then((classData) => {

                    if (classData != null) {

                        for (const row of classData.data) {
                            console.log("CLASSES ", row)
                            if (row.days_of_week.includes(selectedWeekD)) {
                                classes.push(row);
                            }
                        }

                        setSchedule(classes);

                    } else {
                        alert("API call was unsuccessful");
                    }

                })

            } catch (e) {
                
            }
        }
    }

    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const { isDarkMode } = useThemeStore();
    const { width, height } = useWindowDimensions();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ ...themeBg, minHeight: height }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...themeBg, width: 500 }}>
                    <BackButton />
                    <AddSectionButton />
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

            </SafeAreaView>
        </SafeAreaProvider>
    );

    function DailyAgenda() {

        if (isVisible) {
            return (


                <View style={styles.agendaView}>
                    <FlatList
                        data={schedule}
                        keyExtractor={(item) => item.crn.toString()}
                        renderItem={({ item }) => (
                            <View style={[{ padding: 10 }, styles.agenda, themeBg]}>
                                <Text style={[styles.agendaText, themeText]}>{item.course_id}</Text>
                                <Text style={[styles.agendaText, themeText]}>{item.start_time}</Text>
                                <Text style={[styles.agendaText, themeText]}>{item.end_time}</Text>
                            </View>
                        )}
                    />

                </View >
            )
        }
    }


}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
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
        fontWeight: 'bold',
        fontSize: 15,
    }
})
