import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native';
import { useFourthColour, useThemeStore, mainDark, borderColour, fourthLight} from '../../contexts/ThemeContext';
import OutlinedText from '@kdn0325/react-native-outlined-text';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth;

const screenHeight = Dimensions.get('window').height;
export const buttonHeight = screenHeight *0.45;


export default function PlannerButton() {
    const navigation = useNavigation();
    const { isDarkMode, indexColour } = useThemeStore();
    const colour = useFourthColour();
    
    const handlePress = () => {
        navigation.navigate('Planner',{})
    };
    
    return (
        <TouchableOpacity
            style={[styles.button, colour,
                {borderColor: isDarkMode ? borderColour[indexColour] : mainDark[indexColour]}]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
           <View pointerEvents="none" style={{marginTop: buttonHeight*0.45}}>
                <OutlinedText
                    text={' Planner '}
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
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 10,
        width: buttonWidth,
        height: buttonHeight,
        borderColor: "#000000",
        borderWidth: 5,
        marginTop: 5,
    },
    buttonText: {
        fontSize: 30,
        color: '#fff',
        marginTop: buttonHeight*0.45,
        fontWeight: 'bold',
    },
});
