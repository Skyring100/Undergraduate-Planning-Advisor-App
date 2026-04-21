import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserProfileByID, getAllCheckedOffBy} from "../../services/userService";
import {Checkbox} from 'expo-checkbox';
import {StyleSheet, Text, View} from 'react-native';
import { useState, useEffect, } from 'react';
import {useThirdColour, useFirstColour, useThemeText} from "../../contexts/ThemeContext";

export default function CourseCompletedButton({course}) {
    const [isChecked, setChecked] = useState(false);
    const thirdColour = useThirdColour();
    const checkedColour = useFirstColour();
    const uncheckedColour = useThemeText();

    useEffect(() => {
        const checkAuto = async () => {
            const studentID = await AsyncStorage.getItem("student_id");
            const allChecked = (await getAllCheckedOffBy(studentID)).data;
            console.log("got to checking time");
            console.log(allChecked);
            if (allChecked.includes(course)) {
                setChecked(true);
                console.log("checked off the box for: "+course);
            }
        };
        checkAuto();
    }, []);

    return (
        <View style={[styles.container]}>
            <Checkbox 
                style={styles.checkbox}
                value={isChecked}
                onValueChange={(val) => {
                    setChecked(val);
                    handleCourseCompletion(val);
                }}
                color={isChecked ? checkedColour.backgroundColor : uncheckedColour.color}
            />
        </View>
    );
}


const handleCourseCompletion = (val) => {
    console.log(val);
};

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
