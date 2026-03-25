import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native';
import { borderColour, fourthLight, mainDark, mainLight, thirdDark, thirdLight, useThemeStore} from '../../contexts/ThemeContext';
import OutlinedText from '@kdn0325/react-native-outlined-text';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.7;

const screenHeight = Dimensions.get('window').height;
const buttonHeight = screenHeight *0.5;


export default function AddSectionButton() {
    const navigation = useNavigation();
    const { isDarkMode, indexColour } = useThemeStore();
    
    const handlePress = () => {
        navigation.navigate('AddSection',{})
    };
    
    return (
        <TouchableOpacity
            style={[styles.button, 
                {backgroundColor: isDarkMode ? thirdDark[indexColour] : thirdLight[indexColour], 
                    borderColor: isDarkMode ? borderColour[indexColour] : mainDark[indexColour]}]}
            onPress={handlePress}
            activeOpacity={0.95}
        >
            <View pointerEvents="none">
                <OutlinedText
                    text={' Add Section '}
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
        // padding: 5,
        // marginTop: 10,
        // borderRadius: 18,
        // width: buttonWidth,
        // height: 25,
        // right: screenWidth*.32
    },
    buttonText: {
        color: '#fff',
        fontSize: 4,
        fontWeight: '100',
    },
});
