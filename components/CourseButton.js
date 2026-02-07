import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Course } from '../data_models/Course';


export default function CourseButton({course}) {
    const handlePress = () => {
        if (course != null){
            alert(course.id + ": "+course.name +"\n"+course.desc)
        }else{
            alert("No course data")
        }
    }

    const buttonText = (course != null) ? course.id : "----";

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    );
}




const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#035642',
        width: 100,
        height: 45,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});