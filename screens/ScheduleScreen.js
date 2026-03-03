/*Schedule page will show the weekly schedule of the user.
It will display the courses in a calendar format with time slots.
Users can click on each course to view more details about it or add times to their selected courses.*/
import {useState} from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {Calendar, CalendarList} from 'react-native-calendars';
import BackButton from '../components/BackButton';

import {useThemeText, useThemeBackground, useThemeStore} from "../contexts/ThemeContext";
import {useWindowDimensions} from "react-native";

export default function ScheduleScreen() {
    const [selected, setSelected] = useState('');

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
                    <View>
                        <Text style={styles.days}>Day 1</Text>
                    </View>
                    <View>
                        <Text style={styles.days}>Day 2</Text>                     
                    </View>
                </View>

                <Calendar
                    key={isDarkMode} // to allow it to rerender every time isDarkMode changes
                    onDayPress={day => {setSelected(day.dateString);}}
                    markedDates={
                        {
                            [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: "#078d6e"}
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
