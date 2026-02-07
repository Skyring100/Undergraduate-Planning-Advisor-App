/*Dashboard will have 4 buttons: Degree Evaluator, Degree Planner, Courses, Schedule.
Degree Evaluator will show a pie chart of their degree progress.
On clicking each button it will navigate to respective pages.*/

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from "react-native"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const backWidth = Dimensions.get('window').width;
const middleWidth = backWidth * 0.70; // 85% of screen
const topWidth = backWidth * 0.60; // 85% of screen

const backHeight = Dimensions.get('window').height;
const middleHeight = backHeight*0.33;
const topHeight = backHeight*0.25;

export default function DashboardScreen (){

    const navigation = useNavigation();

    return(
        <SafeAreaProvider>
            <SafeAreaView style={{flexDirection: 'column',flex: 1}}>
                <View style={{position: 'relative', flex: 1, zIndex: 0}}>
                    <TouchableOpacity style={styles.buttonBack} onPress={()=>{navigation.navigate('Courses',{})}}>
                        <Text style={styles.buttonText}>
                            Courses
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonBack} onPress={()=>{navigation.navigate('Planner',{})}}>
                        <Text style={styles.buttonText}>
                            Planner
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', flex: 1, zIndex: 1, alignSelf: 'flex-end', marginTop: middleHeight}}>
                    <TouchableOpacity style={styles.buttonMiddle} onPress={()=>{navigation.navigate('Schedule',{})}}>
                        <Text style={styles.buttonText}>
                            Schedule
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', flex: 1, zIndex: 2}}>
                    <TouchableOpacity style={styles.buttonTop} onPress={()=>{navigation.navigate('Evaluator',{})}}>
                        <Text style={styles.buttonText}>
                            Evaluator
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </SafeAreaView >
        </SafeAreaProvider>
    )
}



const styles = StyleSheet.create({
    buttonBack: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#035642',
        padding: 10,
        width: backWidth,
        height: backHeight*0.45,
    },
    buttonMiddle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#026d54',
        padding: 10,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        width: middleWidth,
        height: middleHeight*0.75,
    },
    buttonTop: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#078d6e',
        padding: 10,
        borderRadius: 20,
        width: 'auto',
        height: 'auto',
    },
    buttonText: {
        fontSize: 30,
        color: '#fff',
    },
});