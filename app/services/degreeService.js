import { API_BASE_URL } from './api';

export const createDegree = async (degree) => {
    try{
        const url = `${API_BASE_URL}/degrees/create`;
            console.log(url)
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name : degree.name,
                    is_minor : degree.is_minor,
                    course_reqs : degree.course_reqs,
                    credit_reqs : degree.credit_reqs
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

