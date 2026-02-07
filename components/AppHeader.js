import { Header } from '@react-navigation/elements';
import { StyleSheet, Image, View, Text, Button } from 'react-native';

//<Header title='Gradian' style={styles.header}/>

export default function AppHeader() {
    return (
        <View style={styles.header}>
            <Button title='Help Icon' onPress={()=> {alert("congrats")}}/>
            <Text style={styles.headerText}>Gradian</Text>
            <Image style={{justifyContent:'center', alignItems:'center', marginTop: 35, marginBottom: 5}} source={require('../assets/favicon.png')}/>
            <Button title='Settings' onPress={()=> {alert("congrats")}}/>
        </View>
        
    );
}

const styles = StyleSheet.create ({
    header: {
        backgroundColor: '#035642',
        tintColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 28,
        marginTop: 30,
        marginRight: 10,
    }
});