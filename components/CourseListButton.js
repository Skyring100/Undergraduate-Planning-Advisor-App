import { TouchableOpacity, Text, StyleSheet } from 'react-native';


export default function CourseListButton({course}) {
    const handlePress = () => {
        if (course.id != null){
            alert(course.id + ": "+course.title +"\n"+course.desc)
        }else{
            alert("No course data")
        }
    }

    const buttonText = (course.id != null) ? course.id : "----";

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
        borderWidth: 1,
        borderBlockColor: '#00000'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        padding: 5
    },
});