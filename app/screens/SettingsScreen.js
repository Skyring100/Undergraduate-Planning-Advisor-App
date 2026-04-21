import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, StyleSheet, Dimensions, View, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../contexts/UserContext';
import BackButton from '../components/BackButton';
import DarkLightSlider from '../components/Settings/DarkLightSlider';
import ColourDropdown from '../components/Settings/ColourDropdown';
import ColourButton from '../components/Settings/ColourButton';
import { ThemeProvider, useThemeStore, useThemeText, useThemeBackground } from "../contexts/ThemeContext";
import LogoutButton from '../components/Settings/LogoutButton';

const screenWidth = Dimensions.get('window').width;
const inputWidth = screenWidth * 0.85; // 85% of screen



export default function SettingsScreen() {

    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const {width} = useWindowDimensions();
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, themeBg, {width: width}]}>
                <Text style={[styles.title, themeText]}>Appearance</Text>
                <View style={{alignItems: 'center', justifyContent: 'center',}}>
                    <DarkLightSlider/>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center',}}>
                    <ColourDropdown/>
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
        justifyContent: "space-around",
        paddingBottom: 'auto',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        margin: 10,
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
        width: inputWidth,
    },
});
