import {Checkbox} from 'expo-checkbox';
import {StyleSheet, Text, View} from 'react-native';
import { useState } from 'react';
import {useThirdColour, useFirstColour, useThemeText} from "../../contexts/ThemeContext";

export default function CourseCompletedButton() {
    const [isChecked, setChecked] = useState(false);
    const thirdColour = useThirdColour();
    const checkedColour = useFirstColour();
    const uncheckedColour = useThemeText();

    return (
        <View style={[styles.container]}>
            <Checkbox 
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? checkedColour.backgroundColor : uncheckedColour.color}
            />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    checkbox: {
        borderRadius: 5,
        width: 20,
        height: 20,
        margin: 2,
    },
})
