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
            style={styles.button}
            onPress={handlePress}
            activeOpacity={0.95}
        >
            <Text style={styles.buttonText}>Add Section</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#035642',
        marginHorizontal: 12,
        marginTop: 4,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
