import { API_BASE_URL } from './api.js';

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

export const getSectionsOnDayOfWeek = async (dow) => {
    const url = `${API_BASE_URL}/sections/dow/${dow}`;
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

export const setSections = async (section) => {
    const url = `${API_BASE_URL}/sections/${section}`;
    console.log(section)
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    console.log(data);

    return data;
}

