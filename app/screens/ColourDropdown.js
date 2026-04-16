import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useThemeStore, mainDark, mainLight} from '../../contexts/ThemeContext';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.2; // 20% of screen

const params = {
    colour: 'Green',
    index: 0
};

export default function ColourButton(params) {
    const { isDarkMode, setIndex, index } = useThemeStore();

    const toggleTheme = (1) => {
        setIndex(index);
    };

    const colours = {
        {label: "green", value: "0",},
        {label: "red", value: "0",},
        {label: "blue", value: "0",},
        {label: "pink", value: "0",},
        {label: "purple", value: "0",},
        {label: "yellow", value: "0",},
        {label: "orange", value: "0",},
        {label: "grey", value: "0",},
    }

    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor: isDarkMode ? mainDark[index] : mainLight[index]}]}
            onPress={toggleTheme}
            activeOpacity={0.7}
        >
            <Text style={[styles.buttonText, {color: isDarkMode ? "#fff" : "#000"}]}>{colour}</Text>
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
        fontSize: 16,
        fontWeight: '600',
    },
});
