import { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useThemeStore, useFirstColour, useThemeText} from '../../contexts/ThemeContext';
import { useTheme } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.6; // 60% of screen

export default function DarkLightSlider() {
    const { isDarkMode, setIsDarkMode, indexColour } = useThemeStore();
    const firstBg = useFirstColour();

    const toggleTheme = () => {
        setIsDarkMode(prevTheme => !prevTheme);
    };

    return (
        <TouchableOpacity
            style={[styles.button, firstBg]}
            onPress={toggleTheme}
            activeOpacity={0.7}
        >
            <Text style={[styles.buttonText, useThemeText]}>{"Toggle Light/Dark Mode"}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 10,
        borderRadius: 18,
        width: buttonWidth,
        height: 45,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
