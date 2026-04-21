import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { borderColour, useFirstColour, useThemeText } from '../../contexts/ThemeContext';

export default function AddButton(props) {
    const themeText = useThemeText();
    const firstColour = useFirstColour();

    return (
        <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
            <View style={[styles.addButton, 
                    {height: props.height, 
                    width: props.width, 
                    borderColor: props.borderColour, 
                    borderWidth: props.borderWidth,
                    backgroundColor: props.backgroundColor,
                    opacity: props.opacity,
                    left: props.left,
                    right:props.right,
                    marginRight: props.marginRight,
                    marginLeft: props.marginLeft,
                    marginHorizontal: props.marginHorizontal,
                    marginTop: props.marginTop,
                    padding: props.padding,
                    }]}>
                <Text style={[styles.addButtonText, {color: props.color} ]}>{props.title}</Text>
            </View>
            
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    addButton: {
        padding: 5,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
    },
    addButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: -4,
    },
});