import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions, Image } from 'react-native';
import {mainDark, mainLight, useThemeStore, useFirstColour} from "../contexts/ThemeContext";


const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.3; // 30% of screen


export default function BackButton() {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.goBack();
    };
    
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Image source={require('../assets/backButton.png')} style={styles.image} />
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    image: {
        height: 30,
        width: 40,
        resizeMode: 'contain'
    },
});
