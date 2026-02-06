import { Header } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';


export default function AppHeader() {
    return (
        <Header title='Gradian' style={styles.header}/>
    );
}

const styles = StyleSheet.create ({
    header: {
        color: '#035642',
        tintColor: '#fff',
    }
});