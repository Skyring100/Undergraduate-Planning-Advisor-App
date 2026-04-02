import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import { useThemeText, useThemeBackground, useThemeStore, useFirstColour } from "../contexts/ThemeContext";
import TimeInput from '@tighten/react-native-time-input';
import { Picker } from '@react-native-picker/picker';
import { useWindowDimensions } from "react-native";
import { Button } from 'react-native';

import { addSections } from '../services/sectionService';



export default function AddSectionScreen() {
    const [sectionName, setSectionName] = useState('');
    const [sectionDays, setSectionDays] = useState('');
    const [sectionDuration, setSectionDuration] = useState('');
    const [sectionStartTime, setSectionStartTime] = useState('');
    const [sectionEndTime, setSectionEndTime] = useState('');
    const [sectionProfessor, setSectionProfessor] = useState('');
    const [sectionRoom, setSectionRoom] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sectionBuilding, setSectionBuilding] = useState('');
    const [sectionID, setSectionID] = useState('');


    const themeBg = useThemeBackground();
    const firstColour = useFirstColour();
    const { width, height } = useWindowDimensions();

    const [showPicker, setShowPicker] = useState(false);
    const themeTxt = useThemeText();

    function SubmitInfo() {
        if (sectionName == '' || sectionDays == '' || sectionID == '') {
            alert("Empty information, try again.")
        } else {
            console.log(sectionName);
            // c_id, dow, start_time, end_time, start_date, end_date, building, room_n, instructor
            addSections(sectionID, sectionDays, sectionStartTime, sectionEndTime, startDate, endDate, sectionBuilding, sectionRoom, sectionProfessor);
            alert("Info saved!");
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ ...themeBg, minHeight: height }}>
                <View style={{ flex: 1 }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', ...themeBg }}>
                        < BackButton />
                    </View>

                    <ScrollView style={themeTxt}>

                        <Text style={themeTxt}>Select Days:</Text>
                        <Picker
                            style={themeTxt}
                            selectedValue={sectionDays}
                            onValueChange={(itemValue, itemIndex) =>
                                setSectionDays(itemValue)
                            }>
                            <Picker.Item label='Monday' value='M' />
                            <Picker.Item label='Tuesday' value='T' />
                            <Picker.Item label='Wednesday' value='W' />
                            <Picker.Item label='Thursday' value='R' />
                            <Picker.Item label='Friday' value='F' />
                            <Picker.Item label='Saturday' value='S' />
                            <Picker.Item label='Monday|Wednesday|Friday' value='MWF' />
                            <Picker.Item label='Tuesday|Thursday' value='TR' />
                            <Picker.Item label='Monday|Wednesday' value='MW' />
                            <Picker.Item label='Wednesday|Friday' value='WF' />
                        </Picker>

                        <TextInput
                            style={[styles.input, themeTxt]}
                            onChangeText={setSectionName}
                            value={sectionName}
                            placeholder='Section Name*'
                        >
                        </TextInput>

                        <TextInput
                            style={[styles.input, themeTxt]}
                            onChangeText={setSectionID}
                            value={sectionID}
                            placeholder='Course ID*'
                        >
                        </TextInput>

                        <View>
                            <Text style={themeTxt}>Start and End time*:</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={[styles.inputDates, themeTxt]}
                                    onChangeText={setSectionStartTime}
                                    value={sectionStartTime}
                                    placeholder='Section Start Time*'
                                >
                                </TextInput>

                                <TextInput
                                    style={[styles.inputDates, themeTxt]}
                                    onChangeText={setSectionEndTime}
                                    value={sectionEndTime}
                                    placeholder='Section End Time*'
                                >
                                </TextInput>
                            </View>
                        </View>

                        <View>
                            <Text style={themeTxt}>Start and End Date*:</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={[styles.inputDates, themeTxt]}
                                    onChangeText={setStartDate}
                                    value={startDate}
                                    placeholder='First day*'
                                >
                                </TextInput>

                                <TextInput
                                    style={[styles.inputDates, themeTxt]}
                                    onChangeText={setEndDate}
                                    value={endDate}
                                    placeholder='Last day*'
                                >
                                </TextInput>
                            </View>
                        </View>

                        <TextInput
                            style={[styles.input, themeTxt]}
                            onChangeText={setSectionProfessor}
                            value={sectionProfessor}
                            placeholder='Instructor'
                        >
                        </TextInput>


                        <TextInput
                            style={[styles.input, themeTxt]}
                            onChangeText={setSectionRoom}
                            value={sectionRoom}
                            placeholder='Section Room'
                        >
                        </TextInput>

                        <TextInput
                            style={[styles.input, themeTxt]}
                            onChangeText={setSectionBuilding}
                            value={sectionBuilding}
                            placeholder='Building'
                        >
                        </TextInput>

                        <View style={[styles.submit]}>
                            <Button
                                onPress={SubmitInfo}
                                title="Submit"
                            ></Button>
                        </View>
                    </ScrollView>


                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    input: {
        height: '7.5%',
        margin: 5,
        borderWidth: 1,
        padding: 8,

    },
    inputDates: {
        height: '100%',
        width: '40%',
        borderWidth: 1,
        margin: 5,
    },
    inputView: {
        flexDirection: 'row',
        margin: 5
    },
    submit: {
        // flex: 1,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: '5%',
        marginLeft: '14%'
        // alignContent: 'center'
    }
});