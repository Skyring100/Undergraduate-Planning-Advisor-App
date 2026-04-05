import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFirstColour, useFourthColour, useThemeBackground, useThemeStore } from '../contexts/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BottomBar() {
    const insets = useSafeAreaInsets();
    const bg1 = useFirstColour();
    const bg2 = useThemeBackground();
    return (
        <SafeAreaView style={styles.footer}>
            <View style={styles.navBar}>
                <TouchableIcon route="Requisites">
                    <Image style={styles.image} source={require('../assets/navbar-icons/checklist.png')} />
                </TouchableIcon>
                <TouchableIcon route="Schedule">
                    <Image style={styles.image} source={require('../assets/navbar-icons/calendar.png')} />
                </TouchableIcon>
                <TouchableIcon route="Dashboard">
                    <Image style={styles.image} source={require('../assets/navbar-icons/home.png')} />
                </TouchableIcon>
                <TouchableIcon route="Planner">
                    <Image style={[styles.image, styles.gradcap]} source={require('../assets/navbar-icons/gradcap.png')} />
                </TouchableIcon>
                <TouchableIcon route="Evaluator">
                    <Image style={[styles.image, styles.star]} source={require('../assets/navbar-icons/star.png')} />
                </TouchableIcon>
            </View>
        </SafeAreaView>
    );
}

export const TouchableIcon = ({route, children}) => {
    const navigation = useNavigation();
    return (
        <>
        <Pressable onPress={() => navigation.navigate(route, {})} style={{flexShrink: 1,}}>
            {children}
        </Pressable>
        </>
    );
}

const imgWidth = 30;

export const styles = StyleSheet.create({
    footer: {
        paddingTop: "-60",
        width: "100%",
        backgroundColor: '#035642',

    },
    navBar: {
        height: Platform.OS === 'ios' ? 40 : 59,
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: imgWidth,
        paddingRight: imgWidth,
        backgroundColor: '#035642',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'center',
        height: imgWidth,
        width: imgWidth,
        marginTop: Platform.OS === 'ios' ? 25 : 0,
    },
    gradcap: {
        marginLeft: imgWidth * (-14/30),
        marginRight: imgWidth * (-18/30),
        width: imgWidth * (62/30),
        resizeMode: 'contain',
    },
    star: {
        marginLeft: -2,
        marginRight: -2,
        width: imgWidth * (34/30),
        resizeMode: 'contain',
    },
});
