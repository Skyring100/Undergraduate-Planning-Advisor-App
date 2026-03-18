import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import {mainDark, mainLight, useThemeStore, useFirstColour} from "../../contexts/ThemeContext";


const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.3; // 30% of screen


export default function AllCoursesButton() {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate('CourseList',{});
    };
    const firstBg = useFirstColour();
    
    return (
        <TouchableOpacity
            style={[firstBg, styles.button]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}>All Courses</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 10,
        borderRadius: 18,
        width: buttonWidth,
        height: 45,
        left: screenWidth * 0.03,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});