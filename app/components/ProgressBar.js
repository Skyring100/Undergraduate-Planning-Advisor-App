// progress bar
// will be able to set an arbitrary fill percentage

import {View, StyleSheet, Text, ScrollView, useWindowDimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useThemeStore, useThemeBackground, mainDark, mainLight, fourthLight, borderColour, isDarkMode} from '../contexts/ThemeContext';

export default function ProgressBar({full}) {
    const themeBg = useThemeBackground();
    const {isDarkMode, indexColour} = useThemeStore();
    return (
        <View style={{...styles.shell,
            backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
        }}>
            <View style={[styles.filling, {width: full, 
                backgroundColor: isDarkMode ? mainLight[indexColour] : mainDark[indexColour],
            }]}>
                <Text>
                    {/* unsure why this is what makes the height work but it does */}
                </Text> 
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    shell: {
        marginTop: "10",
        marginBottom: "10",
        width: "350",
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
