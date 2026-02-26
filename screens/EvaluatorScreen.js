/*Evaluator page will show the degree evaluation details.*/



import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function ScheduleScreen() {

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View>
                  <Text>Evaluation</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({

})