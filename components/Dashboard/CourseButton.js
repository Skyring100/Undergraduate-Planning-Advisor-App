import { DarkTheme, useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { secondDark, secondLight, isDarkMode } from '../../contexts/ThemeContext';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth;

const screenHeight = Dimensions.get('window').height;
const buttonHeight = screenHeight *0.45;


export default function CourseButton() {
    const navigation = useNavigation();
    
    const handlePress = () => {
        navigation.navigate('Courses',{})
    };
    
    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor: isDarkMode ? secondLight[0] : secondDark[0]}]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}>Courses</Text>
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
    },
    buttonText: {
        marginBottom: buttonHeight*0.45,
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    },
});