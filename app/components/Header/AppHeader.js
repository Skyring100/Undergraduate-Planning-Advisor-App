import { Header } from '@react-navigation/elements';
import { StyleSheet, Image, View, Text, Button, Pressable, Dimensions } from 'react-native';
import SettingsButton from './SettingsButton';
import HelpButton from './HelpButton';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useFirstColour, useZerothColour, useThemeText, useThemeStore, useThemeBackground } from '../../contexts/ThemeContext';

import PopUp from './PopUp';
import { useNavigationState } from '@react-navigation/native';
import { useDrawer } from '../../contexts/DrawerContext';
import BackButton from '../BackButton';

//<Header title='Gradian' style={styles.header}/>
const screenWidth = Dimensions.get('window').width;


export default function AppHeader() {

    const colour = useFirstColour();
    const colour2 = useZerothColour();
    const themeText = useThemeText();

    const CustomHeader = () => {
        const routeName = useNavigationState((state) =>
            state.routes[state.index].name
        );

        const { setIsDrawerOpen } = useDrawer();

        return (
            <View style={[styles.header, colour]}>

                {/* <View style={styles.backButton}>
                    <BackButton />
                </View> */}

                <View style={styles.helpButton}>
                    <PopUp >

                        {routeName === 'Dashboard' ? <View style={styles.explanation}>
                            <Text>Courses: shows the list of all available courses, with a search function that can be filtered by name or code.</Text>
                            <Text>Schedule: shows the weekly schedule.</Text>
                            <Text>Evaluator: shows degree evaluation details.</Text>
                            <Text>Planner: shows the degree planner details, that can be customized by the user.</Text>

                        </View> : <View><Text></Text></View>}

                        {routeName === 'Schedule' ? <View style={styles.explanation}>
                            <Text>Calendar: shows your daily schedule once you click on a day.</Text>
                            <Text>Add section: add new section to your calendar.</Text>

                        </View> : <View><Text></Text></View>}

                        {routeName === 'Login' ? <View style={styles.explanation}>
                            <Text>Login with your email and password or please create an account.</Text>

                        </View> : <View><Text></Text></View>}


                        {routeName === 'Planner' ? <View style={styles.explanation}>
                            <Text>Use the Default Planner in case you just want a template to what to follow for your degree.</Text>
                            <Text>Or add courses in a specific year/semester to customize your plan.</Text>
                        </View> : <View><Text></Text></View>}

                        {routeName === 'Requisites' ? <View style={styles.explanation}>
                            <Text>See all the required courses for your degree + Breadth requirements.</Text>
                        </View> : <View><Text></Text></View>}

                        {routeName === 'Evaluator' ? <View style={styles.explanation}>
                            <Text>Check your progress and how you have been doing for your degree.</Text>
                        </View> : <View><Text></Text></View>}

                        {routeName === 'AddSection' ? <View style={styles.explanation}>
                            <Text>Add information for your section to appear in your weekly schedule.</Text>
                        </View> : <View><Text></Text></View>}


                    </PopUp>
                </View>
                <Text style={[styles.headerText]}>{routeName}</Text>
                <View style={styles.navDrawerContainer}>
                    <View style={[styles.square, colour2]}>
                        <Pressable onPress={() => setIsDrawerOpen(true)} style={{ paddingTop: navWidth * 0.8 }}>
                            <Image source={require('../../assets/drawer.png')} style={styles.drawerImage} />
                        </Pressable>
                    </View>
                    <View style={[styles.triangle, { borderTopColor: colour2.backgroundColor }]} />
                </View>
            </View>

        );
    };

    return (
        <View>
            <CustomHeader>

            </CustomHeader>
        </View>

    );
}

const navWidth = 80;

export const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 125,
        width: '100%',
    },
    headerText: {
        position: 'absolute',
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
        marginTop: 45,
        marginLeft: 45,
        marginRight: 45,
    },
    explanation: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'end',
        width: '80%',
    },
    helpButton: {
        position: 'absolute',
        left: 60,
        marginTop: 20,
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        width: 61,
        height: 40
    },
    drawerImage: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        width: navWidth / 2,
        height: navWidth / 2,
    },
    navDrawerContainer: {
        position: 'absolute',
        right: 0,
        alignItems: 'center',
    },
    square: {
        width: navWidth,
        height: 145,
        backgroundColor: '#022b21',
        justifyContent: 'center',
        alignItems: 'center',
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeftWidth: navWidth / 2,
        borderRightWidth: navWidth / 2,
        borderTopWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    backButton: {
        // backgroundColor: 'red',
        // flex: 1,
        position: 'absolute',
        left: -10,
        top: 63
    }
});
