import { TouchableOpacity, Text, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';


const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.2; // 20% of screen



export default function SettingsButton({ onPress }) {
    const handlePress = () => onPress();
    
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <ImageBackground source={require('../assets/gear.png')}
                style={{width:40, height:40}}>
            </ImageBackground>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        width: buttonWidth,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});