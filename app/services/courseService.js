import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './api.js';

export const getAllCourses = async () => {
    const url = `${API_BASE_URL}/courses/all`;
    const token = await AsyncStorage.getItem('authToken');
    const response = await fetch(url, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
    });

    const data = await response.json();

    return data;
};

export const getCourseById = async (id) => {
    const url = `${API_BASE_URL}/courses/${id}`;
    console.log(`asking for id ${id}`);
    const token = await AsyncStorage.getItem('authToken');
    const response = await fetch(url, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
    });

    const data = await response.json();

    return data;
};

export const checkPrereqs = async (completed, target) => {
    const completedString = completed.join(",");
    const url = `${API_BASE_URL}/courses/check/${completedString}/${target}`;
    const matches = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': "application/json"
        },
    }
    ).then(response => response.json()).data;
    return matches;
}

export const getPrereqsOf = async (target) => {
    const url = `${API_BASE_URL}/courses/allprereqs/${target}`;
    const all = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': "application/json"
        }
    }
    ).then(response => response.json());
    const ret = all.data;
    return ret;
}
