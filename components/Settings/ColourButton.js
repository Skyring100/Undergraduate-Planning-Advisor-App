import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useThemeStore, mainDark, mainLight} from '../../contexts/ThemeContext';


const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.6; // 60% of screen

export default function ColourButton(colour, index) {
    const { isDarkMode, setIndexColour } = useThemeStore();

    const toggleTheme = () => {
        setIndexColour(index);
    };

    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor: isDarkMode ? mainDark[index] : mainLight[index]}]}
            onPress={toggleTheme}
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}>{colour}</Text>
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
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});