import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import React, { useState} from "react";
import { useThemeText, useFirstColour, useThemeBackground } from "../../contexts/ThemeContext";

export default function DropdownList(){
    const [isOpen, setIsOpen] = useState(false);
    const themeText = useThemeText();
    const firstColour = useFirstColour();
    const themeBg = useThemeBackground();

    return (
        <View>
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={[styles.dropdownButton, firstColour]}>
                <Text style={[styles.text, themeText]}>Default Planner 1</Text>
                <Text style={[styles.text, themeText]}>{isOpen ? " ▲ " : " ▼ "}</Text>
            </TouchableOpacity>
            {isOpen && (
                <FlatList
                    data={['Create New Planner']}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={[styles.dropdownOption, themeBg]}>
                            <Text style={[styles.text, themeText]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style = {styles.seperator}/>}
                    keyExtractor={(item) => item}
                />

            )}
        </View>
    );
}

const styles = StyleSheet.create({
    seperator: {
        height: 5,
    },
    text: {
        fontSize: 20,
    },
    dropdownOption: {
        height: 40,
        justifyContent: 'center',
    },
    dropdownButton: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 5,
    }
});