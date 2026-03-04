import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View, Pressable } from 'react-native';
import { useThemeStore, mainDark, mainLight, fourthLight, borderColour} from '../../contexts/ThemeContext';
import React, { useState } from 'react';
import OutlinedText from '@kdn0325/react-native-outlined-text';
import possibleCourses from '../../data/possible_courses.json'
import completedCourses from '../../data/completed_courses.json'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const screenHeight = Dimensions.get('window').height;
const buttonHeight = screenHeight *0.27;
const buttonWidth = buttonHeight;//screenWidth * 0.60;
const chartSize = buttonHeight-10;

export default function EvaluatorButton() {
    const navigation = useNavigation();
    const { isDarkMode, indexColour } = useThemeStore();
    
    const pieChartPercent = (completedCourses.length/possibleCourses.length)*100;
    //const [percentage, setPercentage] = useState(pieChartPercent+"%");
    

    const handlePress = () => {
        navigation.navigate('Evaluator',{})
    };
    
    return (
        <TouchableOpacity
            style={[styles.button, 
                {backgroundColor: isDarkMode ? borderColour[indexColour] : mainDark[indexColour],
                    borderColor: isDarkMode ? borderColour[indexColour] : mainDark[indexColour]}]}
            onPress={handlePress}
            activeOpacity={1}
        >   
                <AnimatedCircularProgress
                    size={chartSize}
                    width={chartSize/2}
                    fill={pieChartPercent}
                    tintColor={isDarkMode ? mainDark[indexColour] : mainLight[indexColour]}
                    backgroundColor={isDarkMode ? borderColour[indexColour] : mainDark[indexColour]}
                    rotation={0}
                    duration={1500}
                />
            <View pointerEvents="none" style = {{position: 'absolute'}}>
                
                <OutlinedText
                    text={' Evaluator '}
                    color={isDarkMode ? fourthLight[indexColour] : '#ffffff'}
                    fontSize={30}
                    fontWeight={'500'}
                    outlineColor={'#000000'}
                    shadowLine={3}
                />
            </View>
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
        borderColor: "#000000",
        borderWidth: 5,
        padding: 0,
        //overflow: 'hidden',
    },
    buttonText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});
