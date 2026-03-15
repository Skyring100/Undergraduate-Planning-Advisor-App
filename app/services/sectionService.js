import { API_BASE_URL } from './api';

export const getSectionsForCourse = async (courseID) => {
    const url = `${API_BASE_URL}/section/${courseID}`;
    console.log(url, " with value ", courseID)
    const response = await fetch(url, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        },
    });

    console.log(response.status);
    const data = await response.json();
    console.log(data);

    if (response.ok && data.success) {
        return {
        success: true,
        data: data.data,
        message: data.message,
        };
    } else {
        return {
        success: false,
        message: data.message || 'Failed to fetch profile. Please try again.',
        };
    }
};

