import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native';
import { isDarkMode, fourthLight, useThirdColour} from '../../contexts/ThemeContext';
import OutlinedText from '@kdn0325/react-native-outlined-text';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.7;

const screenHeight = Dimensions.get('window').height;
const buttonHeight = screenHeight *0.30;


export default function AllCoursesButton() {
    const navigation = useNavigation();
    const firstBg = useThirdColour();
    
    const handlePress = () => {
        navigation.navigate('CourseList',{});
    };
    
    
    return (
        <TouchableOpacity
            style={[firstBg, styles.button]}
            onPress={handlePress}
            activeOpacity={0.95}
        >
            <View pointerEvents="none">
                            <OutlinedText
                                text={' All Courses '}
                                color={isDarkMode ? fourthLight[indexColour] : '#ffffff'}
                                fontSize={30}
                                fontWeight={'500'}
                                outlineColor={'#000000'}
                                shadowLine={3}
                            />
                        </View>
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
        borderColor: "#000000",
        borderWidth: 5,
        borderBottomWidth: 2.5,
    },
    buttonText: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    },
});
