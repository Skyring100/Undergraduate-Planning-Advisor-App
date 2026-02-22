import { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useThemeStore, mainDark, mainLight} from '../../contexts/ThemeContext';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.6; // 60% of screen

export default function DarkLightButton() {
    const { setTheme } = useThemeStore();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        setTheme(prevTheme => ({
            ...prevTheme,
            isDarkMode: !prevTheme.isDarkMode
        }));
    };

    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor: isDarkMode ? mainDark[0] : mainLight[0]}]}
            onPress={toggleTheme}
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#035642',
        padding: 10,
        marginTop: 10,
        borderRadius: 18,
        width: buttonWidth,
        height: 45,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});