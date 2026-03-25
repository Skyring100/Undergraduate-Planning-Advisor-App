import { API_BASE_URL } from './api.js';

export const createDegree = async (name, isMinor, courseReqs, creditReqs) => {
    try{
        const url = `${API_BASE_URL}/degrees/create`;
            console.log(url)
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name : name,
                    is_minor : isMinor,
                    course_reqs : courseReqs,
                    credit_reqs : creditReqs
            }),
            });
            const data = await response.json();
            console.log(data);

            return {success: true, data};
        } catch (error) {
            console.error('Error creating degree:', error);
            return {success: false, data: null};
        }
    };

export const getDegreeByID = async (degreeID) => {
    try{
        const url = `${API_BASE_URL}/degrees/${degreeID}`;
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
            console.error('Error creating degree:', error);
            return {success: false, data: null};
        }
    };

