// progress bar
// will be able to set an arbitrary fill percentage

import {View, StyleSheet, Text, ScrollView, useWindowDimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useThemeStore, useThemeBackground, useFirstColour, useFourthColour, isDarkMode} from '../../contexts/ThemeContext';
import Animated, {SlideInLeft, Easing} from "react-native-reanimated";

export default function ProgressBar({full}) {
    const themeBg = useThemeBackground();
    const {isDarkMode, indexColour} = useThemeStore();
    const first = useFirstColour();
    const fourth = useFourthColour();
    return (
        <View style={[styles.shell,
                isDarkMode ? first : fourth,
        ]}>
            <Animated.View style={[styles.filling, {width: full + "%"},
                isDarkMode ? fourth : first, 
            ]}
            entering={SlideInLeft.duration(2000).easing(Easing.out(Easing.exp))}
            >
                <Text>
                    {/* unsure why this is what makes the height work but it does */}
                </Text> 
            </Animated.View>
        </View>
    );
}

const styles=StyleSheet.create({
    shell: {
        margin: "5",
        width: "320",
        height: "10",
        overflow: "hidden",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 99,
        flexShrink: 0,
    },
    filling: {
        borderRadius: 99,
    },
})
