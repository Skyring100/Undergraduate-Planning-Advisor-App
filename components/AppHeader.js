import { Header } from '@react-navigation/elements';
import { StyleSheet, Image, View } from 'react-native';

//<Header title='Gradian' style={styles.header}/>

export default function AppHeader() {
    return (
        <View style={styles.header}>
            <Image style={{justifyContent:'center', alignItems:'center', marginTop: 35}} source={require('../assets/favicon.png')}/>
        </View>
        
    );
}

const styles = StyleSheet.create ({
    header: {
        backgroundColor: '#035642',
        tintColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});