import { DarkTheme, useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native';
import { borderColour, fourthLight, mainDark, mainLight, secondDark, secondLight, useThemeStore } from '../../contexts/ThemeContext';
import OutlinedText from '@kdn0325/react-native-outlined-text';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth;

const screenHeight = Dimensions.get('window').height;
const buttonHeight = screenHeight *0.45;


export default function CourseButton() {
    const navigation = useNavigation();
    const { isDarkMode, indexColour } = useThemeStore();
    
    const handlePress = () => {
        navigation.navigate('Courses',{})
    };
    
    return (
        <TouchableOpacity
            style={[styles.button, 
                {backgroundColor: isDarkMode ? secondDark[indexColour] : secondLight[indexColour],
                     borderColor: isDarkMode ? borderColour[indexColour] : mainDark[indexColour]}]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View pointerEvents="none" style={{marginBottom: buttonHeight*0.35}}>
                <OutlinedText
                    text={' Courses '}

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
    },
    buttonText: {
        marginBottom: buttonHeight*0.45,
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    },
});
