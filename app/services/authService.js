import { API_BASE_URL } from './api';

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{success: boolean, data: {user: object, token: string}, message?: string}>}
 */
export const loginUser = async (email, password) => {
  try {
    const url = `${API_BASE_URL}/auth/login`;
    console.log('Login API URL:', url);
    console.log('Starting login request...');
    
    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    console.log('Login response received, status:', response.status);
    
    const data = await response.json();
    console.log('Login response data:', data);

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
    
    let errorMessage = 'Network error. Please check your connection and try again.';
    
    if (error.name === 'AbortError') {
      errorMessage = 'Request timed out. Please check if the server is running and accessible.';
    } else if (error.message === 'Network request failed') {
      errorMessage = 'Cannot connect to server. Please verify:\n1. Server is running on port 3000\n2. Correct IP address: ' + API_BASE_URL + '\n3. Device and computer are on same network';
    }
    
    return {
      success: false,
      message: errorMessage,
    };
  }
};

/**
 * Register a new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} name - User full name
 * @param {string} phone - User phone number
 * @returns {Promise<{success: boolean, data?: object, message?: string}>}
 */
export const registerUser = async (email, password, firstName, lastName) => {
  try {
    const url = `${API_BASE_URL}/auth/register`;
    console.log('Register API URL:', url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName
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

