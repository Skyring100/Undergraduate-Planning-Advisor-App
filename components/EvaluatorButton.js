import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const buttonHeight = screenHeight *0.29;
const screenWidth = Dimensions.get('window').width;
const buttonWidth = buttonHeight;//screenWidth * 0.60;

export default function EvaluatorButton() {
    const navigation = useNavigation();
    
    const handlePress = () => {
        navigation.navigate('Evaluator',{})
    };
    
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}>Evaluator</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#035642',
        padding: 10,
        borderRadius: 180,
        width: buttonWidth,
        height: buttonHeight,
    },
    buttonText: {
        fontSize: 30,
        color: '#fff',
    },
});