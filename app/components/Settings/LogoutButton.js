import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

import {mainDark, mainLight, useThemeStore, useFirstBackground} from "../../contexts/ThemeContext";



const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.3; // 30% of screen

// TODO: make this affect the user context
export default function LogoutButton() {
    const navigation = useNavigation();
    const handlePress = () => {

        navigation.navigate('Login',{})
    };
    const firstBg = useFirstBackground();
    
    return (
        <TouchableOpacity
            style={[firstBg, styles.button]}
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
        height: 45,
        right: screenWidth*.32
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
