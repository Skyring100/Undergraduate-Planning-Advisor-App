import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View, Pressable } from 'react-native';
import { useThemeStore, useFirstColour, useZerothColour, mainDark, mainLight, useThemeText, borderColour} from '../../contexts/ThemeContext';
import React, { useState } from 'react';
import OutlinedText from '@kdn0325/react-native-outlined-text';
import possibleCourses from '../../data/possible_courses.json'
import completedCourses from '../../data/completed_courses.json'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const screenHeight = Dimensions.get('window').height - 110;
const buttonHeight = screenHeight *0.25;
const buttonWidth = buttonHeight;//screenWidth * 0.60;
const chartSize = buttonHeight;

export default function EvaluatorButton() {
    const navigation = useNavigation();
    const textColour = useThemeText();
    const firstColour = useFirstColour().backgroundColor;
    const zerothColour = useZerothColour().backgroundColor;
    
    const pieChartPercent = (completedCourses.length/possibleCourses.length)*100;
    //const [percentage, setPercentage] = useState(pieChartPercent+"%");
    

    const handlePress = () => {
        navigation.navigate('Evaluator',{})
    };
    
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
            activeOpacity={1}
        >   
                <AnimatedCircularProgress
                    size={chartSize}
                    width={30}
                    fill={pieChartPercent}
                    tintColor={firstColour}
                    backgroundColor={zerothColour}
                    rotation={0}
                    duration={1500}
                    lineCap='round'
                >
                    {
                        (fill) => (
                        <Text style={[styles.buttonText, textColour]}>
                            { pieChartPercent.toFixed(0) }%
                        </Text>
                        )
                    }               
                </AnimatedCircularProgress>
            {/* <Text style={[styles.buttonText, {color: isDarkMode ? fourthLight[indexColour] : mainDark[indexColour]}]}>Evaluator</Text> */}  
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: buttonHeight/2,
        marginTop: buttonHeight*0.08,
        width: buttonWidth,
        height: buttonHeight,
        borderWidth: 5,
        padding: 0,
        backgroundColor: 'transparent',
    },
    buttonText: {
        fontSize: buttonHeight*0.20,
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Bold',
    },
});
