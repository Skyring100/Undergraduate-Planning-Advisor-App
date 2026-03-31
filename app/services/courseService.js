import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './api.js';

export const getAllCourses = async () => {
    const url = `${API_BASE_URL}/courses/all`;
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
    console.log(data.message);

    return data;
};