/*Schedule page will show the weekly schedule of the user.
It will display the courses in a calendar format with time slots.
Users can click on each course to view more details about it or add times to their selected courses.*/

import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {Calendar, CalendarList} from 'react-native-calendars';


export default function ScheduleScreen() {

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View style={styles.scheduleHeader}>
                    <View>
                        <Text style={styles.days}>Day 1</Text>
                    </View>
                    <View>
                        <Text style={styles.days}>Day 2</Text>                     
                    </View>
                </View>

                <Calendar
                    onDayPress={day => {setSelected(day.dateString);}}
                    markedDates={
                        {
                            [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: "#078d6e"}
                        }
                    }
                />

            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    scheduleHeader:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderWidth:2,
        borderColor: 'black',
        backgroundColor:'#3cceac'
    },
    days:{
        fontSize:20,
    }
})