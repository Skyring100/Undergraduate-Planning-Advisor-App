import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TouchableWithoutFeedback } from "react-native";
import React, { useCallback, useRef, useState} from "react";
import { useThemeText, useFirstColour, useThemeBackground } from "../../contexts/ThemeContext";

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
    const onSelect = useCallback((item) =>{
        setValue(item);
        setIsOpen(false);
    }, [])
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
});