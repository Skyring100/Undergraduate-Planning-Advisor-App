import { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions } from 'react-native';
import { useThemeStore, useFirstColour, useThemeShaded, useThemeText } from '../../contexts/ThemeContext';
import { useTheme } from '@react-navigation/native';
import FlickSwitch from './FlickSwitch';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth - 20;

export default function DarkLightSlider() {
    const { isDarkMode, setIsDarkMode, indexColour } = useThemeStore();
    const themeShaded = useThemeShaded();
    const themeText = useThemeText();

    const toggleTheme = () => {
        setIsDarkMode(prevTheme => !prevTheme);
    };

    return (
        <TouchableOpacity
            style={[styles.button, themeShaded]}
            onPress={toggleTheme}
            activeOpacity={0.7}
        >
            <View>
                <FlickSwitch height={20} width={50} isActivated={isDarkMode}/>
            </View>
            <Text style={[themeText, styles.buttonText]}>{isDarkMode ? "Turn off dark mode" : "Turn on dark mode"}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'flex-start',
        gap: 10,
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        width: buttonWidth,
        height: 45,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
