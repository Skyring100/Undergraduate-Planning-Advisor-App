import { View, Text, FlatList, StyleSheet, Image, useWindowDimensions } from "react-native";
import { useFirstColour, useThemeText, useThemeBackground, useThemeGreyed} from "../../contexts/ThemeContext";
import { useSchedule } from "../../contexts/ScheduleContext";

export default function DailyAgenda() {
    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const firstBg = useFirstColour();
    const {schedule, loading} = useSchedule();
    const {height, width} = useWindowDimensions();

    if (loading) return <Text style={[styles.text, themeText]}>Loading...</Text>;
    if(!schedule.length) return <Text style={[styles.text, themeText]}>No classes today!</Text>;

    return (
        <FlatList
            data={schedule}
            keyExtractor={(item) => item.crn.toString()}
            renderItem={({ item }) => (
                <View style={[styles.card, themeBg, {width: width*0.8}]}>
                    <View style={[styles.cardAccent, firstBg]}/>
                        <View style={styles.cardContent}>
                            <Text style={[styles.cardCourseId, themeText]}>{item.course_id}</Text>
                            <Text style={[styles.cardCourseName, themeText]}>{item.course_name}</Text>
                            <View style={styles.cardInfo}>
                                <Image style={[styles.image, {tintColor: themeText.color}]} source={require('../../assets/clock.png')} />
                                <Text style={[styles.cardDetail, themeText]}>{item.start_time} - {item.end_time}</Text>
                                <Image style={[styles.image, {tintColor: themeText.color}]} source={require('../../assets/location.png')} />
                                <Text style={[styles.cardDetail, themeText]}>{item.building} {item.room_number}</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
    );
}

const styles = StyleSheet.create({
    // Card (dashboard)
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
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
});
