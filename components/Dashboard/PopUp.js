/*Pop-up that will be used throughout the app to explain functionality or the layout.*/
import React, { Component, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';


export default function PopUp({children}){
    const [modalVisible, setModalVisible] = useState(false);
    // const children = ({props: {}, children: null});
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed!');
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        {/* The first thing is being able to do it, custom text will be the next step */}
                        <Text>
                            {children}
                        </Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </Modal>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.textStyle}>?</Text>
                </Pressable>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  '#dfdfdf',
        opacity: 0.9,
    },
    button: {
        borderRadius: 40,
        // width: 15,
        padding: 5,
        // 
    },
    buttonOpen: {
        width: 40,
        backgroundColor: '#078d6e',
    },
    buttonClose: {
        width: 50,
        marginTop: 35,
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        // margin: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});