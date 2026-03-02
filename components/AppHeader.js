import { Header } from '@react-navigation/elements';
import { StyleSheet, Image, View, Text, Button } from 'react-native';
import SettingsButton from './SettingsButton';
import HelpButton from './HelpButton';
import { useNavigation } from '@react-navigation/native';
import { mainDark, mainLight, useThemeStore } from '../contexts/ThemeContext';
import PopUp from './Dashboard/PopUp';

//<Header title='Gradian' style={styles.header}/>

export default function AppHeader() {

    const navigation = useNavigation();
    const { isDarkMode, indexColour } = useThemeStore();

    return (
        <View style={[styles.header, { backgroundColor: mainDark[indexColour] }]}>
            <PopUp >
                <View style={styles.explanation}>
                    <Text>Courses: shows the list of all available courses, with a search function that can be filtered by name or code.</Text>
                    <Text>Schedule: shows the weekly schedule.</Text>
                    <Text>Evaluator: shows degree evaluation details.</Text>
                    <Text>Planner: shows the degree planner details, that can be customized by the user.</Text>
                </View>
            </PopUp>
            <Text style={styles.headerText}>Gradian</Text>
            <Image style={{ justifyContent: 'center', alignItems: 'center', marginTop: 35, marginBottom: 5, resizeMode: 'center', width: 61, height: 40 }} source={require('../assets/white-main-logo.png')} />
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
        marginLeft: 10,
        marginRight: 10,
    },
    explanation: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'end',
        width: '80%',
    }
});