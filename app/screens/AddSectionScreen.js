import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import { useThemeText, useThemeBackground, useThemeStore, useFirstColour } from "../contexts/ThemeContext";



export default function AddSectionScreen() {
    const [sectionName, setSectionName] = useState('');
    const [sectionDays, setSectionDays] = useState('');
    const [sectionDuration, setSectionDuration] = useState('');
    const [sectionStartTime, setSectionStartTime] = useState('');
    const [sectionEndTime, setSectionEndTime] = useState('');
    const [sectionProfessor, setSectionProfessor] = useState('');
    const [sectionRoom, setSectionRoom] = useState('');
    const themeBg = useThemeBackground();

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', ...themeBg}}>
                        < BackButton />
                    </View>

                    <TextInput
                        style={styles.input}
                        onChangeText={setSectionName}
                        value={sectionName}
                        placeholder='Section Name'
                    >
                    </TextInput>

                    <TextInput
                        style={styles.input}
                        onChangeText={setSectionDuration}
                        value={sectionDuration}
                        placeholder='Section Time'
                    >
                    </TextInput>

                    <TextInput
                        style={styles.input}
                        onChangeText={setSectionDays}
                        value={sectionDays}
                        placeholder='Section Days'
                    >
                    </TextInput>

                    <TextInput
                        style={styles.input}
                        onChangeText={setSectionStartTime}
                        value={sectionStartTime}
                        placeholder='Section Start Time'
                    >
                    </TextInput>

                    <TextInput
                        style={styles.input}
                        onChangeText={setSectionEndTime}
                        value={sectionEndTime}
                        placeholder='Section End Time'
                    >
                    </TextInput>

                       <TextInput
                        style={styles.input}
                        onChangeText={setSectionProfessor}
                        value={sectionProfessor}
                        placeholder='Instructor'
                    >
                    </TextInput>

                       <TextInput
                        style={styles.input}
                        onChangeText={setSectionRoom}
                        value={sectionRoom}
                        placeholder='Section Room'
                    >
                    </TextInput>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
       
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        
    }
});