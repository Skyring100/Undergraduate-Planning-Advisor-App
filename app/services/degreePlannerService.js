import { API_BASE_URL } from './api.js';
<<<<<<< HEAD
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDegreePlan = async () => {
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
=======

export const createDegreePlan = async (degreePlanName, studentID) => {
    try{
        const url = `${API_BASE_URL}/degrees/create`;
            console.log(url)
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    degree_plan_name : degreePlanName,
                    student_id : studentID
            }),
            });
            const data = await response.json();
            console.log(data);

            return {success: true, data};
        } catch (error) {
            console.error('Error creating degree plan:', error);
            return {success: false, data: null};
        }
    };

export const getDegreePlanByID = async (studentID) => {
    try{
        const url = `${API_BASE_URL}/degreePlans/${studentID}`;
            console.log(url);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            console.log(data);

            return {success: true, data};
        } catch (error) {
            console.error('Error getting degree plan:', error);
            return {success: false, data: null};
        }
    };

>>>>>>> 789787a83c3f9a058436c419a3910b09ed5b562f
