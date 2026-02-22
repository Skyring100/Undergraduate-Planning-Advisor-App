import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth;

const screenHeight = Dimensions.get('window').height;
const buttonHeight = screenHeight *0.45;


export default function PlannerButton() {
    const navigation = useNavigation();
    
    const handlePress = () => {
        navigation.navigate('Planner',{})
    };
    
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}>Planner</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#366354', //dark mode?
        //backgroundColor: '#528271', //light mode
        padding: 10,
        width: buttonWidth,
        height: buttonHeight,
    },
    buttonText: {
        fontSize: 30,
        color: '#fff',
        marginTop: buttonHeight*0.45,
    },
});