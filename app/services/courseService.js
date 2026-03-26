import { API_BASE_URL } from './api.js';

export const getAllCourses = async () => {
    const url = `${API_BASE_URL}/courses/all`;
    console.log(url)
    const response = await fetch(url, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    //console.log(data);

    return data;
};