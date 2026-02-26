// progress bar
// will be able to set an arbitrary fill percentage

import {View, StyleSheet, Text, ScrollView, useWindowDimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useThemeStore, mainDark, mainLight, fourthLight, borderColour, isDarkMode} from '../contexts/ThemeContext';

export default function ProgressBar({full}) {
    return (
        <View style={styles.shell}>
            <View style={[styles.filling, {width: full}]}>
                <Text>
                    {/* unsure why this is what makes the height work but it does */}
                </Text> 
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    shell: {
        backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
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
        backgroundColor: mainDark[0],
        borderRadius: 99,
    },
})
