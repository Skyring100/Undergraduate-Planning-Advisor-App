import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { borderColour, useFirstColour, useThemeText } from '../../contexts/ThemeContext';

export default function AddButton(props) {
    const themeText = useThemeText();
    const firstColour = useFirstColour();

    return (
        <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
            <View style={[styles.addButton, firstColour, 
                    {height: props.height, width: props.width, borderColor: props.borderColour, borderWidth: props.borderWidth}]}>
                <Text style={[styles.addButtonText, themeText, ]}>{props.title}</Text>
            </View>
            
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    addButton: {
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: -4,
    },
});