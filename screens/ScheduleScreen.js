/*Schedule page will show the weekly schedule of the user.
It will display the courses in a calendar format with time slots.
Users can click on each course to view more details about it or add times to their selected courses.*/

import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function ScheduleScreen() {

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View style={styles.scheduleHeader}>
                    <View>
                        <Text style={styles.days}>Day 1</Text>
                        {/* Scroll View will be implemented here */}
                    </View>
                    <View>
                        <Text style={styles.days}>Day 2</Text>
                        {/* Scroll View will be implemented here */}
                    </View>
                </View>
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