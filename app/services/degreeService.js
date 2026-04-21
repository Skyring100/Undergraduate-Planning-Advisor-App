import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, getBaseRequestHTTP } from './api.js';

export const createDegree = async (name, isMinor, courseReqs, creditReqs) => {
    try {
        const url = `${API_BASE_URL}/degrees/create`;
        console.log(url)
        const token = await AsyncStorage.getItem('authToken');
        const fetchReq = getBaseRequestHTTP('POST', token);
        fetchReq['body'] = JSON.stringify({
            name: name,
            is_minor: isMinor,
            course_reqs: courseReqs,
            credit_reqs: creditReqs
        });
        const response = await fetch(url, fetchReq);

        const data = await response.json();
        console.log(data);

        return { success: true, data };
    } catch (error) {
        console.error('Error creating degree:', error);
        return { success: false, data: null };
    }
};

export const editDegree = async (degreeid, name, isMinor, courseReqs, creditReqs) => {
    try {
        const url = `${API_BASE_URL}/degrees/create`;
        console.log(url)
        const token = await AsyncStorage.getItem('authToken');
        const fetchReq = getBaseRequestHTTP('POST', token);
        fetchReq['body'] = JSON.stringify({
            degree_id: degreeid,
            name: name,
            is_minor: isMinor,
            course_reqs: courseReqs,
            credit_reqs: creditReqs
        });
        const response = await fetch(url, fetchReq);

        const data = await response.json();
        console.log(data);

        return { success: true, data };

    } catch (error) {
        console.error('Error creating degree:', error);
        return { success: false, data: null };
    }
}

export const getDegreeByID = async (degreeID) => {
    try {
        console.log("passing "+degreeID+" to the backend");
        const url = `${API_BASE_URL}/degrees/${degreeID}`;
        const token = await AsyncStorage.getItem('authToken');
        const fetchReq = getBaseRequestHTTP('GET', token);

        const response = await fetch(url, fetchReq);
        const data = await response.json();

        return { success: true, data };
    } catch (error) {
        console.error('Error getting degree:', error);
        return { success: false, data: null };
    }
};

export const getAllDegrees = async () => {
    const url = `${API_BASE_URL}/degrees/all`;
    const token = await AsyncStorage.getItem('authToken');
    
    const fetchReq = getBaseRequestHTTP('GET', token);
    const response = await fetch(url, fetchReq);

    const data = await response.json();

    return data.data ?? [];
};