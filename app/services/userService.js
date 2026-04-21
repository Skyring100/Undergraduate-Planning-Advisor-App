import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, getBaseRequestHTTP } from './api.js';

export const getUserProfileByID = async (uid) => {
    try {
        const url = `${API_BASE_URL}/users/profile/${uid}`;

        const token = await AsyncStorage.getItem('authToken');
        const fetchReq = getBaseRequestHTTP('GET', token);
        const response = await fetch(url, fetchReq);

        const data = await response.json();

        if (response.ok && data.success) {
            let ret = {
                success: true,
                data: data.data,
                message: data.message,
            };
            return ret;
        } else {
            return {
                success: false,
                message: data.message || 'Failed to fetch profile. Please try again.',
            };
        }
    } catch (error) {
        console.error('Get profile API error:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
        });
        
        let errorMessage = 'Network error. Please check your connection and try again.';
        
        if (error.message === 'Network request failed') {
            errorMessage = 'Cannot connect to server. Please verify the server is running and accessible.';
        }
        
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const getAllCheckedOffBy = async (uid) => {
    try {
        const url = `${API_BASE_URL}/users/checked/${uid}`;

        const token = await AsyncStorage.getItem('authToken');
        const fetchReq = getBaseRequestHTTP('GET', token);
        const response = await fetch(url, fetchReq);

        const data = await response.json();

        if (response.ok && data.success) {
            let ret = {
                success: true,
                data: data.data,
                message: data.message,
            };
            return ret;
        } else {
            return {
                success: false,
                message: data.message || 'Failed to fetch checked courses. Please try again.',
            };
        }
    } catch (error) {
        console.error('Get checked API error:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
        });
        
        let errorMessage = 'Network error. Please check your connection and try again.';
        
        if (error.message === 'Network request failed') {
            errorMessage = 'Cannot connect to server. Please verify the server is running and accessible.';
        }
        
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const updateFirstName = async (studentID, firstName) => {
  try{
        const url = `${API_BASE_URL}/users/first-name/${studentID}`;
        console.log(url);
        const token = await AsyncStorage.getItem('authToken');
        const fetchReq = getBaseRequestHTTP('PUT', token);
        fetchReq['body'] = JSON.stringify({studentID, firstName});
        const response = await fetch(url, fetchReq);
        
        const data = await response.json();
        console.log(data);

        await AsyncStorage.setItem('first_name', firstName);
        return {success: true, data};
    } catch (error) {
        console.error('Error updating user first name:', error);
        return {success: false, data: null};
    }
}

export const updateLastName = async (studentID, lastName) => {
  try{
        const url = `${API_BASE_URL}/users/last-name/${studentID}`;
        console.log(url);
        const token = await AsyncStorage.getItem('authToken');
        const fetchReq = getBaseRequestHTTP('PUT', token);
        fetchReq['body'] = JSON.stringify({studentID, lastName});
        const response = await fetch(url, fetchReq);
        
        const data = await response.json();
        console.log(data);

        await AsyncStorage.setItem('last_name', lastName);
        return {success: true, data};
    } catch (error) {
        console.error('Error updating user last name:', error);
        return {success: false, data: null};
    }
}

export const addCompletedCourses = async (student_id, courses) => {
    try{
        const url = `${API_BASE_URL}/courses/${student_id}`;

        const token = await AsyncStorage.getItem('authToken');
        const fetchReq = getBaseRequestHTTP('PUT', token);
        fetchReq['body'] = JSON.stringify({courses});
        const response = await fetch(url, fetchReq);
        
        const data = await response.json();

        return {success: true, data};
    } catch (error) {
        console.error('Error adding completed course to user:', error);
        return {success: false, data: null};
    }
};


export const setCurrentUserDegree = async (student_id, degree_id) => {
    try{
        const url = `${API_BASE_URL}/set-degree}`;
        const token = await AsyncStorage.getItem('authToken');
        const fetchReq = getBaseRequestHTTP('PUT', token);
        fetchReq['body'] = JSON.stringify({student_id, degree_id});
        const response = await fetch(url, fetchReq);
        
        const data = await response.json();

        await AsyncStorage.setItem('current_degree_id', degree_id);
        return {success: true, data};
    } catch (error) {
        console.error('Error adding setting current degree for user:', error);
        return {success: false, data: null};
    }
};

export const setCurrentUserDegreePlan = async (student_id, degree_plan_id) => {
    try{
        const url = `${API_BASE_URL}/set-degree-plan}`;
        const token = await AsyncStorage.getItem('authToken');
        const fetchReq = getBaseRequestHTTP('PUT', token);
        fetchReq['body'] = JSON.stringify({student_id, degree_plan_id});
        const response = await fetch(url, fetchReq);
        
        const data = await response.json();

        await AsyncStorage.setItem('current_degree_plan_id', degree_plan_id);
        return {success: true, data};
    } catch (error) {
        console.error('Error adding setting current degree plan for user:', error);
        return {success: false, data: null};
    }
};

export const checkCourse = async (student_id, degree_id, course_id) => {
    try{
        const url = `${API_BASE_URL}/users/check_off`;
        const token = await AsyncStorage.getItem('authToken');
        const fetchReq = getBaseRequestHTTP('PUT', token);
        fetchReq['body'] = JSON.stringify({student_id, degree_id, course_id});
        const response = await fetch(url, fetchReq);
        const data = await response.json();
        return {success: true, data};
    } catch (error) {
        console.error('Error checking off the course:', error);
        return {success: false, data: null};
    }
};

export const uncheckCourse = async (student_id, degree_id, course_id) => {
    try{
        const url = `${API_BASE_URL}/users/uncheck_off`;
        const token = await AsyncStorage.getItem('authToken');
        const fetchReq = getBaseRequestHTTP('PUT', token);
        fetchReq['body'] = JSON.stringify({student_id, degree_id, course_id});
        const response = await fetch(url, fetchReq);
        const data = await response.json();
        return {success: true, data};
    } catch (error) {
        console.error('Error checking off the course:', error);
        return {success: false, data: null};
    }
};
