import { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions } from 'react-native';
import { useThemeStore, mainDark, mainLight, useThemeShaded, useThemeText, useThemeBackground } from '../../contexts/ThemeContext';
import { useTheme } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth - 20;

export default function DarkLightSlider() {
    const { isDarkMode, setIsDarkMode, setIndex, indexColour} = useThemeStore();
    const themeShaded = useThemeShaded();
    const themeBg = useThemeBackground();
    const themeText = useThemeText();

    const data = [
        {"label": "green", "value": 0,},
        {"label": "red", "value": 1,},
        {"label": "blue", "value": 2,},
        {"label": "pink", "value": 3,},
        {"label": "purple", "value": 4,},
        {"label": "yellow", "value": 5,},
        {"label": "orange", "value": 6,},
        {"label": "grey", "value": 7,},
    ];

    const renderItem = (item) => {
        return (
            <View style={{padding: 5}}>
                <Text style={{color: !isDarkMode ? mainDark[item.value] : mainLight[item.value]}}>{item.label}</Text>
            </View>
        );
    }

    const toggleTheme = () => {
        setIsDarkMode(prevTheme => !prevTheme);
    };

    return (
        <View
            style={[styles.button, themeShaded]}
        >
            <Text style={[themeText, styles.buttonText]}>Coloured elements will show as </Text>
            <Dropdown 
                data={data} 
                containerStyle={[themeText, themeBg, {borderColor: themeShaded.backgroundColor, borderWidth: 3, borderRadius: 10, width: 80}]}
                activeColor={themeShaded.backgroundColor}
                style={{flexGrow: 1}}
                selectedTextStyle={{backgroundColor: "#00000000", fontWeight: 600, color: !isDarkMode ? mainDark[indexColour] : mainLight[indexColour]}}
                renderItem={renderItem}
                onChange={item => setIndex(item.value)}
                labelField="label"
                valueField="value"
                value={indexColour}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'flex-start',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        width: buttonWidth,
        height: 45,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
