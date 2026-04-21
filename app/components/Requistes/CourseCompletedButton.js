import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserProfileByID, getAllCheckedOffBy, checkCourse, uncheckCourse} from "../../services/userService";
import { getDegreeByID } from '../../services/degreeService';
import {Checkbox} from 'expo-checkbox';
import {StyleSheet, Text, View} from 'react-native';
import { useState, useEffect, } from 'react';
import {useThirdColour, useFirstColour, useThemeText} from "../../contexts/ThemeContext";

export default function CourseCompletedButton({course}) {
    const [isChecked, setChecked] = useState(false);
    const thirdColour = useThirdColour();
    const checkedColour = useFirstColour();
    const uncheckedColour = useThemeText();
    const [studentID, setStudentID] = useState("");
    const [degreeID, setDegreeID] = useState(0);

    useEffect(() => {
        const checkAuto = async () => {
            let x = await AsyncStorage.getItem("student_id");
            setStudentID(x);
            let y = (await getUserProfileByID(x)).data.current_degree_id;
            setDegreeID(y);
            const allChecked = (await getAllCheckedOffBy(x)).data;
            if (allChecked.includes(course)) {
                setChecked(true);
                console.log("checked off the box for: "+course);
            }
        };
        checkAuto();
    }, []);

    const handleCourseCompletion = (val) => {
        console.log(val);
        console.log(studentID);
        console.log(degreeID);
        console.log(course);
        if (val) checkCourse(studentID, degreeID, course);
        else uncheckCourse(studentID, degreeID, course);
    };
     
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
