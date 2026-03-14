/*Schedule page will show the weekly schedule of the user.
It will display the courses in a calendar format with time slots.
Users can click on each course to view more details about it or add times to their selected courses.*/
import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, CalendarList, WeekCalendar } from 'react-native-calendars';
// import { CalendarBody, CalendarContainer, CalendarHeader } from '@howljs/calendar-kit';
import BackButton from '../components/BackButton';
import completedCourse from '../data/UNBC_course_data.json';
import { useThemeText, useThemeBackground, useThemeStore } from "../contexts/ThemeContext";
import { useWindowDimensions } from "react-native";
import PopUp from '../components/Dashboard/PopUp';



export default function ScheduleScreen() {
    
    // const classMap =  sampleSchedule.map(c => (<TouchableOpacity  key={c.id} onPress={classe(c.id)} ><Text style={{ ...themeText }}>{c.note}</Text></TouchableOpacity>))

    const classe = (id) => {
       for(let i = 0; i< sampleSchedule.length; i++){
            if (id === sampleSchedule[i].id){
                return(
                    alert(sampleSchedule[i].detail)
                    // <PopUp><Text>{sampleSchedule[i].detail}</Text></PopUp>
                )
            }
       }
    }

    const [selected, setSelected] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    // const [selectedClass, setSelectedClass] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

    const sampleSchedule = [
        { 'id': '1', 'start': '2026-03-05', 'time': '01:00', 'duration': '00:20:00', 'note': 'CPSC 100', 'detail': 'First CPSC' },
        { 'id': '2', 'start': '2026-03-05', 'time': '10:30', 'duration': '01:00:00', 'note': 'Math 100', 'detail': 'First Math' },
        { 'id': '3', 'start': '2026-03-05', 'time': '2:40', 'duration': '00:30:00', 'note': 'Anth 100', 'detail': 'First Anth' },
        { 'id': '4', 'start': '2026-03-08', 'time': '3:20', 'duration': '02:00:00', 'note': 'Pysch 100', 'detail': 'First Pysch' }
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
                        //if selected day is different from current date string, erase everything and set it again
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

        if (isVisible) {
            return (
                <View style={styles.agendaView}>

                    <View style={styles.agenda}>

                        {
                            sampleSchedule.map(c => (<TouchableOpacity onPress={() => classe(c.id)}  key={c.id}><Text  style={{ ...themeText }}>{c.note}</Text></TouchableOpacity>))
                        }

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
