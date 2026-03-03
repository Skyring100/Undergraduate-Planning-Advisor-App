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

    return (
        <SafeAreaProvider>
            <SafeAreaView>

                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                    <BackButton />
                </View>

                <View style={styles.scheduleHeader}>

                </View>

                <Calendar
                    onDayPress={day => {
                        setSelected(day.dateString);
                        setIsVisible(true);
                    }}
                    markedDates={
                        {
                            [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: "#078d6e" }
                        }
                    }
                />

                <DailyAgenda>

                </DailyAgenda>

            </SafeAreaView>
        </SafeAreaProvider>
    );

    function DailyAgenda() {
        if (isVisible) {
            return (
                // <FlatList
                //     data={completedCourse}
                //     renderItem={sampleSchedule}
                //     keyExtractor={item => item.id}
                //     extraData={selectedId}
                // />
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