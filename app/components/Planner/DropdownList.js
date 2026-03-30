import { View, TextInput, Pressable, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TouchableWithoutFeedback } from "react-native";
import React, { useCallback, useRef, useState} from "react";
import { useThemeText, useFirstColour, useThemeBackground } from "../../contexts/ThemeContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function DropdownList(){
    const [isOpen, setIsOpen] = useState(false);
    const themeText = useThemeText();
    const firstColour = useFirstColour();
    const themeBg = useThemeBackground();
    const data = ['Default Planner 1', 'Default Planner 2', 'Create New Planner'];
    const toggleDropdown = useCallback(() => setIsOpen(!isOpen), []);
    const dropdownRef = useRef(null);
    const [top, setTop] = useState(0);
    const openDropdown = () => {
        dropdownRef.current.measure((fx, fy, width, height, px, py) => {
            setTop(py + height);
            setIsOpen(true);
        });
    };
    const [value, setValue] = useState('');
    const [visible, setVisible] = useState(false);

    const onSelect = useCallback((item) =>{
        setValue(item);
        setIsOpen(false);
        if(item === 'Create New Planner'){
            setVisible(true);
        } else {
            //grab data from database for specific planner and update planner screen
        }
    }, [visible])

    return (
        <View ref={dropdownRef}>
            <TouchableOpacity 
                onPress={isOpen? toggleDropdown : openDropdown} 
                activeOpacity={0.8}
                style={[styles.dropdownButton, firstColour]}
            >
                <Text style={[styles.text, themeText]}>{value || "Default Planner 1"}</Text>
                <Text style={[styles.text, themeText]}>{isOpen ? " ▲ " : " ▼ "}</Text>
            </TouchableOpacity>
            <Modal 
                visible={visible} 
                transparent={true} 
                animationType="slide">
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={[styles.modalView, themeBg]}>
                        <TextInput 
                            placeholder="Planner Name" 
                            style={[styles.textInput, themeText]}/>
                        <Pressable onPress={() => setVisible(!visible)} style={[{padding: 10, borderRadius: 5}, firstColour]}>
                            <Text style={themeText}>Create</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {isOpen?(
                <Modal visible={isOpen} transparent animationType="fade">
                    <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
                        <View style={styles.backdrop}>
                            <View style={[styles.dropdownOptions, themeBg, {top: top}]} >
                            <FlatList
                                keyExtractor={(item) => item}
                                data={data}
                                renderItem={({ item }) => (
                                    <TouchableOpacity 
                                        activeOpacity={0.8} 
                                        style={[styles.dropdownItem, themeBg]}
                                        onPress={() => onSelect(item)}>
                                        <Text style={[styles.text, themeText]}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                                ItemSeparatorComponent={() => <View style = {styles.seperator}/>}
                            />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>): null
                }
        </View>
    );
}

const styles = StyleSheet.create({
    seperator: {
        height: 5,
    },
    text: {
        fontSize: 20,
    },
    dropdownItem: {
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    dropdownButton: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    dropdownOptions: {
        position: 'absolute',
        //top: 53,
        width: '100%',
        padding: 10,
        maxHeight: 250, 
    },
    backdrop: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 20,
        width: "100%",
        borderRadius: 5,
    },
});