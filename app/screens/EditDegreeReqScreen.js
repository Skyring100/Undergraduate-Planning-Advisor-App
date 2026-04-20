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
import { useSchedule } from '../contexts/ScheduleContext';

export default function EditDegreeReqScreen() {
    const [name, setName] = useState('');
    const [isMinor, setIsMinor] = useState(false);
    const [courseId, setCourseId] = useState('');
    const [minGrade, setMinGrade] = useState('');
    const [desc, setDesc] = useState('');
    const [numCred, setNumCred] = useState(0);
    const courseReqs = useState([]);
    const creditReqs = useState([]);

    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const { width, height } = useWindowDimensions();
    const firstColour = useFirstColour();



    const submit = async () => {
        try {
            courseReqs.push(courseId, minGrade);
            creditReqs.push(desc, numCred);

        } catch (e) {
            console.error('Error editing requirements: ', e);
        }
    }

    function SubmitInfo() {
        if (name === '' || courseId === '' || minGrade === '' || numCred === 0) {
            alert("Empty information, try again.")
        }
        else {
            submit()
        }
    }

    return (
        <SafeAreaView style={{ ...themeBg, minHeight: height, marginTop: -30 }}>
            <View style={{ flex: 1 }}>
                <ScrollView style={themeText}>

                    <TextInput
                        style={[styles.input, firstColour]}
                        onChangeText={setName}
                        value={name}
                        placeholder='Name*'
                    >
                    </TextInput>

                    {/* The way this will work is that I'll later return a proper boolean, for now is just text */}
                    <Text style={[themeText, styles.title]}>Is it a minor?</Text>
                    <Picker
                        style={firstColour}
                        selectedValue={isMinor}
                        onValueChange={(itemValue, itemIndex) =>
                            setIsMinor(itemValue)
                        }>
                        <Picker.Item label='True' value={true} />
                        <Picker.Item label='False' value={false} />
                    </Picker>

                    <TextInput
                        style={[styles.input, firstColour]}
                        onChangeText={setCourseId}
                        value={courseId}
                        placeholder='Course ID*'
                    >
                    </TextInput>

                    <Text style={[themeText, styles.title]}>Min Grade</Text>
                    <Picker
                        style={firstColour}
                        selectedValue={minGrade}
                        onValueChange={(itemValue, itemIndex) =>
                            setMinGrade(itemValue)
                        }>
                        <Picker.Item label='C+' value='C+' />
                        <Picker.Item label='C' value='C' />
                        <Picker.Item label='C-' value='C-' />
                        <Picker.Item label='D+' value='D+' />
                        <Picker.Item label='D' value='D' />
                        <Picker.Item label='D-' value='D-' />
                    </Picker>

                    <TextInput
                        style={[styles.input, firstColour]}
                        onChangeText={setDesc}
                        value={desc}
                        placeholder='Course Description'
                    >
                    </TextInput>

                    <TextInput
                        style={[styles.input, firstColour]}
                        keyboardType='numeric'
                        onChangeText={setNumCred}
                        value={numCred}
                        placeholder='Total Credits*'
                    >
                    </TextInput>

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
    input: {
        height: '12%',
        margin: 5,
        borderWidth: 1,
        padding: 8,
    },
});