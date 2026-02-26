import { Header } from '@react-navigation/elements';
import { StyleSheet, Image, View, Text, Button } from 'react-native';
import SettingsButton from './SettingsButton';
import HelpButton from './HelpButton';
import { useNavigation } from '@react-navigation/native';
import { mainDark, mainLight, useThemeStore } from '../contexts/ThemeContext';

//<Header title='Gradian' style={styles.header}/>

export default function AppHeader() {

    const navigation = useNavigation();
    const { isDarkMode , indexColour} = useThemeStore();

    return (
        <View style={[styles.header, {backgroundColor: mainDark[indexColour]}]}>
            <HelpButton onPress={()=> {alert("Make this button give info about current page")}}/>
            <Text style={styles.headerText}>Gradian</Text>
            <Image style={{justifyContent:'center', alignItems:'center', marginTop: 35, marginBottom: 5, resizeMode: 'center', width: 61, height: 40}} source={require('../assets/white-main-logo.png')}/>
            <SettingsButton />
        </View>
        
    );
}

const styles = StyleSheet.create ({
    header: {
        tintColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 28,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 10,
    }
});