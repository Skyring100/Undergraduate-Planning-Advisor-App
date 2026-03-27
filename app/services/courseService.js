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
    console.log("data");

    return data;
};

export const checkPrereqs = async (completed, target) => {
    const completedString = completed.join(",");
    const url = `${API_BASE_URL}/courses/check/${completedString}/${target}`;
    console.log(url);
    const matches = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': "application/json"
        },
    }
    ).then(response => response.json()).data;
    return matches;
}

export const getPrereqsOf = async (target) => {
    const url = `${API_BASE_URL}/courses/allprereqs/${target}`;
    console.log(url);
    const all = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': "application/json"
        }
    }
    ).then(response => response.json());
    const ret = all.data;
    console.log(ret);
    return ret;
}
