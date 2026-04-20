import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {mainDark, mainLight, useThemeStore, useFirstColour} from "../../contexts/ThemeContext";



const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.5; // 30% of screen

// TODO: make this affect the user context
export default function LogoutButton() {
    const navigation = useNavigation();
    const firstBg = useFirstColour();
    const handlePress = async () => {
        await AsyncStorage.setItem('authToken', '');
        console.log("Token reset", await AsyncStorage.getItem('authToken'));
        navigation.navigate('Login',{});
    };
    
    return (
        <TouchableOpacity
            style={[styles.button, firstBg]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}>Logout</Text>
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
        backgroundColor: '#035642'
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
    },
});
