import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View, Pressable } from 'react-native';
import { useThemeStore, mainDark, mainLight, fourthLight, borderColour} from '../../contexts/ThemeContext';
import { useState } from 'react';
import OutlinedText from '@kdn0325/react-native-outlined-text';
import possibleCourses from '../../data/possible_courses.json'
import completedCourses from '../../data/completed_courses.json'
import PieChart from "react-native-pie-chart";

const screenHeight = Dimensions.get('window').height;
const buttonHeight = screenHeight *0.27;
const buttonWidth = buttonHeight;//screenWidth * 0.60;


export default function EvaluatorButton() {
    const navigation = useNavigation();
    const { isDarkMode, indexColour } = useThemeStore();
    
    const pieChartPercent = (completedCourses.length/possibleCourses.length)*100;
    //const [percentage, setPercentage] = useState(pieChartPercent+"%");

    const handlePress = () => {
        navigation.navigate('Evaluator',{})
    };
    
    return (
        <Pressable
            style={[styles.button, {borderColor: isDarkMode ? borderColour[indexColour] : mainDark[indexColour]}]}
            onPress={handlePress}
            //activeOpacity={1}
        >   
            <PieChart
                widthAndHeight={buttonHeight*0.96}
                series={[
                    {   value: 100-parseFloat(pieChartPercent), 
                        color: isDarkMode ? borderColour[indexColour] : mainDark[indexColour]
                    },
                    {   value: parseFloat(pieChartPercent), 
                        color: isDarkMode ? mainDark[indexColour] : mainLight[indexColour] 
                    },
                    
                ]}
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
        </Pressable>
    );
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 180,
        marginTop: buttonHeight*0.08,
        width: buttonWidth,
        height: buttonHeight,
        borderColor: "#000000",
        borderWidth: 5,
    },
    buttonText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});
