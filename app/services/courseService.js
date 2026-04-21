import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, getBaseRequestHTTP } from './api.js';

export const getAllCourses = async () => {
    const url = `${API_BASE_URL}/courses/all`;
    const token = await AsyncStorage.getItem('authToken');
    
    const fetchReq = getBaseRequestHTTP('GET', token);
    const response = await fetch(url, fetchReq);

    const data = await response.json();

    return data;
};

export const getCourseById = async (id) => {
    const url = `${API_BASE_URL}/courses/id/${id}`;
    const token = await AsyncStorage.getItem('authToken');
    const fetchReq = getBaseRequestHTTP('GET', token);
    const response = await fetch(url, fetchReq);

    const data = await response.json();

    return data;
};

export const getCoursesByDepartment = async (department) => {
    const url = `${API_BASE_URL}/courses/department/${department}`;
    const token = await AsyncStorage.getItem('authToken');

    const fetchReq = getBaseRequestHTTP('GET', token);
    const response = await fetch(url, fetchReq);


    const data = await response.json();

    return data;
};

export const getDepartmentCodes = async () => {
    const url = `${API_BASE_URL}/courses/department-codes`;
    const token = await AsyncStorage.getItem('authToken');

    const fetchReq = getBaseRequestHTTP('GET', token);
    const response = await fetch(url, fetchReq);


    const data = await response.json();

    return data;
};


export const checkPrereqs = async (completed, target) => {
    const completedString = completed.join(",");
    const url = `${API_BASE_URL}/courses/check/${completedString}/${target}`;

    const token = await AsyncStorage.getItem('authToken');
    const fetchReq = getBaseRequestHTTP('GET', token);
    const response = await fetch(url, fetchReq);

    const data = await response.json();
    return data;
};

export const prereqString = async (completed, target) => {
    const completedString = completed.join(",");
    const url = `${API_BASE_URL}/courses/string/${completedString} /${target}`;

    const token = await AsyncStorage.getItem('authToken');
    const fetchReq = getBaseRequestHTTP('GET', token);
    const response = await fetch(url, fetchReq);

    const data = await response.json();
    return data;
};

export const getPrereqsOf = async (target) => {
    const url = `${API_BASE_URL}/courses/allprereqs/${target}`;

    const token = await AsyncStorage.getItem('authToken');
    const fetchReq = getBaseRequestHTTP('GET', token);
    const response = await fetch(url, fetchReq);

    const data = await response.json();
    return data;
};
