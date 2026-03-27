import { API_BASE_URL } from './api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllCourses = async () => {
    const url = `${API_BASE_URL}/courses/all`;
    await AsyncStorage.getItem('authToken')
    console.log(url)
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