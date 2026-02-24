import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { mainDark, mainLight, isDarkMode } from '../../contexts/ThemeContext';

const screenHeight = Dimensions.get('window').height;
const buttonHeight = screenHeight *0.27;
const screenWidth = Dimensions.get('window').width;
const buttonWidth = buttonHeight;//screenWidth * 0.60;

export default function EvaluatorButton() {
    const navigation = useNavigation();
    
    const handlePress = () => {
        navigation.navigate('Evaluator',{})
    };
    
    return (
        <TouchableOpacity
            style={[styles.button, ]}
            onPress={handlePress}
            activeOpacity={1}
        >
            <Text style={styles.buttonText}>Evaluator</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 180,
        marginTop: 9,
        width: buttonWidth,
        height: buttonHeight,
        backgroundColor: isDarkMode ? mainLight[0] : mainDark[0],
    },
    buttonText: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    },
});