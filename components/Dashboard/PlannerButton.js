import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { fourthDark, useThemeStore, fourthLight } from '../../contexts/ThemeContext';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth;

const screenHeight = Dimensions.get('window').height;
const buttonHeight = screenHeight *0.45;


export default function PlannerButton() {
    const navigation = useNavigation();
    const { isDarkMode, indexColour } = useThemeStore();
    
    const handlePress = () => {
        navigation.navigate('Planner',{})
    };
    
    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor: isDarkMode ? fourthDark[indexColour] : fourthLight[indexColour]}]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={[styles.buttonText, {color: isDarkMode ? '#fff' : '#303030'}]}>Planner</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 10,
        width: buttonWidth,
        height: buttonHeight,
        borderColor: "#000000",
        borderWidth: 5,
        
    },
    buttonText: {
        fontSize: 30,
        color: '#fff',
        marginTop: buttonHeight*0.45,
        fontWeight: 'bold',
    },
});