import { API_BASE_URL, getBaseRequestHTTP } from './api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getSectionsForCourse = async (courseID) => {
    const url = `${API_BASE_URL}/section/${courseID}`;
    console.log(url);
    const token = await AsyncStorage.getItem('authToken');

    const fetchReq = getBaseRequestHTTP('GET', token);
    const response = await fetch(url, fetchReq);
    const data = await response.json();
    console.log(data);

    return data;
};

export const getSectionsOnDayOfWeek = async (dow) => {
    const url = `${API_BASE_URL}/sections/dow/${dow}`;
    console.log(url);
    const token = await AsyncStorage.getItem('authToken');
    const fetchReq = getBaseRequestHTTP('GET', token);
    const response = await fetch(url, fetchReq);

    const data = await response.json();
    console.log(data);

    return data;
};

export const addSections = async (sectionID, sectionDays, sectionStartTime, sectionEndTime, startDate, endDate, sectionBuilding, sectionRoom, sectionProfessor) => {
    const url = `${API_BASE_URL}/sections/create`;
    console.log(sectionID);
    const token = await AsyncStorage.getItem('authToken');

    const fetchReq = getBaseRequestHTTP('POST', token);
    fetchReq['body'] = JSON.stringify({
            course_id: sectionID, 
            days_of_week: sectionDays, 
            start_time: sectionStartTime, 
            end_time: sectionEndTime, 
            start_date: startDate, 
            end_date: endDate, 
            building: sectionBuilding, 
            room_number: sectionRoom, 
            instructor_name: sectionProfessor
        });
    const response = await fetch(url, fetchReq);

    const data = await response.json();
    console.log(data);

    return data;
}

