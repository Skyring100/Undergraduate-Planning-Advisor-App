import { API_BASE_URL, getBaseRequestHTTP } from './api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllDegreePlans = async () => {
    const url = `${API_BASE_URL}/degree_plan/all`;
    const token = await AsyncStorage.getItem('authToken');
    console.log(url);
    const fetchReq = getBaseRequestHTTP('GET', token);
    const response = await fetch(url, fetchReq);
    const data = await response.json();
    console.log(data);

    return data;
};

export const addCourseToDegreePlan = async (degreePlanID, year, semester, course) => {
    try{
        const url = `${API_BASE_URL}/degree_plans/addCourse`;
        console.log(url);
        const token = await AsyncStorage.getItem('authToken');
        const fetchReq = getBaseRequestHTTP('POST', token);
        fetchReq['body'] = JSON.stringify({
                degree_plan_id : degreePlanID,
                year : year,
                semester_id : semester,
                course_id : course
        });
        const response = await fetch(url, fetchReq);
        const data = await response.json();
        console.log(data);

        return {success: true, data};
    } catch (error) {
            console.error('Error adding course to degree plan:', error);
            return {success: false, data: null};
    }
};

export const createDegreePlan = async (degreePlanName, studentID, degreeID) => {
    try{
        const url = `${API_BASE_URL}/degree_plans/create`;
        console.log(url);
        const token = await AsyncStorage.getItem('authToken');
        const fetchReq = getBaseRequestHTTP('POST', token);
        fetchReq['body'] = JSON.stringify({
                degree_plan_name : degreePlanName,
                student_id : studentID,
                degree_id: degreeID
        });
        const response = await fetch(url, fetchReq);
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
        const url = `${API_BASE_URL}/degree_plans/${studentID}`;
            console.log(url);
            const token = await AsyncStorage.getItem('authToken');
            const fetchReq = getBaseRequestHTTP('GET', token);
            const response = await fetch(url, fetchReq);
            const data = await response.json();
            console.log(data);
            return {success: true, data};
        } catch (error) {
            console.error('Error getting degree plan:', error);
            return {success: false, data: null};
        }
};

