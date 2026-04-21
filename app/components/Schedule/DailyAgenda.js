import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { useThemeText, useThemeBackground, useThemeGreyed, useFirstColour} from "../../contexts/ThemeContext";

export default function DailyAgenda({variant = 'card', schedule = []}) {
    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const firstBg = useFirstColour();
    const borderColour = useThemeGreyed();

    if(!schedule.length) return <Text style={[styles.text, themeText]}>No classes today!</Text>;

    return variant === 'timeline' 
        ?<TimelineView schedule = {schedule}/>
        : <CardView schedule = {schedule}/>;

    function TimelineView({schedule}) {
        const hours = Array.from({length: 24}, (_, i) => `${(i).toString().padStart(2, '0')}:00`); // Hours from 8 AM to 5 PM
        
        const getClassesAtHour = (hour) => {
            return schedule.filter(item => item.start_time.startsWith(hour.split(':')[0]));
        };

        return (
            <FlatList
                data={hours}
                keyExtractor={(item) => item}
                renderItem={({ item: hour }) => {
                    const classes = getClassesAtHour(hour);
                    return (
                        <View style = {[styles.tlRow, themeBg]}>
                            <Text style={[styles.hourText, themeText]}>{hour}</Text>
                            <View style={styles.timeLine} />
                            <View style={styles.tlContainer}>
                                {classes.map(cls => (
                                    <View key={cls.crn} style={[styles.tlClass, themeBg, {borderColor: themeText.color}]}>
                                        <View style={[styles.tlAccent, firstBg]} />
                                        <View style={styles.tlContent}>
                                            <Text style={[styles.cardCourseId, themeText]}>{cls.course_id}</Text>
                                            <Text style={[styles.cardCourseName, themeText]}>{cls.course_name}</Text>
                                            <View style={styles.cardInfo}>
                                                <Image style={[styles.image, {tintColor: themeText.color}]} source={require('../../assets/clock.png')} />
                                                <Text style={[styles.cardDetail, themeText]}>{cls.start_time} - {cls.end_time}</Text>
                                                <Image style={[styles.image, {tintColor: themeText.color}]} source={require('../../assets/location.png')} />
                                                <Text style={[styles.cardDetail, themeText]}>{cls.building} {cls.room_number}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    );
                }}
                ListFooterComponent={() => <View style={{height: 520}} />} // Add some padding at the end of the list
            
            />
        );
    };
    
    function CardView({schedule}) {
        const themeText = useThemeText();

        return (
            <FlatList
                data={schedule}
                keyExtractor={(item) => item.crn.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.card, themeBg]}>
                        <View style={[styles.cardAccent, firstBg]}/>
                            <View style={styles.cardContent}>
                                <Text style={[styles.cardCourseId, themeText]}>{item.course_id}</Text>
                                <Text style={[styles.cardCourseName, themeText]}>{item.course_name}</Text>
                                <View style={styles.cardInfo}>
                                    <Image style={styles.image} source={require('../../assets/clock.png')} />
                                    <Text style={[styles.cardDetail, themeText]}>{item.start_time} - {item.end_time}</Text>
                                    <Image style={styles.image} source={require('../../assets/location.png')} />
                                    <Text style={[styles.cardDetail, themeText]}>{item.building} {item.room_number}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
        );
    };
}

const styles = StyleSheet.create({
    // Card (dashboard)
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 4,
        marginHorizontal: 8,
        elevation: 2,
        overflow: 'hidden',
    },
    cardAccent: {
        margin: 8,
        height: '40%',
        width: 4,
        backgroundColor: '#035642',
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

    // Timeline (schedule screen)
    tlRow: {
        flexDirection: 'row',
        minHeight: 60,
        alignItems: 'flex-start',
    },
    hourText: {
        width: 45,
        fontSize: 12,
        color: '#666',
        paddingTop: 4,
        textAlign: 'right',
        paddingRight: 8,
    },
    timeLine: {
        width: 1,
        backgroundColor: '#ddd',
        alignSelf: 'stretch',
    },
    tlContainer: {
        flex: 1,
        paddingLeft: 8,
    },
    tlClass: {
        flexDirection: 'row',
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 4,
        marginRight: 8,
        elevation: 2,
        overflow: 'hidden',
    },
    tlAccent: {
        margin: 8,
        height: '50%',
        width: 4,
        backgroundColor: '#035642',
        borderRadius: 2,
    },
    tlContent: {
        paddingTop: 10,
        flex: 1,
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
