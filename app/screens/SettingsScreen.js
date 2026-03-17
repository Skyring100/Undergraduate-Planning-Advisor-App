import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, StyleSheet, Dimensions, View, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../contexts/UserContext';
import BackButton from '../components/BackButton';
import DarkLightButton from '../components/Settings/DarkLightButton';
import ColourButton from '../components/Settings/ColourButton';
import { ThemeProvider, useThemeStore, useThemeText, useThemeBackground } from "../contexts/ThemeContext";

const screenWidth = Dimensions.get('window').width;
const inputWidth = screenWidth * 0.85; // 85% of screen



export default function SettingsScreen() {

    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const {width} = useWindowDimensions();
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, themeBg, {width: width}]}>
                <BackButton/>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, themeText]}>Settings</Text>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center',}}>
                    <DarkLightButton/>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <ColourButton colour={'Green'} index={0}/>
                    <ColourButton colour={'Red'} index={1}/>
                    <ColourButton colour={'Blue'} index={2}/>
                    <ColourButton colour={'Pink'} index={3}/>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <ColourButton colour={'Purple'} index={4}/>
                    <ColourButton colour={'Yellow'} index={5}/>
                    <ColourButton colour={'Orange'} index={6}/>
                    <ColourButton colour={'Grey'} index={7}/>
                </View>
            </SafeAreaView >
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        margin: 'auto',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        padding: 80
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    buttonText: {
        color: '#fff',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        marginTop: 10,
        width: inputWidth
    },
});
