import { View, TextInput, Pressable, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TouchableWithoutFeedback } from "react-native";
import React, { useCallback, useEffect, useRef, useState} from "react";
import { useThemeText, useFirstColour, useThemeBackground, useThemeShaded } from "../../contexts/ThemeContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { createDegreePlan, getDegreePlanByID } from "../../services/degreePlannerService";
import { getUserProfileByID } from "../../services/userService";
import { getAuth } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function DropdownList({onPlanSelect}){
    const [isOpen, setIsOpen] = useState(false);
    const themeText = useThemeText();
    const firstColour = useThemeShaded();
    const themeBg = useThemeBackground();
    const [planners, setPlanners] = useState([]);
    const [studentId, setStudentId] = useState(null);
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

    const onSelect = useCallback((item, planData) =>{
        setValue(item);
        setIsOpen(false);
        
            //grab data from database for specific planner and update planner screen
            onPlanSelect && onPlanSelect(planData)
        
    })
    console.log("Planners OG:")
    console.log(planners);

    const createPlanner = async (textInput) => {
        try{
            const planID = `local_${Date.getTime()}`;
            const newPlan = {degree_ids: [], years:[]};
            await AsyncStorage.setItem(`degree_plan_${planID}`, JSON.stringify(newPlan));
            
            const newPlanEntry = {degree_plan_name: textInput, degree_plan_id: planID};
            console.log("Planners create planner:")
            console.log(planners);
            setPlanners(prev => [...prev, newPlanEntry]);
            setValue(textInput);
            setVisible(false);
        } catch (e){
            console.error('Failed to create planner: ', e);
        }
        
    }

    const [textInput, setTextInput] = useState('Planner ' + (planners.length + 1));

    useEffect(() => {
        const fetchData = async () => {
            const uid = await AsyncStorage.getItem("student_id");
            if(!uid){
                console.error('No logged in user');
                return;
            }

            const profile = await getUserProfileByID(uid);

            if(profile.success) {
                const sid = profile.data.student_id;
                setStudentId(sid);
                const result = await getDegreePlanByID(sid);
                console.log("Planners use effect:")
                console.log(planners);
                if(result.success) {
                    setPlanners(result.data.data);
                }
            }
        };
        fetchData();
    }, []);


    return (
        <View ref={dropdownRef}>
            <TouchableOpacity 
                onPress={isOpen? toggleDropdown : openDropdown} 
                activeOpacity={0.8}
                style={[styles.dropdownButton, firstColour]}
            >
                <Text style={[styles.text, themeText]}>{value || "Create New Planner"}</Text>
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
                            style={[styles.textInput, themeText]}
                            onChangeText={setTextInput}/>
                        <Pressable onPress={() => createPlanner(textInput)} style={[{padding: 10, borderRadius: 5}, firstColour]}>
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
                                data={planners}
                                keyExtractor={(item) => (item.degree_plan_id)}
                                renderItem={({ item }) => (
                                    <TouchableOpacity 
                                        activeOpacity={0.8} 
                                        style={[styles.dropdownItem, themeBg]}
                                        onPress={() => onSelect(item.degree_plan_name, item)}>
                                        <Text style={[styles.text, themeText]}>{item.degree_plan_name}</Text>
                                    </TouchableOpacity>
                                )}
                                ItemSeparatorComponent={() => <View style = {styles.seperator}/>}
                                ListFooterComponent={() => 
                                    <TouchableOpacity 
                                        activeOpacity={0.8} 
                                        style={[styles.dropdownItem, themeBg]}
                                        onPress={(e) => {
                                            e.stopPropagation();
                                            setIsOpen(false);
                                            setVisible(true);}}>
                                        <Text style={[styles.text, themeText]}>Create New Planner</Text>
                                    </TouchableOpacity>}
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
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 18,
       
    },
    dropdownOptions: {
        position: 'absolute',
        //top: 53,
        width: '84%',
        padding: 10,
        left: 15,
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
