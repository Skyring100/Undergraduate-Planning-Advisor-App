import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFirstColour, useFourthColour, useThemeBackground, useThemeStore } from '../contexts/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BottomBar() {
    const insets = useSafeAreaInsets();
    const bg1 = useFirstColour();
    const bg2 = useThemeBackground();
    return (
        <SafeAreaView style={[styles.footer, bg2]}>
            <View style={[styles.navBar, bg1]}>
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

const TouchableIcon = ({route, children}) => {
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

const styles = StyleSheet.create({
    footer: {
        paddingTop: "-60",
        width: "100%",
    },
    navBar: {
        height: 59,
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: imgWidth,
        paddingRight: imgWidth,
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'center',
        height: imgWidth,
        width: imgWidth,
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
