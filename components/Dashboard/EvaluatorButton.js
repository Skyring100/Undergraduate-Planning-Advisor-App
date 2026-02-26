import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native';
import { useThemeStore, mainDark, mainLight, fourthLight, borderColour} from '../../contexts/ThemeContext';
import OutlinedText from '@kdn0325/react-native-outlined-text';

const screenHeight = Dimensions.get('window').height;
const buttonHeight = screenHeight *0.27;
const buttonWidth = buttonHeight;//screenWidth * 0.60;


export default function EvaluatorButton() {
    const navigation = useNavigation();
    const { isDarkMode, indexColour } = useThemeStore();

    const handlePress = () => {
        navigation.navigate('Evaluator',{})
    };
    
    return (
        <TouchableOpacity
            style={[styles.button, 
                {backgroundColor: isDarkMode ? mainDark[indexColour] : mainLight[indexColour], 
                    borderColor: isDarkMode ? borderColour[indexColour] : mainDark[indexColour]}]}
            onPress={handlePress}
            activeOpacity={1}
        >
            <View pointerEvents="none">
                <OutlinedText
                    text={' Evaluator '}
                    color={isDarkMode ? fourthLight[indexColour] : '#ffffff'}
                    fontSize={30}
                    fontWeight={'500'}
                    outlineColor={'#000000'}
                    shadowLine={3}
                />
            </View>
            {/* <Text style={[styles.buttonText, {color: isDarkMode ? fourthLight[indexColour] : mainDark[indexColour]}]}>Evaluator</Text> */}  
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
        borderColor: "#000000",
        borderWidth: 5,
    },
    buttonText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});
