import { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions } from 'react-native';
import { useThemeStore, useThemeBackground, useFirstColour, useSecondColour, useThirdColour, useFourthColour} from '../../contexts/ThemeContext';
import { useTheme } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";

export default function FlickSwitch({isActivated, height, width, onActivationChange}) {
    const themeBg = useThemeBackground();
    const thirdBg = useSecondColour();
    const marginLeft = useSharedValue(0);

    useEffect(() => {
        marginLeft.value = withTiming(!isActivated ? "0" : (width - height), 
            {duration: 250, easing: Easing.out(Easing.cubic)});
    }, [isActivated]);

    const animatedStyle = useAnimatedStyle(() => {
        console.log(marginLeft.value);
        return {
            marginLeft: marginLeft.value,
        };
    });
    return (
        <View style={{flexDirection: "row", height: height || 20, width: width || 50,  ...themeBg, borderRadius: height, padding: 3,}}>
            <Animated.View style={[animatedStyle, {height: height - 6, width: height - 6, ...thirdBg, borderRadius: height}]}>
            </Animated.View>
        </View>
    );
}
