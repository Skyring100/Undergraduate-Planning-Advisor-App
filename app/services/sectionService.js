import { API_BASE_URL } from './api';

export const getSectionsForCourse = async (courseID) => {
    const url = `${API_BASE_URL}/section/${courseID}`;
    console.log(url)
    const response = await fetch(url, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    console.log(data);

    return data;
};

