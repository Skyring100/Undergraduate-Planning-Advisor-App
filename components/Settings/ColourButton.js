import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useThemeStore, mainDark, mainLight} from '../../contexts/ThemeContext';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.2; // 20% of screen

const params = {
    colour: 'Green',
    index: 0
};

export default function ColourButton(params) {
    const { isDarkMode, setIndex } = useThemeStore();
    const { colour, index } = params;

    const toggleTheme = () => {
        setIndex(index);
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
        marginRight: 5,
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