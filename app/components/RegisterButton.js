import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useFirstBackground } from "../contexts/ThemeContext";


const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.6; // 60% of screen


export default function RegisterButton({ onPress }) {
    const navigation = useNavigation();
    const firstBg = useFirstBackground();
        
    const handlePress = () => {
        navigation.navigate('Register',{})
    };
        
    
    return (
        <TouchableOpacity
            style={[styles.button, firstBg]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#035642',
        padding: 10,
        marginTop: 10,
        borderRadius: 18,
        width: buttonWidth,
        height: 45,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
