import { Header } from '@react-navigation/elements';
import { StyleSheet, Image, View, Text, Button } from 'react-native';
import SettingsButton from './SettingsButton';
import HelpButton from './HelpButton';
import { useNavigation, useIsFocused  } from '@react-navigation/native';
import { mainDark, mainLight, useThemeStore } from '../contexts/ThemeContext';
import PopUp from './Dashboard/PopUp';

//<Header title='Gradian' style={styles.header}/>

export default function AppHeader() {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const { isDarkMode, indexColour } = useThemeStore();


    return (
        <View style={[styles.header, { backgroundColor: mainDark[indexColour] }]}>
            <View style = {styles.helpButton}>
                <PopUp >
                    <View style={styles.explanation}>
                        <Text>Courses: shows the list of all available courses, with a search function that can be filtered by name or code.</Text>
                        <Text>Schedule: shows the weekly schedule.</Text>
                        <Text>Evaluator: shows degree evaluation details.</Text>
                        <Text>Planner: shows the degree planner details, that can be customized by the user.</Text>
                    </View>
                </PopUp>
            </View>
            <Text style={styles.headerText}>Gradian</Text>
            <Image style={styles.image} source={require('../assets/white-main-logo.png')} />
            <SettingsButton />
        </View>

    );
}

const styles = StyleSheet.create({
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
        marginLeft: 65,
        marginRight: 10,
    },
    explanation: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'end',
        width: '80%',
    },
    helpButton: {
       position: 'absolute',
       left: 40,
    },
    image: {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 35, 
        marginBottom: 5, 
        marginRight: 25,
        resizeMode: 'center', 
        width: 61, 
        height: 40 
    }
});