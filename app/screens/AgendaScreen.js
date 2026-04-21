import { useState, useCallback, useRef, useEffect } from "react";
import { View, StyleSheet, Text, useWindowDimensions, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {
    CalendarProvider,
    WeekCalendar,
    TimelineList,
    CalendarUtils,
} from 'react-native-calendars';
import AddSectionButton from "../components/Schedule/AddSectionButton";
import { useThemeText, useThemeBackground, useThemeShaded, borderColour, useFirstColour, useFourthColour} from "../contexts/ThemeContext";
import { useSchedule } from "../contexts/ScheduleContext";

const days = ['Y', 'M', 'T', 'W', 'R', 'F', 'S'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function toTimelineDateTime(dateString, timeString){
    return `${dateString} ${timeString}`;
}

function sectionToEvent(sections, dateString, borderColor){
    return sections.map((sections) => ({
        id: sections.crn.toString(),
        start: toTimelineDateTime(dateString, sections.start_time),
        end: toTimelineDateTime(dateString, sections.end_time),
        title: sections.course_id,
        summary: sections.course_name,
        course_id: sections.course_id,
        course_name: sections.course_name,
        building: sections.building,
        room: sections.room_number,
        color: 'transparent',
        borderColor:borderColor,
    }))
}

const initialTime = {hour: 8, minute: 0};

export default function AgendaScreen(){
    const themeTxt = useThemeText();
    const themeBg = useThemeBackground();
    const firstColour = useFirstColour();
    const extraColour = useFourthColour();
    const grey = useThemeShaded();
    const {width, height} = useWindowDimensions();
    const {fetchByDay, refreshToken} = useSchedule();

    const today = CalendarUtils.getCalendarDateString(new Date());
    const [currentDate, setCurrentDate] = useState(today);
    const [eventsByDate, setEventsByDate] = useState({});

    const fetchedDays = useRef(new Set());

    const loadEventsForDate = useCallback(async (dateString) => {
        console.log("loadEventsForDate called:", dateString);
        
        if (fetchedDays.current.has(dateString)) {
            console.log("skipped");
            return;
        }
        fetchedDays.current.add(dateString);

        const [year, month, dayNum] = dateString.split('-').map(Number);
        const date = new Date(year, month-1, dayNum);
        const day = days[date.getDay()];
        console.log("Date:", dateString , "getDay():", date.getDay(), "dayCode:", day);

        const sections = await fetchByDay(day);
        console.log("Sections returned:", sections.map(s => `${s.course_id} ${s.days_of_week}`));

        const events = sectionToEvent(sections, dateString, themeTxt.color);

        setEventsByDate((prev) => ({
            ...prev,
            [dateString]: events,
        }));

    }, [fetchByDay]);

    useEffect(() => {
            fetchedDays.current = new Set();
            loadEventsForDate(currentDate);
        }, []);

    useEffect(() => {
        fetchedDays.current = new Set();
        loadEventsForDate(today); 
    }, [refreshToken]);    

    const onDateChange = useCallback((date) => {
        setCurrentDate(date);
        loadEventsForDate(date);
    }, [loadEventsForDate]);

    

    function getMonth(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
        return month;
    }

    

    const timelineProps = {
        //format24h: false,
        scrollToFirst: true,
        initialTime: initialTime,
        overlapEventsSpacing: 2,
        rightEdgeSpacing: 24,
        theme: {
            backgroundColor: themeBg.backgroundColor,
            calendarBackground: themeBg.backgroundColor,
            textColor: themeTxt.color,
            eventBackground: 'transparent',
            'stylesheet.event.blockbased':{
                container:{
                    borderWidth: 2,
                    borderRadius: 20,
                }
            },
            nowIndicatorLine: {
                ...extraColour,
                height: 2,
            },
            nowIndicatorKnob:{
                ...extraColour,
                height: 8,
                width: 8,
            },
            line: {
                backgroundColor: 'transparent',
            },
            verticalLine: {
                backgroundColor: 'transparent',
            },
            timeLabel: {
                fontSize: 15,
                fontFamily: 'Montserrat'
            }
        },



        renderEvent: ( item ) => (
            <View style = {{flex:1, flexDirection: 'row'}}>
                <View style={[styles.card, themeBg]}>
                    <View style={styles.cardAccent}/>
                        <View style={styles.cardContent}>
                            <Text style={[styles.cardCourseId, themeTxt]}>{item.course_id}</Text>
                            <Text style={[styles.cardCourseName, themeTxt]}>{item.course_name}</Text>
                            <View style={styles.cardInfo}>
                                <Image style={[styles.image, {tintColor: themeTxt.color}]} source={require('../assets/clock.png')} />
                                <Text style={[styles.cardDetail, themeTxt]}>{item.start_time} - {item.end_time}</Text>
                                <Image style={[styles.image, {tintColor: themeTxt.color}]} source={require('../assets/location.png')} />
                                <Text style={[styles.cardDetail, themeTxt]}>{item.building} {item.room_number}</Text>
                            </View>
                        </View>
                </View>
            </View>
                        )
        
    };

    return(
        <SafeAreaProvider>
            <SafeAreaView style={[themeBg, {minHeight: height, width}]}>
                <View style={{height:20}}></View>
                <CalendarProvider
                    date={currentDate}
                    onDateChanged={onDateChange}
                    showTodayButton
                    disabledOpacity={0.6}
                >
                    <View style ={[grey, styles.weekContainer]}>
                        <View style = {styles.monthHeader}>
                            <Text style = {[styles.monthText, themeTxt]}>
                                {getMonth(currentDate)}
                            </Text>
                        </View>
                        <WeekCalendar
                            firstDay={1}
                            allowShadow={false}
                            theme={{
                                calendarBackground: 'transparent',
                                textSectionTitleColor: themeTxt.color,
                                dayTextColor: themeTxt.color,
                                monthTextColor: themeTxt.color,
                                selectedDayBackgroundColor: extraColour.backgroundColor,
                                todayTextColor: extraColour.backgroundColor, 
                                textDayFontFamily: 'Montserrat',
                                textDayFontSize: 15,
                                textDayHeaderFontFamily: 'Montserrat',
                                textDayHeaderFontSize: 15,
                                textMonthFontFamily: 'Montserrat',
                                textMonthFontSize: 20,
                                
                            }}
                            />
                        <AddSectionButton/>
                    </View>
                    <TimelineList
                        key={currentDate}
                        events={eventsByDate}
                        timelineProps={timelineProps}
                        showNowIndicator
                        scrollToNow
                        initialTime={initialTime}
                    />
                </CalendarProvider>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    weekContainer:{
        borderRadius: 20,
        marginHorizontal: 8,
        marginVertical: 6,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    calendar: {
        borderRadius: 20,
    },
    monthHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 10,
        paddingBottom: 4,
    },
    monthText:{
        fontSize: 20,
        fontFamily: 'Montserrat',
        fontWeight: 'bold'
    },
    card: {
        flex:1,
        flexDirection: 'row',
        // borderRadius: 20,
        // borderWidth: 2,
        marginVertical: 4,
        marginHorizontal: 8,
        elevation: 2,
        overflow: 'hidden',
    },
    cardAccent: {
        marginLeft: 15,
        marginTop: 10,
        height: '40%',
        width: 5,
        backgroundColor: '#035642',
        borderRadius: 5,
    },
    cardContent: {
        padding: 10,
        flex: 1,
    },
    cardCourseId: {
        fontWeight: 'bold',
        fontSize: 14,
        //color: '#035642',
    },
    cardCourseName: {
        fontSize: 13,
        color: '#fff3f3',
        marginBottom: 4,
    },
    cardInfo: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 8,
    },
    cardDetail: {
        fontSize: 12,
        color: '#666',
    },
    text: {
            fontSize: 30,
            fontFamily: 'Montserrat',
            padding: 10,
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 15,
        width: 15,
        resizeMode: 'contain',
    },
})
