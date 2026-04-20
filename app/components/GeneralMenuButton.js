import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import {useFirstColour, useThemeText} from "../contexts/ThemeContext";



export default function GeneralMenuButton({handlePress, text}) {
    const firstBg = useFirstColour();
    return (
        <TouchableOpacity
            style={[styles.button, firstBg]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={[styles.buttonText, useThemeText]}>{text}</Text>
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
        backgroundColor: '#035642'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
    },
});
