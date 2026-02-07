import { TouchableOpacity, Text, StyleSheet, Dimensions, Image } from 'react-native';


const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.2; // 20% of screen



export default function HelpButton({ onPress }) {
    const handlePress = () => onPress();
    
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Image source={require('../assets/gear.png')}
                style={{width:40, height:40, backgroundColor: '#ffffff', borderRadius: 100}}/>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        left: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});