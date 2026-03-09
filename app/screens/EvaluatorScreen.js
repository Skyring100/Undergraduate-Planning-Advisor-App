/*Evaluator page will show the degree evaluation details.*/


import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, StyleSheet, Dimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../contexts/UserContext';
import BackButton from '../components/BackButton';
import ProgressBar from '../components/ProgressBar';
import possibleCourses from '../data/possible_courses.json'
import completedCourses from '../data/completed_courses.json'
import {useThemeText, useThemeBackground} from "../contexts/ThemeContext";
import {useWindowDimensions} from "react-native";
import AddCourseButton from "../components/AddCourseButton.js";

export default function EvaluatorScreen() {
    const navigation = useNavigation();

    const {setUser} = useUserStore();

    const themeText = useThemeText();
    const themeBg = useThemeBackground();
    const {width} = useWindowDimensions();

    // TODO: make the user context supply these next few variables
    const progressBarPercent = (completedCourses.length/possibleCourses.length)*100;
    const [percentage, setPercentage] = useState(progressBarPercent+"%");

    // take all the courses the user has every prerequisite for completed
    const nextCourses = possibleCourses.filter(
                                course => course.prereqs.map(prereq => (
                                    completedCourses.map(course => course.id).includes(prereq)
                                    )
                                ).every(Boolean) && course.prereqs.length != 0
                                && !completedCourses.map(other => other.id).includes(course.id)
                            );
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, themeBg, {width: width}]}>
                <BackButton/>
                <Text style={[styles.titleText, themeText]}>
                    Let's see where you're at
                </Text>
        
                <ProgressBar full={percentage}/>
                <View style={styles.variableSizeTextHolder}>
                    <Text style={themeText}>You're </Text>
                    <Text style={[styles.bigPercentage, themeText]}>{percentage}</Text> 
                    <Text style={themeText}> of the way to your degree!</Text>
                </View>
                <Text style={{...themeText, textAlign: "center", paddingBottom: 10,}}>{
                    nextCourses.length == 0 ? "Looks like none of your courses have a next step."
                    : "Now try tackling these courses here:"
                }</Text>
                <View style={styles.listContainer}>
                        {
                            nextCourses.map(course => (
                                <View key={course.id} style={{
                                    width: width * 0.8,
                                    alignItems: "left",
                                    borderWidth: 1,
                                    borderColor: "#777777",
                                    padding: 5,
                                    borderRadius: 10,
                                }}>
                                {/* edit this JSX to change how the courses are displayed */}
                                    <View style={{flexGrow: 1, alignItems: "center", justifyContent: "space-between",}}>
                                        <Text style={{color: "#777777", fontWeight: 600, fontSize: 12,}}>
                                            {course.id}
                                        </Text>
                                        <Text style={[styles.courseTitle, themeText]}>
                                            {course.title}
                                        </Text>
                                        <Text style={{color: "#777777", fontWeight: 600, fontSize: 12,}}>
                                            Because you took: {(() => {
                                                // yet again another huge line of code that makes things pretty
                                                // basically turns a list of prereq IDs into other stuff
                                                // TODO: make this work with how prereqs are pulled from the database
                                                // probably some functional shenanigans required
                                                const name = course.prereqs.join(", ");
                                                console.log(name);
                                                const commas = name.match(",");
                                                if (commas === null) return name;
                                                if (commas.length == 1) {
                                                    return name.replace(", ", " and ");
                                                } else if (commas.length > 1) {
                                                    const ind = name.lastIndexOf(", ");
                                                    const before = name.slice(0, ind);
                                                    const after = name.slice(ind + 2);
                                                    return before + ", and " + after;
                                                }
                                            })()}
                                        </Text>
                                        <Text style={{flexGrow: 1, paddingTop: 5, ...themeText}}>
                                            {course.desc}
                                        </Text>
                                        <AddCourseButton name={course.id + ": " + course.title} />
                                    </View>
                               </View>
                                )
                            )
                        }
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        margin: 'auto',
    },
    yearHeader:{
        color: '#060a03ff',
        fontWeight: 'bold',
        fontSize: 25,
        backgroundColor: '#3cceac',
        width: '100%',
        textAlign: 'center'
    },
    semesterHeader:{
        color: '#ffffffff',
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: '#078d6e',
        textAlign: 'center',
        borderRightWidth: 1,
        borderLeftWidth: 1
    },
    semesterSection: {
        width: '50%'
    },
    titleText: {
        textAlign: "center",
        color: "black",
        fontWeight: "200",
        fontSize: 30,
        width: "100%",
    },
    variableSizeTextHolder: {
        flexDirection: "row",
        alignItems: "center",
        flexShrink: 1,
    },
    bigPercentage: {
        fontWeight: 300,
        fontSize: 23,
    },
    courseTitle: {
        lineHeight: "15",
        fontWeight: 300,
        fontSize: 20,
    }
});
