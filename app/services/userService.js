export const registerUser = async (email, password, name, phone) => {
    try {
        const url = `${API_BASE_URL}/auth/register`;


        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({
                email,
                password,
                name,
                phone,
            }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
            return {
                success: true,
                data: data.data,
                message: data.message,
            };
        } else {
            return {
                success: false,
                message: data.message || 'Registration failed. Please try again.',
            };
        }
    } catch (error) {
        console.error('Register API error:', error);
        return {
            success: false,
            message: 'Network error. Please check your connection and try again.',
        };
    }
};

export const loginUser = async (email, password) => {
    try {
    const url = `${API_BASE_URL}/auth/login`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
            body: JSON.stringify({
            email,
            password,
        })
    });

    const data = await response.json();

    if (response.ok && data.success) {
        return {
            success: true,
            data: data.data,
            message: data.message,
        };
    } else {
        return {
            success: false,
            message: data.message || 'Login failed. Please try again.',
        };
    }
    } catch (error) {
        console.error('Login API error:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
        });
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const getUserProfile = async (token) => {
    try {
        const url = `${API_BASE_URL}/users/profile`;
        
        //Send a GET request to the backend
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        //Turn the response from the backend to JSON format
        const data = await response.json();

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
    } catch (error) {
        // If anything goes wrong during this app's communication with backend, safely log it instead of crashing
        console.error('Get profile API error:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
        });
        return {
            success: false,
            message: errorMessage,
        };
    }
};