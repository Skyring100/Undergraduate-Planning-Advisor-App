import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useThemeStore, mainDark, mainLight} from '../../contexts/ThemeContext';

const screenHeight = Dimensions.get('window').height;
const buttonHeight = screenHeight *0.27;
const buttonWidth = buttonHeight;//screenWidth * 0.60;


export default function EvaluatorButton() {
    const navigation = useNavigation();
    const { isDarkMode } = useThemeStore();

    const handlePress = () => {
        navigation.navigate('Evaluator',{})
    };
    
    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor: isDarkMode ? mainDark[0] : mainLight[0]}]}
            onPress={handlePress}
            activeOpacity={1}
        >
            <Text style={[styles.buttonText]}>Evaluator</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 180,
        marginTop: buttonHeight*0.08,
        width: buttonWidth,
        height: buttonHeight,
    },
    buttonText: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    },
});