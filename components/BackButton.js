import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.3; // 30% of screen


export default function BackButton({ onPress }) {
    const handlePress = () => onPress();
    
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}> &lt; Go Back</Text>
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
        right: screenWidth*.25
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});