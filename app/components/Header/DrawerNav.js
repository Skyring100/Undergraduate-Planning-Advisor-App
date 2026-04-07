import { useState } from "react";
import { View, Text, Presable, StyleSheet, Animated, Dimensions, Image, Pressable, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFirstColour, useThemeBackground, useThemeText, useThemeShaded, isDarkMode } from "../../contexts/ThemeContext";
import LogoutButton from "../Settings/LogoutButton";

const drawerWidth = Dimensions.get('window').width * 0.6;

export default function DrawerNav({isOpen, onClose}) {
    const navigation = useNavigation();
    const colour = useFirstColour();
    const bg = useThemeShaded();
    const text = useThemeText();
    const item = useThemeBackground();

    const navigateTo = (route) => {
        onClose();
        navigation.navigate(route);
    };

    if (!isOpen) return null;

    return (
        <View style={[styles.overlay]}>
            <Pressable style={[styles.backdrop]} onPress={onClose}>
                <View style={[styles.drawer, bg]}>
                    <Pressable onPress={() => navigateTo('Account')} style={styles.drawerPress}>
                        <View style={[styles.drawerItem, item]}>
                            <Image source={require('../../assets/profile.png')} style={[styles.image, {tintColor: text.color}]} />
                            <Text style={[styles.drawerText, text]}>Account</Text>
                        </View>
                        
                    </Pressable>
                    <Pressable onPress={() => navigateTo('Settings')}  style={styles.drawerPress}>
                        <View style={[styles.drawerItem, item]}>
                            <Image source={require('../../assets/settings.png')} style={[styles.image, {tintColor: text.color}]} />
                            <Text style={[styles.drawerText, text]}>Settings</Text>
                        </View>                    
                    </Pressable>
                    <View style={styles.logout}>
                        <LogoutButton/>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

const imgWidth = 30;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99,
    },
    drawer: {
        position: 'absolute',
        top: 125,
        right: 0,
        bottom: Platform.OS === 'ios' ? 74 : 99,
        width: drawerWidth,
        padding: 20,
        paddingTop: 50,
        zIndex: 100,
    },
    drawerPress: {
        paddingVertical: 5,
        backgroundColor: 'transparent'
    },
    drawerItem:{
        borderRadius: 18,
        width: drawerWidth*0.85,
        height: 50,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    drawerText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        height: imgWidth,
        width: imgWidth,
        margin: 10,
        
    },
    logout: {
        position: 'absolute',
        bottom: 10,
        right: 17,
    }
});