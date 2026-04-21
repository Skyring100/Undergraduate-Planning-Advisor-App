import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import { useThemeText, useThemeShaded, useThemeBackground, useThemeStore, useFirstColour } from "../contexts/ThemeContext";
import TimeInput from '@tighten/react-native-time-input';
import { Picker } from '@react-native-picker/picker';
import { useWindowDimensions } from "react-native";
import { Button } from 'react-native';


import { addSections } from '../services/sectionService';
import { useSchedule } from '../contexts/ScheduleContext';




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
    const themeShaded = useThemeShaded();
    const themeText = useThemeText();
    console.log("theme text: " + JSON.stringify(themeText));
    const firstColour = useFirstColour();
    const { width, height } = useWindowDimensions();

    const [showPicker, setShowPicker] = useState(false);

    const timeFormat = /[0-9][0-9]:[0-9][0-9]/;
    const dateFormat = /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/

    //triggers a re-fetch if a new section is added
    const { refetch, invalidateCache } = useSchedule();

    const handleAdd = async () => {
        try {
            console.log(sectionName);
            await addSections(sectionID, sectionDays, sectionStartTime, sectionEndTime, startDate, endDate, sectionBuilding, sectionRoom, sectionProfessor);
            invalidateCache();
            refetch();
            alert("Info saved!");
        } catch (e) {
            console.error('Error adding section: ', e);
        }

    }

    function SubmitInfo() {
        if (sectionName == '' || sectionDays == '' || sectionID == '') {
            alert("Empty information, try again.")
        }
        else if (!timeFormat.test(sectionStartTime) && !timeFormat.test(sectionEndTime)) {
            alert("Time format not accepted. Input correct form please.")
        }
        else if (!dateFormat.test(startDate) && !dateFormat.test(endDate)) {
            alert("Date format not accepted. Input correct form please.")
        }
        else {
            // c_id, dow, start_time, end_time, start_date, end_date, building, room_n, instructor
            handleAdd();
        }
    }


    return (
        <SafeAreaView style={{ ...themeBg, minHeight: height, marginTop: -30 }}>
            <View style={{ flex: 1 }} >
                <ScrollView style={themeText}>


                    <Text style={[themeText, styles.title]}>Select Days:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={[themeShaded, themeText]}
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
                            <Picker.Item label='Monday | Wednesday | Friday' value='MWF' />
                            <Picker.Item label='Tuesday | Thursday' value='TR' />
                            <Picker.Item label='Monday | Wednesday' value='MW' />
                            <Picker.Item label='Wednesday | Friday' value='WF' />
                        </Picker>
                    </View>


                    <TextInput
                        placeholderTextColor="#777"
                        style={[styles.input, themeShaded, themeText]}
                        onChangeText={setSectionName}
                        value={sectionName}
                        placeholder='Section Name*'
                    >
                    </TextInput>


                    <TextInput
                        placeholderTextColor="#777"
                        style={[styles.input, themeShaded, themeText]}
                        onChangeText={setSectionID}
                        value={sectionID}
                        placeholder='Course ID*'
                    >
                    </TextInput>


                    <View>
                        <Text style={[themeText, styles.title]}>Start and End time*:</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                placeholderTextColor="#777"
                                style={[styles.inputDates, themeShaded, {color: "#f00"}]}
                                onChangeText={setSectionStartTime}
                                value={sectionStartTime}
                                placeholder='Start* (hh:hh)'
                            >
                            </TextInput>


                            <TextInput
                                placeholderTextColor="#777"
                                style={[styles.inputDates, themeShaded, themeText]}
                                onChangeText={setSectionEndTime}
                                value={sectionEndTime}
                                placeholder='End* (hh:hh)'
                            >
                            </TextInput>
                        </View>
                    </View>


                    <View>
                        <Text style={[themeText, styles.title]}>Start and End Date*:</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                placeholderTextColor="#777"
                                style={[styles.inputDates, themeShaded, themeText]}
                                onChangeText={setStartDate}
                                value={startDate}
                                placeholder='First day* (yyyy/mm/dd)'
                            >
                            </TextInput>


                            <TextInput
                                placeholderTextColor="#777"
                                style={[styles.inputDates, themeShaded, themeText]}
                                onChangeText={setEndDate}
                                value={endDate}
                                placeholder='Last day* (yyyy/mm/dd)'
                            >
                            </TextInput>
                        </View>
                    </View>

                    <Text style={[themeText, styles.title]}>Optional:</Text>
                    <TextInput
                        placeholderTextColor="#777"
                        style={[styles.input, themeShaded, themeText]}
                        onChangeText={setSectionProfessor}
                        value={sectionProfessor}
                        placeholder='Instructor'
                    >
                    </TextInput>

                    <TextInput
                        placeholderTextColor="#777"
                        style={[styles.input, themeShaded, themeText]}
                        onChangeText={setSectionRoom}
                        value={sectionRoom}
                        placeholder='Section Room'
                    >
                    </TextInput>


                    <TextInput
                        placeholderTextColor="#777"
                        style={[styles.input, themeShaded, themeText]}
                        onChangeText={setSectionBuilding}
                        value={sectionBuilding}
                        placeholder='Building'
                    >
                    </TextInput>


                    <View style={[styles.submit, themeText]}>
                        <Button
                            onPress={SubmitInfo}
                            color= "#035642"
                            style={[themeShaded, themeText]}
                            title="Submit"
                        ></Button>
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.backButton}>
                            <BackButton />
                        </View>
                    </View>
                </ScrollView>




            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    title: {
        paddingLeft: 5,
        paddingBottom: 2,
        fontWeight: 'bold'
    },
    pickerContainer: {
        fontWeight: 'bold',
        height: 45,
        justifyContent: "center",
        margin: 5,
        borderRadius: 10,
        borderWidth: 0,
        overflow: "hidden",
    },
    input: {
        height: 45,
        margin: 5,
        borderRadius: 10,
        padding: 8,
    },
    inputDates: {
        height: 45,
        margin: 5,
        flexGrow: 1,
        borderRadius: 10,
        padding: 8,
    },
    inputView: {
        flexDirection: 'row',
        margin: 5,
        gap: 10,
    },
    submit: {
        // flex: 1,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: '5%',
        marginLeft: '14%',
        // alignContent: 'center'
    },
    backButton: {
        marginTop: 5,
        backgroundColor: 'green',
        width: '20%',
        borderRadius: 25,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

