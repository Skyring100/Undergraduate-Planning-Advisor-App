import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { thirdDark, thirdLight, isDarkMode, indexColour } from '../../contexts/ThemeContext';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.7;

const screenHeight = Dimensions.get('window').height;
const buttonHeight = screenHeight *0.5;


export default function ScheduleButton() {
    const navigation = useNavigation();
    
    const handlePress = () => {
        navigation.navigate('Schedule',{})
    };
    
    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor: isDarkMode ? thirdLight[0] : thirdDark[0]}]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}>Schedule</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 10,
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        width: buttonWidth,
        height: buttonHeight*0.75,
    },
    buttonText: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    },
});