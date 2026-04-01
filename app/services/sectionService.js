import { API_BASE_URL } from './api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getSectionsForCourse = async (courseID) => {
    const url = `${API_BASE_URL}/section/${courseID}`;
    console.log(url);
    const token = await AsyncStorage.getItem('authToken');
    const response = await fetch(url, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    console.log(data);

    return data;
};

export const getSectionsOnDayOfWeek = async (dow) => {
    const url = `${API_BASE_URL}/sections/dow/${dow}`;
    console.log(url);
    const token = await AsyncStorage.getItem('authToken');
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    console.log(data);

    return data;
};

export const addSections = async (section) => {
    const url = `${API_BASE_URL}/sections/${section}`;
    console.log(section);
    const token = await AsyncStorage.getItem('authToken');
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    console.log(data);

    return data;
}

